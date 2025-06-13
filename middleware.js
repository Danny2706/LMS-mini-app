// middleware.js
import { NextResponse } from "next/server";
import { verifyJwt } from "@/lib/auth";

export async function middleware(req) {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  const user = await verifyJwt(token);

  if (!user) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Pass user to next middleware or page
  
  const response = NextResponse.next();
  response.headers.set("x-user-id", user.id); // Optional
  return response;
}

export const config = {
  matcher: ["/user/:path*", "/admin/:path*", "/trainer/:path*"],
};
