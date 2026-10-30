"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Clock, Loader2, Users } from "lucide-react";
import Link from "next/link";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";

type Mandal = {
  id: string;
  name: string;
  area: string | null;
  city: string | null;
  state: string | null;
};

type MembershipStatus = "active" | "pending" | "left" | null;

export default function JoinMandalPage() {
  const router = useRouter();
  const [mandals, setMandals] = useState<Mandal[]>([]);
  const [statusMap, setStatusMap] = useState<Record<string, MembershipStatus>>({});
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [errorMap, setErrorMap] = useState<Record<string, string>>({});
  const [pageLoading, setPageLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);
  const [hasActive, setHasActive] = useState(false);

  useEffect(() => {
    async function load() {
      const supabase = createSupabaseBrowserClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push("/login"); return; }
      setUserId(user.id);

      const [{ data: mandalsData }, { data: memberships }] = await Promise.all([
        supabase.from("mandals").select("id, name, area, city, state").order("name"),
        supabase.from("mandal_memberships").select("mandal_id, status").eq("user_id", user.id),
      ]);

      const map: Record<string, MembershipStatus> = {};
      let activeFound = false;
      for (const m of memberships ?? []) {
        map[m.mandal_id] = m.status as MembershipStatus;
        if (m.status === "active") activeFound = true;
      }

      setMandals(mandalsData ?? []);
      setStatusMap(map);
      setHasActive(activeFound);
      setPageLoading(false);
    }
    load();
  }, [router]);

  async function handleJoin(mandalId: string) {
    if (!userId) return;
    setLoadingId(mandalId);
    setErrorMap(prev => ({ ...prev, [mandalId]: "" }));

    const supabase = createSupabaseBrowserClient();
    const { error } = await supabase
      .from("mandal_memberships")
      .insert({ user_id: userId, mandal_id: mandalId, status: "pending" });

    if (error) {
      setErrorMap(prev => ({ ...prev, [mandalId]: error.message }));
    } else {
      setStatusMap(prev => ({ ...prev, [mandalId]: "pending" }));
    }
    setLoadingId(null);
  }

  return (
    <main className="min-h-screen bg-slate-50 pt-28 pb-20 px-6">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#D4AF37] mb-3">
            Step 1 of 1
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4"
            style={{ fontFamily: "var(--font-cinzel)" }}>
            Join a Mandal
          </h1>
          <p className="text-slate-500 text-base max-w-md mx-auto leading-relaxed">
            Request to join one or more mandals. An admin will approve your membership.
          </p>
        </motion.div>

        {/* Info notice */}
        {!hasActive && !pageLoading && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="mb-8 rounded-2xl bg-amber-50 border border-amber-200 px-5 py-4 flex items-start gap-3"
          >
            <Clock size={16} className="text-amber-500 mt-0.5 shrink-0" />
            <p className="text-sm text-amber-800">
              You need an active membership to access the dashboard. Request to join a mandal below.
            </p>
          </motion.div>
        )}

        {/* Go to dashboard */}
        {hasActive && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-8 flex justify-end">
            <Link
              href="/dashboard/"
              className="inline-flex items-center gap-2 text-sm font-bold text-slate-900 border-b-2 border-[#D4AF37] pb-0.5 hover:text-[#D4AF37] transition-colors"
            >
              Go to Dashboard <ArrowRight size={14} />
            </Link>
          </motion.div>
        )}

        {/* Mandal grid */}
        {pageLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 size={28} className="animate-spin text-slate-300" />
          </div>
        ) : mandals.length === 0 ? (
          <div className="text-center py-20 text-slate-400">
            <Users size={40} className="mx-auto mb-4 opacity-30" />
            <p className="text-sm">No mandals available yet.</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {mandals.map((mandal, i) => {
              const status = statusMap[mandal.id] ?? null;
              return (
                <motion.div
                  key={mandal.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.4 }}
                  className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 flex flex-col gap-4"
                >
                  <div className="flex-1">
                    <h3 className="font-bold text-slate-900 mb-1 leading-snug"
                      style={{ fontFamily: "var(--font-cinzel)", fontSize: "0.95rem" }}>
                      {mandal.name}
                    </h3>
                    <p className="text-xs text-slate-400">
                      {[mandal.area, mandal.city, mandal.state].filter(Boolean).join(", ") || "India"}
                    </p>
                  </div>

                  {errorMap[mandal.id] && (
                    <p className="text-xs text-red-600 bg-red-50 rounded-lg px-3 py-2">
                      {errorMap[mandal.id]}
                    </p>
                  )}

                  {status === "active" && (
                    <div className="flex items-center gap-2 text-xs font-bold text-green-700 bg-green-50 rounded-full px-3 py-1.5 w-fit">
                      <CheckCircle2 size={13} /> Active Member
                    </div>
                  )}

                  {status === "pending" && (
                    <div className="flex items-center gap-2 text-xs font-bold text-amber-700 bg-amber-50 rounded-full px-3 py-1.5 w-fit">
                      <Clock size={13} /> Pending Approval
                    </div>
                  )}

                  {!status && (
                    <button
                      onClick={() => handleJoin(mandal.id)}
                      disabled={loadingId === mandal.id}
                      className="w-full rounded-full bg-slate-900 py-2.5 text-[11px] font-black uppercase tracking-[0.15em] text-white transition-colors hover:bg-[#D4AF37] hover:text-slate-950 disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {loadingId === mandal.id
                        ? <><Loader2 size={13} className="animate-spin" /> Requesting…</>
                        : "Request to Join"
                      }
                    </button>
                  )}
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Sign out link */}
        <p className="mt-12 text-center text-xs text-slate-400">
          Wrong account?{" "}
          <button
            onClick={async () => {
              await createSupabaseBrowserClient().auth.signOut();
              window.location.assign("/");
            }}
            className="font-bold text-slate-600 hover:text-[#D4AF37] transition-colors"
          >
            Sign out
          </button>
        </p>
      </div>
    </main>
  );
}
