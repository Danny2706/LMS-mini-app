import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"

function formatDuration(totalMinutes) {
  const hours = Math.floor(totalMinutes / 60)
  const minutes = totalMinutes % 60
  return `${hours}h ${minutes}m`
}

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url)
    const trainerId = searchParams.get("trainerId")

    if (!trainerId) {
      return NextResponse.json(
        { message: "Trainer ID is required" },
        { status: 400 }
      )
    }

    const courses = await prisma.course.findMany({
      where: { trainerId },
      include: {
        enrollments: true,
        modules: {
          include: {
            quizzes: true,
          },
        },
      },
    })

    const summaries = courses.map((course) => {
      const studentCount = course.enrollments.length
      const totalProgress = course.enrollments.reduce(
        (sum, e) => sum + e.progress,
        0
      )
      const averageProgress =
        studentCount > 0 ? Math.round(totalProgress / studentCount) : 0

      const moduleCount = course.modules.length
      const totalDuration = course.modules.reduce(
        (sum, mod) => sum + (mod.duration ?? 0),
        0
      )

      const totalQuizzes = course.modules.reduce(
        (sum, mod) => sum + mod.quizzes.length,
        0
      )

      return {
        id: course.id,
        title: course.title,
        description: course.description,
        students: studentCount,
        progress: averageProgress,
        duration: formatDuration(totalDuration),
        lectures: moduleCount,
        quizzes: totalQuizzes,
        assignments: 6, // Placeholder value
        thumbnail: course.thumbnail || "",
        nextClass: "Today, 2:00 PM", // Placeholder
      }
    })

    return NextResponse.json(summaries, { status: 200 })
  } catch (error) {
    console.error("Trainer course summary error:", error)
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    )
  }
}
