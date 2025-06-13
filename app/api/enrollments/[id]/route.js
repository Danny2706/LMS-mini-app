import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"

// Get a specific enrollment
export async function GET(_, context) {
  const { id } = context.params

  try {
    const enrollment = await prisma.enrollment.findUnique({
      where: { id },
      include: {
        user: true,
        course: true,
      },
    })

    if (!enrollment) {
      return NextResponse.json(
        { error: "Enrollment not found", success: false },
        { status: 404 }
      )
    }

    return NextResponse.json({ enrollment, success: true })
  } catch (err) {
    return NextResponse.json(
      { error: "Error fetching enrollment", success: false },
      { status: 500 }
    )
  }
}

// Update progress/completion
export async function PUT(req, context) {
  const { id } = context.params

  try {
    const { progress, completed } = await req.json()

    const updated = await prisma.enrollment.update({
      where: { id },
      data: {
        progress,
        completed,
      },
    })

    return NextResponse.json({ updated, success: true })
  } catch (err) {
    return NextResponse.json(
      { error: "Update failed", success: false },
      { status: 500 }
    )
  }
}

// Delete enrollment
export async function DELETE(_, context) {
  const { id } = context.params

  try {
    await prisma.enrollment.delete({
      where: { id },
    })

    return NextResponse.json({ message: "Enrollment deleted", success: true })
  } catch (err) {
    return NextResponse.json(
      { error: "Delete failed", success: false },
      { status: 500 }
    )
  }
}
