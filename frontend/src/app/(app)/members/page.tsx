import { createSupabaseServerClient } from "@/lib/supabase/server";
import PageHeader from "@/components/shared/PageHeader";
import PendingRequestsPanel from "@/components/shared/PendingRequestsPanel";

type PendingRequest = {
  id: string;
  full_name: string;
  email: string;
  mandal_name: string;
  created_at: string;
};

export default async function MembersPage() {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  // Get current user's profile for role check
  const { data: profile } = await supabase
    .from("profiles")
    .select("role, mandal_id")
    .eq("user_id", user!.id)
    .maybeSingle();

  const isAdmin = profile?.role === "admin";

  let pendingRequests: PendingRequest[] = [];

  if (isAdmin && profile?.mandal_id) {
    // Fetch pending memberships for this mandal, joined with profiles
    const { data } = await supabase
      .from("mandal_memberships")
      .select("id, created_at, user_id, mandals(name), profiles!inner(full_name, user_id)")
      .eq("mandal_id", profile.mandal_id)
      .eq("status", "pending")
      .order("created_at", { ascending: true });

    // Also fetch emails from auth — use a separate profile lookup
    pendingRequests = (data ?? []).map((row: any) => ({
      id: row.id,
      full_name: row.profiles?.full_name ?? "Unknown",
      email: "",
      mandal_name: row.mandals?.name ?? "Unknown",
      created_at: row.created_at,
    }));
  }

  return (
    <>
      <PageHeader title="Members" subtitle="Membership management" />
      <div className="max-w-5xl mx-auto px-6 py-12 flex flex-col gap-8">
        {isAdmin && (
          <PendingRequestsPanel initialRequests={pendingRequests} />
        )}

        {!isAdmin && (
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8 text-center">
            <p className="text-sm text-slate-400">Members list coming soon.</p>
          </div>
        )}
      </div>
    </>
  );
}
