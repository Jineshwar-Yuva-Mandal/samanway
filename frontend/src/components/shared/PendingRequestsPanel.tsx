"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, CheckCircle2, XCircle, Users } from "lucide-react";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";

type Request = {
  id: string;
  full_name: string;
  email: string;
  mandal_name: string;
  created_at: string;
};

type RowState = "idle" | "approving" | "rejecting";

export default function PendingRequestsPanel({ initialRequests }: { initialRequests: Request[] }) {
  const [requests, setRequests] = useState<Request[]>(initialRequests);
  const [rowState, setRowState] = useState<Record<string, RowState>>({});
  const [rowError, setRowError] = useState<Record<string, string>>({});

  async function handleApprove(id: string) {
    setRowState(p => ({ ...p, [id]: "approving" }));
    setRowError(p => ({ ...p, [id]: "" }));

    const supabase = createSupabaseBrowserClient();
    const { error } = await supabase
      .from("mandal_memberships")
      .update({ status: "active", joined_date: new Date().toISOString().split("T")[0] })
      .eq("id", id);

    if (error) {
      setRowState(p => ({ ...p, [id]: "idle" }));
      setRowError(p => ({ ...p, [id]: error.message }));
    } else {
      setRequests(prev => prev.filter(r => r.id !== id));
    }
  }

  async function handleReject(id: string) {
    setRowState(p => ({ ...p, [id]: "rejecting" }));
    setRowError(p => ({ ...p, [id]: "" }));

    const supabase = createSupabaseBrowserClient();
    const { error } = await supabase
      .from("mandal_memberships")
      .update({ status: "left" })
      .eq("id", id);

    if (error) {
      setRowState(p => ({ ...p, [id]: "idle" }));
      setRowError(p => ({ ...p, [id]: error.message }));
    } else {
      setRequests(prev => prev.filter(r => r.id !== id));
    }
  }

  return (
    <section>
      <div className="flex items-center gap-3 mb-5">
        <h2 className="text-lg font-bold text-slate-900" style={{ fontFamily: "var(--font-cinzel)" }}>
          Pending Requests
        </h2>
        {requests.length > 0 && (
          <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 bg-amber-50 border border-amber-100 rounded-full px-3 py-1">
            {requests.length}
          </span>
        )}
      </div>

      {requests.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-10 flex flex-col items-center gap-3 text-center">
          <Users size={32} className="text-slate-200" />
          <p className="text-sm text-slate-400">No pending requests. All members are approved.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          <AnimatePresence>
            {requests.map(req => {
              const state = rowState[req.id] ?? "idle";
              const initials = req.full_name.charAt(0).toUpperCase();
              const date = new Date(req.created_at).toLocaleDateString("en-IN", {
                day: "numeric", month: "short", year: "numeric",
              });

              return (
                <motion.div
                  key={req.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20, transition: { duration: 0.2 } }}
                  className="bg-white rounded-2xl border border-slate-100 shadow-sm px-5 py-4"
                >
                  <div className="flex items-start gap-4">
                    {/* Avatar */}
                    <div className="w-10 h-10 rounded-full bg-[#D4AF37]/15 flex items-center justify-center text-[#D4AF37] font-black text-sm shrink-0"
                      style={{ fontFamily: "var(--font-cinzel)" }}>
                      {initials}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-slate-900 text-sm">{req.full_name}</p>
                      {req.email && (
                        <p className="text-xs text-slate-400 truncate">{req.email}</p>
                      )}
                      <div className="flex items-center gap-2 mt-1 flex-wrap">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 bg-amber-50 rounded-full px-2.5 py-0.5">
                          Pending
                        </span>
                        <span className="text-[10px] text-slate-400">Requested {date}</span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => handleReject(req.id)}
                        disabled={state !== "idle"}
                        className="h-9 px-3.5 rounded-full border border-slate-200 text-[10px] font-bold uppercase tracking-wider text-slate-500 hover:border-red-200 hover:text-red-600 hover:bg-red-50 transition-colors disabled:opacity-40 flex items-center gap-1.5"
                      >
                        {state === "rejecting"
                          ? <Loader2 size={12} className="animate-spin" />
                          : <XCircle size={12} />
                        }
                        Reject
                      </button>
                      <button
                        onClick={() => handleApprove(req.id)}
                        disabled={state !== "idle"}
                        className="h-9 px-3.5 rounded-full bg-slate-900 text-[10px] font-bold uppercase tracking-wider text-white hover:bg-[#D4AF37] hover:text-slate-950 transition-colors disabled:opacity-40 flex items-center gap-1.5"
                      >
                        {state === "approving"
                          ? <Loader2 size={12} className="animate-spin" />
                          : <CheckCircle2 size={12} />
                        }
                        Approve
                      </button>
                    </div>
                  </div>

                  {rowError[req.id] && (
                    <p className="mt-2 text-xs text-red-600 bg-red-50 rounded-lg px-3 py-2">
                      {rowError[req.id]}
                    </p>
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}
    </section>
  );
}
