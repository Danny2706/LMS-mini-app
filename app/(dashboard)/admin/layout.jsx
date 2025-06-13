import { AdminDashboardNav } from "@/components/adminUi/AdminDashboardNav";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { verifyJwt } from "@/lib/auth";
import AdminProvider from "@/components/adminUi/AdminProvider";

export default async function AdminDashboardLayout({ children }) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  const user = await verifyJwt(token);

  if (!user) {
    // Redirect to login if no valid token
    redirect("/login");
  }

  return (
    <div className="flex min-h-screen mr-12">
      <AdminDashboardNav />
      <main className="flex-1 md:ml-64  p-3 pl-4">
        <AdminProvider user={user || null}>{children}</AdminProvider>
      </main>
    </div>
  );
}
