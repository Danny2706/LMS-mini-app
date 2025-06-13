import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url)
    const trainerId = searchParams.get("trainerId")

    if (!trainerId) {
      return NextResponse.json(
        { message: "Missing trainerId" },
        { status: 400 }
      )
    }

    // Get all students enrolled in any course taught by the trainer
    const enrollments = await prisma.enrollment.findMany({
      where: {
        course: {
          trainerId,
        },
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            gender: true,
            profilePic: true,
          },
        },
        course: {
          select: {
            title: true,
          },
        },
      },
    })

    // Format the response
    const students = enrollments.map((enrollment) => ({
      id: enrollment.id,
      studentId: enrollment.user.id,
      name: enrollment.user.name,
      gender: enrollment.user.gender,
      email: enrollment.user.email,
      profilePic: enrollment.user.profilePic,
      course: enrollment.course.title,
      progress: enrollment.progress,
    }))

    // Remove duplicates by name
    const uniqueStudents = []
    const namesSet = new Set()

    for (const student of students) {
      if (!namesSet.has(student.name)) {
        uniqueStudents.push(student)
        namesSet.add(student.name)
      }
    }

    return NextResponse.json({ students: uniqueStudents }, { status: 200 })
  } catch (error) {
    console.error("Error fetching students:", error)
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    )
  }
}
