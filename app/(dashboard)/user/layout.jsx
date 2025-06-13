import Navbar from "@/components/userUi/Navbar"
import { redirect } from "next/navigation"

import { cookies } from "next/headers"
import { verifyJwt } from "@/lib/auth"
import UserProvider from "@/components/userUi/UserProvider"
import TopHeader from "@/components/userUi/TopHeader"

export default async function UserLayout({ children }) {
  const cookieStore = await cookies()
  const token = cookieStore.get("token")?.value

  // Verify JWT token from cookies
  const user = await verifyJwt(token)

  if (!user) {
    // Redirect to login page if no valid token
    redirect("/login")
  }

  return (
    <div className="flex min-h-screen">
      <Navbar />
      <main className="flex-1 flex-col md:ml-64">
        <TopHeader />
        <UserProvider user={user}>{children}</UserProvider>
      </main>
    </div>
  )
}
