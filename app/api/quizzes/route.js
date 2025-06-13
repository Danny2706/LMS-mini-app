import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

//Create a quizz
export async function POST(req) {
  const body = await req.json()
  const { title, courseId, trainerId, questions } = body

  try {
    // Step 1: Create the quiz
    const quiz = await prisma.quiz.create({
      data: {
        title,
        courseId,
        trainerId,
      },
    })

    // Step 2: Create each question
    const createdQuestions = await Promise.all(
      questions.map((q) =>
        prisma.question.create({
          data: {
            text: q.text,
            options: q.options,
            correct: q.correct,
            quizId: quiz.id,
          },
        })
      )
    )

    return NextResponse.json({
      quiz,
      questions: createdQuestions,
      success: true,
    })
  } catch (error) {
    console.error("Failed to create quiz:", error)
    return NextResponse.json(
      { error: "Failed to create quiz", success: false },
      { status: 500 }
    )
  }
}

//Get all quizzes
export async function GET() {
  try {
    const quizzes = await prisma.quiz.findMany({
      include: {
        course: true,
        trainer: true,
        questions: true,
      },
    })
    return NextResponse.json({ quizzes, success: true })
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch quizzes", success: false },
      { status: 500 }
    )
  }
}
