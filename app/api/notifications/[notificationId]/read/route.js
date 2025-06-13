// Mark as read
import prisma from "@/lib/prisma.js"

export async function PATCH(req, { params }) {
  try {
    const { notificationId: id } = params

    const notification = await prisma.notification.update({
      where: { id },
      data: { read: true },
    })

    return Response.json({
      message: "Notification marked as read",
      notification,
      success: true,
    })
  } catch (error) {
    console.error("Mark Read Error:", error)
    return Response.json(
      { message: "Server error", success: false },
      { status: 500 }
    )
  }
}
