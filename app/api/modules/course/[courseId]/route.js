import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET(_, context) {
  const { courseId } = context.params

  try {
    const modules = await prisma.module.findMany({
      where: { courseId },
      orderBy: { order: "asc" },
    })

    return NextResponse.json({ modules, success: true })
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to fetch modules for course", success: false },
      { status: 500 }
    )
  }
}
