import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function POST(req) {
  try {
    const body = await req.json()
    const { title, description, courseId, trainerId, type, questions } = body

    if (!title || !courseId || !trainerId || !type || !questions?.length) {
      return NextResponse.json(
        { error: "Missing required fields", success: false },
        { status: 400 }
      )
    }

    // Step 1: Create the assessment
    const assessment = await prisma.assessment.create({
      data: {
        title,
        description,
        type,
        courseId,
        trainerId,
        questions: {
          create: questions.map((q) => ({
            text: q.text,
            options: q.options,
            correct: q.correct,
          })),
        },
      },
      include: {
        questions: true,
      },
    })

    return NextResponse.json({ success: true, assessment })
  } catch (error) {
    console.error("Error creating assessment:", error)
    return NextResponse.json(
      { error: "Internal server error", success: false },
      { status: 500 }
    )
  }
}
