import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

//add single question to the quiz
export async function POST(req, context) {
  const { id } = context.params
  const { text, options, correct } = await req.json()

  try {
    const question = await prisma.question.create({
      data: {
        text,
        options,
        correct,
        id,
      },
    })

    return NextResponse.json({
      question,
      success: true,
      message: "Question created successfully",
    })
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create question", success: false },
      { status: 500 }
    )
  }
}
