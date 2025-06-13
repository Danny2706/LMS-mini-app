import { cookies } from "next/headers"; // ✅ this was missing
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { jwtVerify } from "jose";

export function signJwt(user) {
  return jwt.sign(user, process.env.JWT_SECRET, { expiresIn: "7d" });
}

export function setTokenCookie(token, user) {
  const res = NextResponse.json({
    user: {
      id: user.id,
      email: user.email,
      role: user.role,
    },
  });

  res.cookies.set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });

  return res;
}

export async function verifyJwt(token) {
  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);
    return payload;
  } catch (err) {
    return null;
  }
}

export async function getTokenFromRequest() {
  const cookieStore = cookies(); // ✅ you do NOT need `await` here
  return cookieStore.get("token")?.value;
}
