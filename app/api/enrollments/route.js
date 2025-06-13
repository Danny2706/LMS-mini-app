import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"

// Create new enrollment => user
export async function POST(req) {
  try {
    const { userId, courseId } = await req.json()

    const existingEnrollment = await prisma.enrollment.findFirst({
      where: {
        userId,
        courseId,
      },
    })

    // Check if user is already enrolled in the course to prevent duplicate enrollments
    if (existingEnrollment) {
      return NextResponse.json(
        { message: "User is already enrolled in this course", success: false },
        { status: 400 }
      )
    }

    const enrollment = await prisma.enrollment.create({
      data: {
        userId,
        courseId,
        progress: 0,
        completed: false,
      },
    })

    // Fetch course name
    const course = await prisma.course.findUnique({
      where: {
        id: courseId,
      },
      select: {
        title: true,
      },
    })

    await prisma.notification.create({
      data: {
        message: `You've successfully enrolled in the course: ${
          course?.title || "Unknown Course"
        }!`,
        type: "SUCCESS",
        userId,
      },
    })

    return NextResponse.json({ enrollment, success: true })
  } catch (err) {
    console.error("Enrollment error:", err)
    return NextResponse.json(
      { error: "Failed to create enrollment", success: false },
      { status: 500 }
    )
  }
}

// Get all enrollments => Admin
export async function GET() {
  try {
    const enrollments = await prisma.enrollment.findMany({
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
      { error: "Failed to fetch enrollments", success: false },
      { status: 500 }
    )
  }
}
