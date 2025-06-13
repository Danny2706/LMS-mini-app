import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"

// Get all enrollments for a specific user
export async function POST(req, context) {
  const { id } = context.params
  const { completed } = await req.json()

  try {
    const enrollments = await prisma.enrollment.findMany({
      where: {
        userId: id,
        completed,
      },
      include: {
        user: true,
        course: true,
      },
      orderBy: {
        enrolledAt: "desc",
      },
    })

    return NextResponse.json({ enrollments, success: true })
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to fetch user enrollments", success: false },
      { status: 500 }
    )
  }
}
