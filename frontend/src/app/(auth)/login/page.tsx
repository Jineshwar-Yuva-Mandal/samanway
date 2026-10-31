"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";

export default function LoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const supabase = createSupabaseBrowserClient();

    if (mode === "signin") {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) { setError(error.message); setLoading(false); return; }

      const { data: { user } } = await supabase.auth.getUser();
      const { data: active } = await supabase
        .from("mandal_memberships")
        .select("id")
        .eq("user_id", user!.id)
        .eq("status", "active")
        .limit(1)
        .maybeSingle();
      router.push(active ? "/dashboard/" : "/join-mandal");
    } else {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { full_name: fullName } },
      });
      if (error) { setError(error.message); setLoading(false); return; }

      // If session exists → email confirm is OFF, redirect directly
      if (data.session) {
        router.push("/join-mandal");
      } else {
        // Email confirm is ON — user needs to verify before they can log in
        setLoading(false);
        setIsSuccess(true);
        setMode("signin");
        setPassword("");
        setError("Account created! Check your email to confirm, then sign in.");
      }
    }
  }

  function switchMode() {
    setMode(m => m === "signin" ? "signup" : "signin");
    setError(null);
    setIsSuccess(false);
  }

  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center px-6 pt-24 pb-16">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-sm"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#D4AF37] mb-2">
            {mode === "signin" ? "Welcome back" : "Create account"}
          </p>
          <h1 className="text-3xl font-bold text-slate-900" style={{ fontFamily: "var(--font-cinzel)" }}>
            Samanway
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            {mode === "signin" ? "Sign in to your mandal portal" : "Join your mandal on Samanway"}
          </p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-8">
          <AnimatePresence mode="wait">
            <motion.form
              key={mode}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              onSubmit={handleSubmit}
              className="flex flex-col gap-5"
            >
              {mode === "signup" && (
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-500">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Your full name"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/30 focus:border-[#D4AF37]"
                  />
                </div>
              )}

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-500">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/30 focus:border-[#D4AF37]"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-500">
                  Password
                </label>
                <input
                  type="password"
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/30 focus:border-[#D4AF37]"
                />
              </div>

              {error && (
                <p className={`text-xs rounded-xl px-4 py-2.5 ${isSuccess ? "text-green-700 bg-green-50" : "text-red-600 bg-red-50"}`}>
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="mt-2 w-full rounded-full bg-slate-900 py-3 text-[11px] font-black uppercase tracking-[0.2em] text-white transition-colors hover:bg-[#D4AF37] hover:text-slate-950 disabled:opacity-50"
              >
                {loading ? "Please wait…" : mode === "signin" ? "Sign In" : "Create Account"}
              </button>
            </motion.form>
          </AnimatePresence>
        </div>

        {/* Toggle */}
        <p className="mt-5 text-center text-xs text-slate-400">
          {mode === "signin" ? "Don't have an account? " : "Already have an account? "}
          <button onClick={switchMode} className="font-bold text-slate-700 hover:text-[#D4AF37] transition-colors">
            {mode === "signin" ? "Sign Up" : "Sign In"}
          </button>
        </p>

        <p className="mt-4 text-center text-[10px] font-bold uppercase tracking-[0.2em] text-slate-300">
          Samanway · Mandal Platform
        </p>
      </motion.div>
    </main>
  );
}
