// /api/courses/unfinished
import { cookies } from "next/headers"
import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

import { headers } from "next/headers"
import { verifyJwt } from "@/lib/auth"

function getCookieValue(cookieHeader, name) {
  const match = cookieHeader.match(new RegExp(`${name}=([^;]+)`))
  return match ? match[1] : null
}

export async function GET(req) {
  try {
    const headerList = await headers()
    const cookie = headerList.get("cookie") || ""
    const token = cookie
      .split("; ")
      .find((c) => c.startsWith("token="))
      ?.split("=")[1]

    if (!token) {
      return NextResponse.json({ error: "No token found" }, { status: 401 })
    }

    const user = await verifyJwt(token)

    if (!user) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 })
    }

    const userId = user.id

    console.log(userId)

    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized - No User ID" },
        { status: 401 }
      )
    }

    const unfinishedEnrollments = await prisma.enrollment.findMany({
      where: {
        userId,
        progress: {
          lt: 100,
        },
      },
      include: {
        course: {
          select: {
            id: true,
            title: true,
            thumbnail: true,
          },
        },
      },
    })

    const unfinishedCourses = unfinishedEnrollments.map((enrollment) => ({
      id: enrollment.course.id,
      title: enrollment.course.title,
      progress: enrollment.progress,
    }))

    return NextResponse.json({ unfinishedCourses })
  } catch (error) {
    console.error("Failed to fetch unfinished courses", error)
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    )
  }
}
