import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import Sidebar from "@/components/shared/Sidebar";
import PendingApprovalScreen from "@/components/shared/PendingApprovalScreen";

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: memberships } = await supabase
    .from("mandal_memberships")
    .select("status, mandals(name)")
    .eq("user_id", user.id);

  const hasActive = memberships?.some(m => m.status === "active") ?? false;

  if (!hasActive) {
    const pending = (memberships ?? [])
      .filter(m => m.status === "pending")
      .map(m => ({ name: (m.mandals as { name: string } | null)?.name ?? "Unknown" }));
    return <PendingApprovalScreen pendingMandals={pending} />;
  }

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />
      <div className="flex-1">{children}</div>
    </div>
  );
}
