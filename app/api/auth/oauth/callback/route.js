import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import jwt from "jsonwebtoken";
import { setTokenCookie, signJwt } from "@/lib/auth";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const code = searchParams.get("code");

    if (!code) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code,
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        redirect_uri:
          process.env.NODE_ENV === "production"
            ? "https://yourdomain.com/api/auth/oauth/callback"
            : "http://localhost:3000/api/auth/oauth/callback",
        grant_type: "authorization_code",
      }),
    });

    const tokenData = await tokenRes.json();
    const access_token = tokenData.access_token;

    const userInfoRes = await fetch(
      "https://www.googleapis.com/oauth2/v2/userinfo",
      {
        headers: { Authorization: `Bearer ${access_token}` },
      }
    );

    const googleUser = await userInfoRes.json();

    if (!googleUser?.email) {
      return NextResponse.redirect(
        new URL("/login?error=missing_email", req.url)
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: { email: googleUser.email },
    });

    if (!existingUser) {
      // 🔐 Send to /signup with short-lived token
      const signupToken = jwt.sign({ googleUser }, process.env.JWT_SECRET, {
        expiresIn: "10m",
      });

      return NextResponse.redirect(
        new URL(`/signup?token=${signupToken}`, req.url)
      );
    }

    // ✅ Existing user, sign in
    const jwtToken = signJwt({ id: existingUser.id, role: existingUser.role });
    const response = setTokenCookie(jwtToken, existingUser);

    const redirectPath =
      existingUser.role === "TRAINER"
        ? "/trainer"
        : existingUser.role === "ADMIN"
          ? "/admin"
          : "/user";

    return NextResponse.redirect(new URL(redirectPath, req.url), {
      headers: response.headers,
    });
  } catch (error) {
    console.error("OAuth Callback Error:", error);
    return NextResponse.redirect(
      new URL("/login?error=callback_failed", req.url)
    );
  }
}
