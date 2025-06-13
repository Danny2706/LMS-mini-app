import prisma from "@/lib/prisma"

export async function GET(request, { params }) {
  try {
    const certifications = await prisma.certification.findMany({
      where: { courseId: params.courseId },
      include: { user: true },
    })
    return Response.json({ data: certifications, success: true })
  } catch (error) {
    return Response.json(
      { error: "Failed to fetch course certifications", success: false },
      { status: 500 }
    )
  }
}
