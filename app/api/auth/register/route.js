// app/api/auth/register/route.js
import prisma from "@/lib/prisma"
import { signJwt, setTokenCookie } from "@/lib/auth"
import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"

export async function POST(req) {
  const data = await req.json()

  const { name, email, password, gender, role } = data

  const existingUser = await prisma.user.findUnique({ where: { email } })
  if (existingUser) {
    return NextResponse.json({ error: "User already exists" }, { status: 400 })
  }

  const hashed = await bcrypt.hash(password, 10)

  const user = await prisma.user.create({
    data: { name, email, password: hashed, gender, role },
  })
  const token = signJwt({ id: user.id, role: user.role })
  const res = NextResponse.json({ user })

  return setTokenCookie(token, user)
}
