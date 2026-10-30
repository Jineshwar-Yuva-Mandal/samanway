"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Users,
  Calendar,
  ClipboardList,
  Wallet,
  ChevronRight,
} from "lucide-react";

const navItems = [
  { name: "Dashboard",  href: "/dashboard/",  icon: LayoutDashboard },
  { name: "Members",    href: "/members/",    icon: Users },
  { name: "Events",     href: "/events/",     icon: Calendar },
  { name: "Attendance", href: "/attendance/", icon: ClipboardList },
  { name: "Fines",      href: "/fines/",      icon: Wallet },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex flex-col w-64 min-h-screen bg-white border-r border-slate-100 pt-28 pb-8 px-4 shrink-0">
      {/* Brand mark */}
      <div className="mb-8 px-3">
        <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-slate-400">
          Management Portal
        </p>
      </div>

      <nav className="flex flex-col gap-1">
        {navItems.map((item) => {
          const active = pathname.startsWith(item.href.replace(/\/$/, ""));
          return (
            <Link key={item.name} href={item.href}>
              <motion.div
                whileHover={{ x: 2 }}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                  active
                    ? "bg-slate-900 text-white"
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <item.icon size={16} />
                <span>{item.name}</span>
                {active && <ChevronRight size={14} className="ml-auto opacity-60" />}
              </motion.div>
            </Link>
          );
        })}
      </nav>

      {/* Gold accent at bottom */}
      <div className="mt-auto px-3">
        <div className="h-px bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent" />
        <p className="mt-4 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-300 text-center">
          Samanway
        </p>
      </div>
    </aside>
  );
}
