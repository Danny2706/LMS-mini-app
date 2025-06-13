import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function POST(req) {
  try {
    const { userId, moduleId, quizScore, quizPassed } = await req.json()

    if (
      !userId ||
      !moduleId ||
      quizScore === undefined ||
      quizPassed === undefined
    ) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      )
    }

    console.log(userId, moduleId)

    // Make sure the CompletedModule already exists
    const completedModule = await prisma.completedModule.findUnique({
      where: {
        userId_moduleId: {
          userId,
          moduleId,
        },
      },
    })

    if (!completedModule) {
      return NextResponse.json(
        {
          success: false,
          message: "Module not marked as completed yet",
        },
        { status: 404 }
      )
    }

    // Update quiz data
    const updated = await prisma.completedModule.update({
      where: {
        userId_moduleId: {
          userId,
          moduleId,
        },
      },
      data: {
        quizScore,
        quizPassed,
      },
    })

    return NextResponse.json({ success: true, updated })
  } catch (err) {
    console.error("Error updating quiz result:", err)
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    )
  }
}
