import { createCanvas, loadImage, registerFont } from "canvas"
import fs from "fs"
import path from "path"

export async function generateCertificateImage({ userName, courseTitle }) {
  // Register elegant fonts - make sure these font files are present in /public/fonts
  registerFont(path.join(process.cwd(), "public/fonts/Montserrat-Bold.ttf"), {
    family: "Montserrat",
    weight: "bold",
  })
  registerFont(
    path.join(process.cwd(), "public/fonts/Montserrat-Regular.ttf"),
    {
      family: "Montserrat",
    }
  )
  registerFont(
    path.join(process.cwd(), "public/fonts/PlayfairDisplay-Italic.ttf"),
    {
      family: "Playfair Display",
      style: "italic",
    }
  )

  const width = 1600
  const height = 1200
  const canvas = createCanvas(width, height)
  const ctx = canvas.getContext("2d")

  // Load certificate background template
  ctx.fillStyle = "#ffffff"
  ctx.fillRect(0, 0, width, height)

  // Add subtle white gradient overlay for text readability
  const gradient = ctx.createLinearGradient(0, 0, width, height)
  gradient.addColorStop(0, "rgba(255, 255, 255, 0.2)")
  gradient.addColorStop(1, "rgba(255, 255, 255, 0.1)")
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, width, height)

  // Title text styling
  ctx.font = "italic 700 60px 'Playfair Display'"
  ctx.fillStyle = "#2c3e50"
  ctx.textAlign = "center"
  ctx.fillText("Certificate of Completion", width / 2, 220)

  // Decorative underline
  ctx.strokeStyle = "#e74c3c"
  ctx.lineWidth = 3
  ctx.beginPath()
  ctx.moveTo(width / 2 - 200, 250)
  ctx.lineTo(width / 2 + 200, 250)
  ctx.stroke()

  // Subtitle text
  ctx.font = "28px 'Montserrat'"
  ctx.fillStyle = "#7f8c8d"
  ctx.fillText("This certificate is presented to", width / 2, 350)

  // User name - bold and uppercase
  ctx.font = "bold 72px 'Montserrat'"
  ctx.fillStyle = "#2c3e50"
  ctx.fillText(userName.toUpperCase(), width / 2, 450)

  // Completion text
  ctx.font = "24px 'Montserrat'"
  ctx.fillStyle = "#7f8c8d"
  ctx.fillText("for successfully completing", width / 2, 520)

  // Course title with emphasis
  ctx.font = "italic 42px 'Playfair Display'"
  ctx.fillStyle = "#e74c3c"
  ctx.fillText(`"${courseTitle}"`, width / 2, 590)

  // Date issued label and value
  ctx.font = "20px 'Montserrat'"
  ctx.fillStyle = "#7f8c8d"
  ctx.fillText("Issued on:", width / 2 - 60, 680)

  ctx.font = "24px 'Montserrat'"
  ctx.fillStyle = "#2c3e50"
  ctx.fillText(
    new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
    width / 2 + 60,
    680
  )

  // Signature line
  ctx.strokeStyle = "#2c3e50"
  ctx.lineWidth = 1
  ctx.beginPath()
  ctx.moveTo(width / 2 - 150, 800)
  ctx.lineTo(width / 2 + 150, 800)
  ctx.stroke()

  ctx.font = "24px 'Montserrat'"
  ctx.fillStyle = "#7f8c8d"
  ctx.fillText("Authorized Signature", width / 2, 850)

  // Generate a more robust Certificate ID
  const certId = `CID-${cryptoRandomId(8).toUpperCase()}`

  ctx.font = "16px 'Montserrat'"
  ctx.fillStyle = "#bdc3c7"
  ctx.fillText(`Certificate ID: ${certId}`, width / 2, height - 50)

  // Create buffer output
  const buffer = canvas.toBuffer("image/png")

  // Save locally (optional; can remove if only uploading to cloud)
  const filename = `certificate-${userName.replace(/\s+/g, "-").toLowerCase()}-${Date.now()}.png`
  // const outputDir = path.join(process.cwd(), "public/certificates")
  // if (!fs.existsSync(outputDir)) {
  //   fs.mkdirSync(outputDir, { recursive: true })
  // }
  // fs.writeFileSync(path.join(outputDir, filename), buffer)

  return {
    buffer, // Return buffer for Cloudinary upload
    path: `/certificates/${filename}`, // Local path fallback
    id: certId,
    issuedDate: new Date().toISOString(),
  }
}

// Helper to create a random string for certificate ID
function cryptoRandomId(length) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
  let result = ""
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}
