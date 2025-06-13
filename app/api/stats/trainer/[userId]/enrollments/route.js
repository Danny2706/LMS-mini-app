import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET(req, context) {
  const params = await context.params
  const { userId } = params

  console.log(userId)

  if (!userId) {
    return NextResponse.json(
      { error: "Student User ID is required" },
      { status: 400 }
    )
  }

  try {
    // Get all enrollments of this student
    const enrollments = await prisma.enrollment.findMany({
      where: {
        userId,
      },
      include: {
        course: {
          include: {
            trainer: {
              select: { id: true, name: true },
            },
            modules: {
              include: {
                quizzes: {
                  include: {
                    questions: true,
                  },
                },
                CompletedModule: {
                  where: {
                    userId,
                  },
                },
              },
            },
            Assessment: {
              include: {
                questions: true,
              },
            },
          },
        },
      },
    })

    // Format the result
    const result = enrollments.map((enrollment) => {
      const course = enrollment.course

      return {
        courseId: course.id,
        courseTitle: course.title,
        trainer: course.trainer,
        progress: enrollment.progress,
        completed: enrollment.completed,

        modules: course.modules.map((module) => ({
          id: module.id,
          title: module.title,
          quizzes: module.quizzes.map((quiz) => ({
            id: quiz.id,
            title: quiz.title,
            questionsCount: quiz.questions.length,
          })),
          completedStatus: module.CompletedModule[0]
            ? {
                completedAt: module.CompletedModule[0].completedAt,
                quizScore: module.CompletedModule[0].quizScore,
                quizPassed: module.CompletedModule[0].quizPassed,
              }
            : null,
        })),

        assessments: course.Assessment.map((assessment) => ({
          id: assessment.id,
          title: assessment.title,
          type: assessment.type,
          score: assessment.score,
          questionsCount: assessment.questions.length,
        })),
      }
    })

    return NextResponse.json({ studentId: userId, enrollments: result })
  } catch (error) {
    console.error("[STUDENT ENROLLMENT FETCH ERROR]", error)
    return NextResponse.json(
      { error: "Failed to fetch student data" },
      { status: 500 }
    )
  }
}
