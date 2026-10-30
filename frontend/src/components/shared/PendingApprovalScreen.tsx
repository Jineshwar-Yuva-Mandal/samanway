"use client";

import { motion } from "framer-motion";
import { Clock, ArrowRight, LogOut } from "lucide-react";
import Link from "next/link";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";

type Props = {
  pendingMandals: { name: string }[];
};

export default function PendingApprovalScreen({ pendingMandals }: Props) {
  async function handleSignOut() {
    await createSupabaseBrowserClient().auth.signOut();
    window.location.assign("/");
  }

  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center px-6 py-20">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md text-center"
      >
        {/* Icon */}
        <div className="w-16 h-16 rounded-full bg-amber-50 border border-amber-100 flex items-center justify-center mx-auto mb-6">
          <Clock size={28} className="text-amber-500" />
        </div>

        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#D4AF37] mb-3">
          Membership Pending
        </p>
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4"
          style={{ fontFamily: "var(--font-cinzel)" }}>
          Awaiting Approval
        </h1>
        <p className="text-slate-500 text-sm leading-relaxed mb-8 max-w-sm mx-auto">
          Your request to join the following mandal(s) is under review. An admin will approve your membership shortly.
        </p>

        {/* Pending mandals list */}
        {pendingMandals.length > 0 && (
          <div className="flex flex-col gap-2 mb-8">
            {pendingMandals.map((m, i) => (
              <div key={i} className="flex items-center justify-between bg-white border border-slate-100 rounded-2xl px-5 py-3.5 shadow-sm">
                <span className="text-sm font-bold text-slate-900"
                  style={{ fontFamily: "var(--font-cinzel)", fontSize: "0.85rem" }}>
                  {m.name}
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 bg-amber-50 rounded-full px-3 py-1">
                  Pending
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col gap-3">
          <Link
            href="/join-mandal"
            className="inline-flex items-center justify-center gap-2 w-full rounded-full bg-slate-900 py-3 text-[11px] font-black uppercase tracking-[0.2em] text-white hover:bg-[#D4AF37] hover:text-slate-950 transition-colors"
          >
            Request Another Mandal <ArrowRight size={13} />
          </Link>
          <button
            onClick={handleSignOut}
            className="inline-flex items-center justify-center gap-2 w-full rounded-full border border-slate-200 py-3 text-[11px] font-bold uppercase tracking-[0.15em] text-slate-500 hover:border-slate-400 hover:text-slate-700 transition-colors"
          >
            <LogOut size={13} /> Sign Out
          </button>
        </div>
      </motion.div>
    </main>
  );
}
