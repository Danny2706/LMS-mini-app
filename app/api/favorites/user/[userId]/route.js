import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req, { params }) {
  const { userId } = params;

  try {
    const favorites = await prisma.favorite.findMany({
      where: { userId },
      include: {
        course: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({ success: true, favorites });
  } catch (error) {
    console.error("Error fetching favorites:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch favorites" },
      { status: 500 }
    );
  }
}
