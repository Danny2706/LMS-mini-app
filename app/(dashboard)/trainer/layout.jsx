import { TrainerDashboardNav } from "@/components/trainerUi/dashboard-nav";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { verifyJwt } from "@/lib/auth";
import TrainerProvider from "@/components/trainerUi/TrainerProvider";
import TopHeader from "@/components/userUi/TopHeader";

export default async function TrainerLayout({ children }) {
  const token = cookies().get("token")?.value;
  const user = await verifyJwt(token);

  if (!user) {
    // Redirect to login if no valid token
    redirect("/login");
  }
  return (
    <div className="flex min-h-screen">
      <TrainerDashboardNav />
      <main className="flex-1 flex-col md:ml-64">
        <TopHeader />
        <TrainerProvider user={user || null}>{children}</TrainerProvider>
      </main>
    </div>
  );
}
