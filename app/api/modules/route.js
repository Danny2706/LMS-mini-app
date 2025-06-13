import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

// Create a new module
export async function POST(req) {
  try {
    const {
      title,
      description,
      content,
      order,
      duration,
      videoUrl,
      resources,
      courseId,
    } = await req.json()

    const createdModule = await prisma.module.create({
      data: {
        title,
        description,
        content,
        order,
        duration,
        videoUrl,
        resources,
        courseId,
      },
    })

    return NextResponse.json({ createdModule, success: true })
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to create module", success: false },
      { status: 500 }
    )
  }
}
