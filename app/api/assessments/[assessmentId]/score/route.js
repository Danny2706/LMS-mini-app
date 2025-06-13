import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function POST(req, { params }) {
  const { assessmentId: id } = params
  const { score } = await req.json()

  if (!score || typeof score !== "number") {
    return NextResponse.json(
      { error: "Invalid or missing score" },
      { status: 400 }
    )
  }

  try {
    const updatedAssessment = await prisma.assessment.update({
      where: { id },
      data: { score },
    })

    return NextResponse.json({ success: true, data: updatedAssessment })
  } catch (error) {
    console.error("Error updating score:", error)
    return NextResponse.json(
      { error: "Failed to update score" },
      { status: 500 }
    )
  }
}
