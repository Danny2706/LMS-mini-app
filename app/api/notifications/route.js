import prisma from "@/lib/prisma"

// Create notification
export async function POST(req) {
  try {
    const { message, type, userId } = await req.json()

    if (!message || !type || !userId) {
      return Response.json({ message: "Missing fields" }, { status: 400 })
    }

    const validTypes = ["SUCCESS", "REMINDER", "WARNING"]
    if (!validTypes.includes(type)) {
      return Response.json(
        { message: "Invalid notification type", success: false },
        { status: 400 }
      )
    }

    const notification = await prisma.notification.create({
      data: {
        message,
        type,
        userId,
      },
    })

    return Response.json({
      message: "Notification created",
      notification,
      success: true,
    })
  } catch (error) {
    console.error("Create Notification Error:", error)
    return Response.json(
      { message: "Server error", success: false },
      { status: 500 }
    )
  }
}

// Get notifications for a user
// @ route => /api/notifications?userId=123
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url)
    const userId = searchParams.get("userId")

    if (!userId) {
      return Response.json({ message: "Missing user ID" }, { status: 400 })
    }

    const notifications = await prisma.notification.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    })

    return Response.json({ notifications, success: true })
  } catch (error) {
    console.error("Error:", error)
    return Response.json(
      { message: "Server error", success: false },
      { status: 500 }
    )
  }
}
