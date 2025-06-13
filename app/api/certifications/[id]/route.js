import prisma from "@/lib/prisma"

//Get a single certification
export async function GET(req, { params }) {
  try {
    const certification = await prisma.certification.findUnique({
      where: { id: params.id },
      include: {
        user: true,
        course: true,
      },
    })

    if (!certification) {
      return Response.json(
        { error: "Certification not found", success: false },
        { status: 404 }
      )
    }

    return Response.json({ data: certification, success: true })
  } catch (error) {
    return Response.json(
      { error: "Failed to fetch certification", success: false },
      { status: 500 }
    )
  }
}

//Update a certification
export async function PUT(req, { params }) {
  try {
    const body = await req.json()
    const updatedCert = await prisma.certification.update({
      where: { id: params.id },
      data: body,
    })
    return Response.json({ data: updatedCert, success: true })
  } catch (error) {
    return Response.json(
      { error: "Failed to update certification", success: false },
      { status: 500 }
    )
  }
}

//Delete a certification
export async function DELETE(req, { params }) {
  try {
    await prisma.certification.delete({
      where: { id: params.id },
    })
    return new Response.json({ success: true }, { status: 204 })
  } catch (error) {
    return Response.json(
      { error: "Failed to delete certification", success: false },
      { status: 500 }
    )
  }
}
