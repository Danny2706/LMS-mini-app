import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"

// Add a course to favorites
export async function POST(req) {
  try {
    const { userId, courseId } = await req.json()

    const favorite = await prisma.favorite.create({
      data: {
        userId,
        courseId,
      },
    })

    await prisma.notification.create({
      data: {
        message: `Course added to favorites`,
        type: "SUCCESS",
        userId,
      },
    })

    return NextResponse.json({ favorite, success: true })
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to add favorite", success: false },
      { status: 500 }
    )
  }
}
