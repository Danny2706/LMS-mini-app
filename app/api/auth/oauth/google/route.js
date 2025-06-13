// // ✅ Backend: app/api/auth/[...nextauth]/route.js (with custom cookie set)
// import NextAuth from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import GoogleProvider from "next-auth/providers/google";
// import prisma from "@/lib/prisma";
// import bcrypt from "bcryptjs";
// import { NextResponse } from "next/server";

// const handler = NextAuth({
//   providers: [
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         email: { label: "Email", type: "email" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials) {
//         const user = await prisma.user.findUnique({
//           where: { email: credentials.email },
//         });

//         if (
//           !user ||
//           !(await bcrypt.compare(credentials.password, user.password))
//         ) {
//           throw new Error("Invalid email or password");
//         }

//         return user;
//       },
//     }),
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     }),
//   ],
//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) {
//         token.id = user.id;
//         token.role = user.role;
//       }
//       return token;
//     },
//     async session({ session, token }) {
//       if (token) {
//         session.user.id = token.id;
//         session.user.role = token.role;
//       }
//       return session;
//     },
//   },
//   pages: {
//     signIn: "/login",
//   },
//   session: {
//     strategy: "jwt",
//   },
//   secret: process.env.NEXTAUTH_SECRET,
//   events: {
//     async signIn({ user }) {
//       // You can set cookies manually here if you're using edge functions or custom flow
//       const response = NextResponse.next();
//       response.cookies.set("user_id", user.id, {
//         httpOnly: true,
//         secure: process.env.NODE_ENV === "production",
//         maxAge: 60 * 60 * 24 * 7,
//         path: "/",
//       });
//       return response;
//     },
//   },
// });

// export { handler as GET, handler as POST };

import { NextResponse } from "next/server";

export async function GET() {
  const baseUrl =
    process.env.NODE_ENV === "production"
      ? "https://yourdomain.com"
      : "http://localhost:3000";

  const redirectUrl = new URL("https://accounts.google.com/o/oauth2/v2/auth");
  redirectUrl.searchParams.set("client_id", process.env.GOOGLE_CLIENT_ID);
  redirectUrl.searchParams.set(
    "redirect_uri",
    `${baseUrl}/api/auth/oauth/callback`
  );
  redirectUrl.searchParams.set("response_type", "code");
  redirectUrl.searchParams.set("scope", "openid email profile");
  redirectUrl.searchParams.set("access_type", "offline");
  redirectUrl.searchParams.set("prompt", "consent");

  return NextResponse.redirect(redirectUrl);
}
