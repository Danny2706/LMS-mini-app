import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const trainers = await prisma.user.findMany({
      where: {
        role: "TRAINER",
      },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        gender: true,
        trainerCourses: {
          select: {
            id: true,
            title: true,
          },
        },
      },
    });

    return NextResponse.json({ success: true, trainers }, { status: 200 });
  } catch (err) {
    console.error("Error fetching trainers:", err);
    return NextResponse.json(
      { success: false, error: "Failed to fetch trainers" },
      { status: 500 }
    );
  }
}
