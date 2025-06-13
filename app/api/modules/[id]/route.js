import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

// Get module by ID
export async function GET(_, context) {
  const { id } = context.params

  try {
    const getModule = await prisma.module.findUnique({
      where: { id },
      include: { course: true },
    })

    if (!getModule) {
      return NextResponse.json(
        { error: "Module not found", success: false },
        { status: 404 }
      )
    }

    return NextResponse.json({ getModule, success: true })
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to fetch module", success: false },
      { status: 500 }
    )
  }
}

// Update a module
export async function PUT(req, context) {
  const { id } = context.params
  const data = await req.json()

  try {
    const updated = await prisma.module.update({
      where: { id },
      data,
    })

    return NextResponse.json({
      module: updated,
      success: true,
      message: "Module updated successfully",
    })
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to update module", success: false },
      { status: 500 }
    )
  }
}

// Delete a module
export async function DELETE(_, context) {
  const { id } = context.params

  try {
    await prisma.module.delete({ where: { id } })

    return NextResponse.json({
      message: "Module deleted successfully",
      success: true,
    })
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to delete module", success: false },
      { status: 500 }
    )
  }
}
