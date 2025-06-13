import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

//context.params.id
// Get a single quiz
export async function GET(req, context) {
  const { id } = context.params

  try {
    const quiz = await prisma.quiz.findUnique({
      where: { id },
      include: { questions: true },
    })

    if (!quiz) {
      return NextResponse.json(
        { error: "Quiz not found", success: false },
        { status: 404 }
      )
    }

    return NextResponse.json({ quiz, success: true })
  } catch (err) {
    return NextResponse.json(
      { error: "Error fetching quiz", success: false },
      { status: 500 }
    )
  }
}

// Update a single quiz
export async function PUT(req, context) {
  const { id } = context.params
  const body = await req.json()

  try {
    const updated = await prisma.quiz.update({
      where: { id },
      data: body,
    })

    return NextResponse.json({
      updated,
      message: "Updated successfully",
      success: true,
    })
  } catch (err) {
    return NextResponse.json(
      { error: "Update failed", success: false },
      { status: 500 }
    )
  }
}

//Delete a single quiz
export async function DELETE(req, context) {
  const { id } = context.params

  try {
    await prisma.quiz.delete({
      where: { id },
    })

    return NextResponse.json({ message: "Deleted successfully", success: true })
  } catch (err) {
    return NextResponse.json(
      { error: "Delete failed", success: false },
      { status: 500 }
    )
  }
}
