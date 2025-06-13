import { generateCertificateImage } from "@/lib/certificate"
import { parseForm } from "@/lib/parseForm"
import cloudinary from "@/lib/cloudinary"
import prisma from "@/lib/prisma"

//List all certifications
export async function GET(req) {
  try {
    const certifications = await prisma.certification.findMany({
      include: {
        user: { select: { name: true, email: true } },
        course: { select: { title: true } },
      },
    })
    return Response.json({ data: certifications, success: true })
  } catch (error) {
    return Response.json(
      { error: "Failed to fetch certifications", success: false },
      { status: 500 }
    )
  }
}

function uploadBufferToCloudinary(buffer, publicId) {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "certificates",
        public_id: publicId,
        resource_type: "image",
        format: "png",
      },
      (error, result) => {
        if (error) reject(error)
        else resolve(result)
      }
    )
    stream.end(buffer)
  })
}

//Create a new certification
export async function POST(request) {
  try {
    const body = await request.json()

    const { userName, courseTitle, userId, courseId } = body

    if (!userName || !courseTitle || !userId || !courseId) {
      return new Response(
        JSON.stringify({ error: "Missing required fields", success: false }),
        { status: 400 }
      )
    }

    // Generate image buffer and certId
    const { buffer, certId } = await generateCertificateImage({
      userName,
      courseTitle,
    })

    // Upload buffer to Cloudinary
    const publicId = `${userName.replace(/\s+/g, "-").toLowerCase()}-${Date.now()}`
    const uploadResult = await uploadBufferToCloudinary(buffer, publicId)

    // Save to database
    const certification = await prisma.certification.create({
      data: {
        title: `Certificate of ${courseTitle}`,
        userId,
        courseId,
        certLink: uploadResult.secure_url,
        issuedAt: new Date(),
      },
    })

    return new Response(
      JSON.stringify({ data: certification, success: true }),
      { status: 201 }
    )
  } catch (error) {
    console.error("Certificate generation error:", error)
    return new Response(
      JSON.stringify({
        error: "Failed to generate certificate" + error,
        success: false,
      }),
      { status: 500 }
    )
  }
}
