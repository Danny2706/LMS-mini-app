import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

//Get all questions => optional
export async function GET() {
  try {
    const questions = await prisma.question.findMany({
      include: {
        quiz: true,
      },
    })

    return NextResponse.json({ questions, success: true })
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch questions", success: false },
      { status: 500 }
    )
  }
}
