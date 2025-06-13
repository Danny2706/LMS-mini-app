// app/api/user/route.js

import { NextResponse } from "next/server";
import { verifyJwt, getTokenFromRequest } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET(req) {
  const token = await getTokenFromRequest();

  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const user = await verifyJwt(token);

  if (!user) {
    return NextResponse.json({ message: "Invalid token" }, { status: 401 });
  }

  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });

    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching users" },
      { status: 500 }
    );
  }
}
