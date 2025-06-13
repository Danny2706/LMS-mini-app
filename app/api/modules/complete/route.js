import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function POST(request) {
  const { userId, moduleId } = await request.json()

  try {
    // 1. Check if module already completed
    const alreadyCompleted = await prisma.completedModule.findUnique({
      where: {
        userId_moduleId: {
          userId,
          moduleId,
        },
      },
    })

    if (alreadyCompleted) {
      return NextResponse.json(
        { success: false, error: "Module already completed" },
        { status: 400 }
      )
    }

    // 2. Mark module as completed
    await prisma.completedModule.create({
      data: {
        userId,
        moduleId,
      },
    })

    // 3. Get courseId of the module
    const moduleData = await prisma.module.findUnique({
      where: { id: moduleId },
      select: { courseId: true },
    })

    const courseId = moduleData.courseId

    // 4. Count total and completed modules for the course
    const [totalModules, completedModules] = await Promise.all([
      prisma.module.count({ where: { courseId } }),
      prisma.completedModule.count({ where: { userId, module: { courseId } } }),
    ])

    const progress = Math.round((completedModules / totalModules) * 100)

    // 5. Update progress in Enrollment
    await prisma.enrollment.updateMany({
      where: { userId, courseId },
      data: {
        progress,
        completed: progress === 100,
      },
    })

    if (progress === 100) {
      await prisma.notification.create({
        data: {
          message: "Course completed successfully",
          type: "SUCCESS",
          userId,
        },
      })
    }

    return NextResponse.json({
      success: true,
      progress,
      completed: progress === 100,
      message: "Module completed successfully",
    })
  } catch (err) {
    console.error("Error completing module:", err)
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    )
  }
}
