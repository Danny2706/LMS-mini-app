import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET(request) {
  try {
    // Parse the trainerId from the URL query
    const { searchParams } = new URL(request.url)
    const trainerId = searchParams.get("trainerId")

    if (!trainerId) {
      return NextResponse.json(
        { error: "Trainer ID is required" },
        { status: 400 }
      )
    }

    // Fetch courses for the specific trainer
    const courses = await prisma.course.findMany({
      where: { trainerId },
      include: {
        modules: true, // optional: include related modules
      },
    })

    return NextResponse.json(courses, { status: 200 })
  } catch (error) {
    console.error("Failed to fetch trainer courses:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
