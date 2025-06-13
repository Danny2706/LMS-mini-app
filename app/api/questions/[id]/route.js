import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

// Get single question
export async function GET(req, context) {
  const { id } = context.params

  try {
    const question = await prisma.question.findUnique({
      where: { id },
    })

    if (!question) {
      return NextResponse.json(
        { error: "Question not found", success: false },
        { status: 404 }
      )
    }

    return NextResponse.json({ question, success: true })
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to fetch question", success: false },
      { status: 500 }
    )
  }
}

// Update single question
export async function PUT(req, context) {
  const { id } = context.params
  const body = await req.json()

  try {
    const updated = await prisma.question.update({
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

//Delete single question
export async function DELETE(req, context) {
  const { id } = context.params

  try {
    await prisma.question.delete({ where: { id } })
    return NextResponse.json({
      message: "Question deleted successfully",
      success: true,
    })
  } catch (err) {
    return NextResponse.json(
      { error: "Delete failed", success: false },
      { status: 500 }
    )
  }
}
