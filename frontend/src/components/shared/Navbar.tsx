"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, LayoutDashboard, Users, Calendar, ClipboardList, Wallet, LogOut, UserRound, Info } from "lucide-react";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";

const MotionLink = motion.create(Link);

type SignedInUser = { email: string; name: string };

const publicMenuItems = [
  { name: "About", href: "/about/", icon: Info },
];

const protectedMenuItems = [
  { name: "Dashboard",  href: "/dashboard/",  icon: LayoutDashboard },
  { name: "Members",    href: "/members/",    icon: Users },
  { name: "Events",     href: "/events/",     icon: Calendar },
  { name: "Attendance", href: "/attendance/", icon: ClipboardList },
  { name: "Fines",      href: "/fines/",      icon: Wallet },
];

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<SignedInUser | null>(null);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "unset";
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const supabase = createSupabaseBrowserClient();

    async function loadUser() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user?.email) { setUser(null); return; }
      setUser({ email: user.email, name: user.user_metadata?.full_name ?? user.email });
    }

    loadUser();
    const { data: listener } = supabase.auth.onAuthStateChange(() => loadUser());
    return () => listener.subscription.unsubscribe();
  }, []);

  async function signOut() {
    await createSupabaseBrowserClient().auth.signOut();
    setUser(null);
    setIsMobileMenuOpen(false);
    window.location.assign("/");
  }

  const visibleMenuItems = user
    ? [...publicMenuItems, ...protectedMenuItems]
    : publicMenuItems;

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
        className="fixed top-6 left-0 right-0 z-[100] flex justify-between md:justify-center px-6 md:px-4 pointer-events-auto"
      >
        <div className="flex items-center gap-2 w-full md:w-auto justify-between md:justify-start bg-white/80 backdrop-blur-xl border border-white/40 shadow-xl shadow-slate-200/40 rounded-full pl-3 pr-2 py-2">

          {/* Brand */}
          <Link href="/" className="flex items-center gap-2 px-1">
            <span className="text-xs font-black uppercase tracking-[0.2em] text-slate-900" style={{ fontFamily: "var(--font-cinzel)" }}>
              Samanway
            </span>
          </Link>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-1 px-4 border-l border-r border-slate-200/50 mx-2 h-6">
            {visibleMenuItems.map((item) => (
              <MotionLink
                key={item.name}
                href={item.href}
                className="px-4 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 hover:text-slate-900 transition-colors"
              >
                {item.name}
              </MotionLink>
            ))}
          </div>

          {/* Auth pill */}
          {user ? (
            <div className="hidden md:inline-flex items-center overflow-hidden rounded-full border border-slate-200 bg-white shadow-sm">
              <span className="px-3 py-1.5 text-[10px] font-bold text-slate-700 uppercase tracking-widest">
                {user.name.split(" ")[0]}
              </span>
              <button
                type="button"
                onClick={signOut}
                aria-label="Sign out"
                className="inline-flex h-9 w-9 items-center justify-center border-l border-slate-100 text-slate-400 transition hover:bg-slate-900 hover:text-white"
              >
                <LogOut size={14} />
              </button>
            </div>
          ) : (
            <Link
              href="/login/"
              className="hidden md:inline-flex items-center gap-2 rounded-full bg-slate-900 px-3.5 py-2 text-[10px] font-black uppercase tracking-[0.16em] text-white transition-colors hover:bg-[#D4AF37] hover:text-slate-950"
            >
              <UserRound size={14} />
              <span className="hidden lg:inline">Sign In</span>
            </Link>
          )}

          {/* Mobile hamburger */}
          <button
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-full bg-white border border-slate-100 text-slate-900 ml-2"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="4" y1="6"  x2="20" y2="6" />
              <line x1="4" y1="12" x2="20" y2="12" />
              <line x1="4" y1="18" x2="20" y2="18" />
            </svg>
          </button>
        </div>
      </motion.nav>

      {/* Mobile overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] bg-[#FDFBF7] flex flex-col md:hidden overflow-y-auto"
          >
            <div className="flex justify-end p-6">
              <button onClick={() => setIsMobileMenuOpen(false)} aria-label="Close menu" className="w-12 h-12 flex items-center justify-center rounded-full bg-white shadow-md text-slate-900">
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 flex flex-col justify-center px-6 gap-2 -mt-10">
              {user ? (
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="mb-4 rounded-xl bg-slate-900 p-4 text-white">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#D4AF37]/20 flex items-center justify-center text-[#D4AF37] text-lg font-black" style={{ fontFamily: "var(--font-cinzel)" }}>
                      {user.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-lg font-bold" style={{ fontFamily: "var(--font-cinzel)" }}>{user.name}</p>
                      <p className="mt-0.5 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Signed in</p>
                    </div>
                  </div>
                  <button type="button" onClick={signOut} className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-white/10 px-4 py-3 text-xs font-bold uppercase tracking-widest text-white transition hover:bg-white hover:text-slate-900">
                    <LogOut size={15} /> Sign out
                  </button>
                </motion.div>
              ) : (
                <MotionLink
                  href="/login/"
                  onClick={() => setIsMobileMenuOpen(false)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="mb-4 flex items-center gap-5 rounded-xl bg-slate-900 py-4 px-4 text-white"
                >
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-[#D4AF37]">
                    <UserRound size={20} />
                  </div>
                  <h3 className="text-2xl font-bold" style={{ fontFamily: "var(--font-cinzel)" }}>Sign In</h3>
                </MotionLink>
              )}

              {visibleMenuItems.map((item, i) => (
                <motion.div key={item.name} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}>
                  <MotionLink
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="group flex items-center gap-5 py-4 px-4"
                  >
                    <div className="w-12 h-12 rounded-full bg-white border border-slate-100 flex items-center justify-center text-slate-400 group-hover:text-slate-800 transition-all shadow-sm">
                      <item.icon size={20} />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-800" style={{ fontFamily: "var(--font-cinzel)" }}>{item.name}</h3>
                  </MotionLink>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
