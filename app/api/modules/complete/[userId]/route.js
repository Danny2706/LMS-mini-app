import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

///api/modules/complete/123?courseId=abc

export async function GET(req, context) {
  const params = await context.params
  const userId = params.userId
  const courseId = req.nextUrl.searchParams.get("courseId")

  try {
    const completedModules = await prisma.completedModule.findMany({
      where: {
        userId,
        module: {
          courseId,
        },
      },
      select: {
        moduleId: true,
        quizScore: true,
        quizPassed: true,
        module: {
          select: {
            id: true,
            courseId: true,
          },
        },
      },
    })

    if (!completedModules.length) {
      return NextResponse.json(
        { success: false, error: "No completed modules found" },
        { status: 400 }
      )
    }

    return NextResponse.json({ success: true, completedModules })
  } catch (error) {
    console.error("Error fetching completed modules:", error)
    return NextResponse.json(
      { error: "Server error while fetching completed modules" },
      { status: 500 }
    )
  }
}
