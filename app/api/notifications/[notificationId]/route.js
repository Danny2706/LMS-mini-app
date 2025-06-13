import prisma from "@/lib/prisma.js";
import { NextResponse } from "next/server";

//Delete notification
export async function DELETE(req, { params }) {
  try {
    const { notificationId: id } = params;

    await prisma.notification.delete({
      where: { id },
    });

    return NextResponse.json(
      {
        message: "Notification deleted",
        success: true,
      },
      { status: 200 } // ✅ valid with JSON body
    );
  } catch (error) {
    console.error("Delete Notification Error:", error);
    return Response.json(
      { message: "Server error", success: false },
      { status: 500 }
    );
  }
}
