import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"

// Get a single favorite by ID
export async function GET(_, context) {
  const { id } = context.params

  try {
    const favorite = await prisma.favorite.findUnique({
      where: { id },
      include: {
        user: true,
        course: true,
      },
    })

    if (!favorite) {
      return NextResponse.json(
        { error: "Favorite not found", success: false },
        { status: 404 }
      )
    }

    return NextResponse.json({ favorite, success: true })
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to fetch favorite", success: false },
      { status: 500 }
    )
  }
}

// Delete a favorite
export async function DELETE(_, context) {
  const { id } = context.params

  try {
    await prisma.favorite.delete({
      where: { id },
    })

    await prisma.notification.create({
      data: {
        message: `Course removed successfully from favorites`,
        type: "SUCCESS",
        userId,
      },
    })

    return NextResponse.json({
      message: "Favorite removed successfully",
      success: true,
    })
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to delete favorite", success: false },
      { status: 500 }
    )
  }
}
