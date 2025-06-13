import prisma from "@/lib/prisma"

//Get all certifications for a user
export async function GET(request, { params }) {
  try {
    const certifications = await prisma.certification.findMany({
      where: { userId: params.userId },
      include: { course: true },
    })
    return Response.json({ data: certifications, success: true })
  } catch (error) {
    return Response.json(
      { error: "Failed to fetch user certifications", success: false },
      { status: 500 }
    )
  }
}
