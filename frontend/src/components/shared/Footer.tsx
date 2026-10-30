"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import SeamlessWave from "./SeamlessWave";
import { Instagram, Youtube, MessageCircle } from "lucide-react";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";

const socialLinks = [
  { name: "Instagram", href: "#", icon: Instagram, color: "#E1306C" },
  { name: "YouTube",   href: "#", icon: Youtube,   color: "#FF0000" },
  { name: "WhatsApp",  href: "#", icon: MessageCircle, color: "#25D366" },
];

const publicLinks = [
  { name: "About", href: "/about/" },
];

const protectedLinks = [
  { name: "Dashboard",  href: "/dashboard/" },
  { name: "Members",    href: "/members/" },
  { name: "Events",     href: "/events/" },
  { name: "Attendance", href: "/attendance/" },
  { name: "Fines",      href: "/fines/" },
];

export default function Footer() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const supabase = createSupabaseBrowserClient();
    async function checkAuth() {
      const { data: { user } } = await supabase.auth.getUser();
      setIsLoggedIn(!!user);
    }
    checkAuth();
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsLoggedIn(!!session?.user);
    });
    return () => listener.subscription.unsubscribe();
  }, []);

  const navLinks = isLoggedIn ? [...publicLinks, ...protectedLinks] : publicLinks;
  return (
    <footer className="relative bg-slate-900 text-white z-20">
      {/* Wave border above footer — bg matches the CTA section (slate-900) so no colour clash */}
      <div className="absolute top-0 left-0 w-full transform -translate-y-full overflow-hidden leading-none z-10">
        <div className="relative w-full h-[10vh] bg-white">
          <SeamlessWave color="#D32F2F" duration={35} style={{ height: "100%", zIndex: 1 }} />
          <SeamlessWave color="#FFD700" duration={30} direction={-1} style={{ height: "80%", zIndex: 2 }} />
          <SeamlessWave color="#F9F9F9" duration={25} style={{ height: "60%", zIndex: 3 }} />
          <SeamlessWave color="#2E7D32" duration={20} direction={-1} style={{ height: "40%", zIndex: 4 }} />
          <SeamlessWave color="#1565C0" duration={15} style={{ height: "20%", zIndex: 5 }} />
        </div>
      </div>

      <div className="relative pt-16 pb-12 max-w-6xl mx-auto px-6 flex flex-col items-center">
        {/* Color dots */}
        <div className="flex justify-center gap-3 mb-8">
          <div className="w-2 h-2 rounded-full bg-[#D32F2F] shadow-[0_0_10px_#D32F2F]" />
          <div className="w-2 h-2 rounded-full bg-[#FFD700] shadow-[0_0_10px_#FFD700]" />
          <div className="w-2 h-2 rounded-full bg-white shadow-[0_0_10px_white]" />
          <div className="w-2 h-2 rounded-full bg-[#2E7D32] shadow-[0_0_10px_#2E7D32]" />
          <div className="w-2 h-2 rounded-full bg-[#1565C0] shadow-[0_0_10px_#1565C0]" />
        </div>

        {/* Brand */}
        <div className="mb-6 text-center">
          <h3 className="text-xl font-bold tracking-widest text-slate-200" style={{ fontFamily: "var(--font-cinzel)" }}>
            SAMANWAY
          </h3>
          <p className="text-[10px] text-slate-500 uppercase tracking-[0.3em] mt-1">
            Mandal Management Platform
          </p>
        </div>

        {/* Nav links */}
        <div className="flex flex-wrap justify-center gap-6 md:gap-8 text-xs font-bold uppercase tracking-wider text-slate-400 mb-8">
          {navLinks.map((link) => (
            <Link key={link.name} href={link.href} className="hover:text-[#FFD700] transition-colors">
              {link.name}
            </Link>
          ))}
        </div>

        <p className="text-slate-600 text-[10px] uppercase tracking-widest text-center">
          © {new Date().getFullYear()} Samanway. All Rights Reserved.
        </p>
      </div>

      {/* Fixed right social sidebar */}
      <aside
        aria-label="Social profiles"
        className="fixed right-0 top-1/2 z-[90] flex -translate-y-1/2 flex-col gap-1 rounded-l-xl border border-r-0 border-slate-200 bg-white/95 p-1.5 shadow-lg shadow-slate-900/10 backdrop-blur"
      >
        {socialLinks.map((social) => (
          <a
            key={social.name}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={social.name}
            title={social.name}
            className="flex h-10 w-10 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100"
          >
            <social.icon size={17} style={{ color: social.color }} />
          </a>
        ))}
      </aside>
    </footer>
  );
}
