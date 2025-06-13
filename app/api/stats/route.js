import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const [studentCount, trainerCount, adminCount, courseCount] =
      await Promise.all([
        prisma.user.count({ where: { role: "USER" } }),
        prisma.user.count({ where: { role: "TRAINER" } }),
        prisma.user.count({ where: { role: "ADMIN" } }),
        prisma.course.count(),
      ]);

    const [maleCount, femaleCount, otherCount] = await Promise.all([
      prisma.user.count({ where: { gender: "MALE" } }),
      prisma.user.count({ where: { gender: "FEMALE" } }),
      prisma.user.count({ where: { gender: "OTHER" } }),
    ]);

    return NextResponse.json({
      success: true,
      stats: {
        users: {
          studentCount,
          trainerCount,
          adminCount,
        },
        gender: {
          maleCount,
          femaleCount,
          otherCount,
        },
        courseCount,
      },
    });
  } catch (err) {
    console.error("Error fetching stats:", err);
    return NextResponse.json(
      { success: false, error: "Failed to fetch statistics" },
      { status: 500 }
    );
  }
}
