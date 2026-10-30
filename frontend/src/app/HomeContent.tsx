"use client";

import Link from "next/link";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import {
  ArrowRight, Users, Calendar, ClipboardList, Wallet,
  ShieldCheck, Zap, Globe, Heart, Code2, CheckCircle2,
} from "lucide-react";
import SeamlessWave from "@/components/shared/SeamlessWave";

const modules = [
  { icon: Users,         label: "Members",    color: "#D4AF37", desc: "Profiles, roles, and membership tracking for every mandal member." },
  { icon: Calendar,      label: "Events",     color: "#D32F2F", desc: "Schedule events, open RSVPs, and manage the full event lifecycle." },
  { icon: ClipboardList, label: "Attendance", color: "#2E7D32", desc: "Mark who showed up, track patterns, auto-trigger fines on absence." },
  { icon: Wallet,        label: "Fines",      color: "#1565C0", desc: "Auto-generate, record, and reconcile fine payments with the ledger." },
];

const steps = [
  { n: "01", title: "Mandal Onboards",      desc: "Admin creates a mandal, invites members. Each mandal is fully isolated — no data sharing." },
  { n: "02", title: "Events are Created",   desc: "Schedule an event, set fine rules, open RSVPs. Members get notified automatically." },
  { n: "03", title: "Attendance is Marked", desc: "Admins mark attendance after the event. Absentees without leave get a fine generated instantly." },
  { n: "04", title: "Fines are Collected",  desc: "Members see pending fines. Admin records payment. Ledger updates automatically." },
];

const whyPoints = [
  "Built for how Indian mandals actually operate — not adapted from a Western SaaS",
  "Every mandal's data is completely isolated via Supabase Row-Level Security",
  "Role-aware: platform admin, mandal admin, and member see only what they need",
  "Runs on Next.js 15 + Hono — fast, edge-ready, works on slow mobile connections",
  "Open REST API — connect WhatsApp bots, payment gateways, or custom tooling",
  "Built by volunteers, for volunteers — every decision reduces burden, not adds it",
];

const tickerItems = ["Multi-Tenant", "Supabase RLS", "Next.js 15", "Hono API", "TypeScript", "Tailwind v4", "Framer Motion", "Open Source"];

export default function HomeContent({ mouseX }: { mouseX: MotionValue<number> }) {
  const { scrollY } = useScroll();
  const yHero = useTransform(scrollY, [0, 500], [0, 80]);
  const yBlob1 = useTransform(scrollY, [0, 600], [0, -60]);
  const yBlob2 = useTransform(scrollY, [0, 600], [0, 40]);

  return (
    <main className="text-slate-900 overflow-x-hidden">

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white">

        {/* Animated blobs */}
        <motion.div style={{ y: yBlob1 }} className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-[#D4AF37]/6 blur-[120px] pointer-events-none" />
        <motion.div style={{ y: yBlob2 }} className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-[#0047AB]/5 blur-[100px] pointer-events-none" />
        <motion.div
          animate={{ scale: [1, 1.12, 1], opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-[#D4AF37]/5 blur-[80px] pointer-events-none"
        />

        {/* Multilingual Samanway watermark — abstract scattered collage */}
        <svg aria-hidden className="absolute inset-0 w-full h-full pointer-events-none select-none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
          <defs>
            <pattern id="samanway-words" x="0" y="0" width="700" height="520" patternUnits="userSpaceOnUse">
              {/* Hindi — big anchor */}
              <text transform="translate(30,110) rotate(-8)"   fontSize="72" fill="#e2e8f0" opacity="0.55" fontFamily="serif">समन्वय</text>
              {/* Tamil — medium, top-right */}
              <text transform="translate(420,75) rotate(6)"    fontSize="36" fill="#e2e8f0" opacity="0.45" fontFamily="serif">சமன்வய</text>
              {/* Telugu — small, far right */}
              <text transform="translate(540,190) rotate(-14)" fontSize="20" fill="#cbd5e1" opacity="0.5"  fontFamily="serif">సమన్వయ</text>
              {/* Latin — tiny, angled */}
              <text transform="translate(55,210) rotate(10)"   fontSize="16" fill="#cbd5e1" opacity="0.4"  fontFamily="sans-serif">Samanway</text>
              {/* Bengali — large, lower-left */}
              <text transform="translate(15,340) rotate(-5)"   fontSize="58" fill="#e2e8f0" opacity="0.4"  fontFamily="serif">সমন্বয</text>
              {/* Kannada — medium, center */}
              <text transform="translate(280,290) rotate(12)"  fontSize="30" fill="#e2e8f0" opacity="0.45" fontFamily="serif">ಸಮನ್ವಯ</text>
              {/* Gujarati — small */}
              <text transform="translate(490,320) rotate(-9)"  fontSize="22" fill="#cbd5e1" opacity="0.5"  fontFamily="serif">સમન્વય</text>
              {/* Hindi tiny filler */}
              <text transform="translate(320,420) rotate(4)"   fontSize="14" fill="#cbd5e1" opacity="0.35" fontFamily="serif">समन्वय</text>
              {/* Malayalam — medium, bottom-right */}
              <text transform="translate(430,470) rotate(-6)"  fontSize="28" fill="#e2e8f0" opacity="0.4"  fontFamily="serif">സമന്വയ</text>
              {/* Latin big — bottom-left */}
              <text transform="translate(20,500) rotate(7)"    fontSize="44" fill="#e2e8f0" opacity="0.3"  fontFamily="sans-serif">Samanway</text>
              {/* Tamil tiny filler */}
              <text transform="translate(590,430) rotate(-18)" fontSize="15" fill="#cbd5e1" opacity="0.4"  fontFamily="serif">சமன்வய</text>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#samanway-words)" />
        </svg>

        {/* Content — fully centered */}
        <motion.div style={{ y: yHero }} className="relative z-10 flex flex-col items-center text-center px-6 pt-28 pb-48 gap-7 max-w-3xl mx-auto">

          <motion.p
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#D4AF37] flex items-center gap-3"
          >
            <span className="w-6 h-px bg-[#D4AF37]" />
            Mandal Management System
            <span className="w-6 h-px bg-[#D4AF37]" />
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
            className="text-6xl sm:text-7xl md:text-8xl font-bold leading-none tracking-tight text-slate-900"
            style={{ fontFamily: "var(--font-cinzel)" }}
          >
            SAMAN<span className="text-[#D4AF37]">WAY</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.3 }}
            className="text-slate-500 text-lg leading-relaxed max-w-md"
          >
            समन्वय — coordination, harmony, unity.<br />
            One platform for every mandal.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.45 }}
            className="flex items-center gap-3"
          >
            <Link href="/login/"
              className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-7 py-3.5 text-[11px] font-black uppercase tracking-[0.2em] text-white hover:bg-[#D4AF37] hover:text-slate-950 transition-colors">
              Get Started <ArrowRight size={14} />
            </Link>
            <Link href="/about/"
              className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400 hover:text-slate-900 transition-colors py-3.5 px-3">
              Learn more →
            </Link>
          </motion.div>

          {/* Scroll hint */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}
            className="flex flex-col items-center gap-2 mt-4"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="w-5 h-8 rounded-full border-2 border-slate-200 flex items-start justify-center pt-1.5"
            >
              <div className="w-1 h-1.5 rounded-full bg-slate-400" />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Jain-flag waves */}
        <div className="absolute bottom-0 left-0 w-full pointer-events-none">
          <SeamlessWave color="#D32F2F" duration={35} style={{ height: "12vh", zIndex: 1 }} />
          <SeamlessWave color="#FFD700" duration={30} direction={-1} style={{ height: "10vh", zIndex: 2 }} />
          <SeamlessWave color="#F9F9F9" duration={25} style={{ height: "8vh",  zIndex: 3 }} />
          <SeamlessWave color="#2E7D32" duration={20} direction={-1} style={{ height: "6vh",  zIndex: 4 }} />
          <SeamlessWave color="#1565C0" duration={15} style={{ height: "4vh",  zIndex: 5 }} />
        </div>
      </section>

      {/* ── MODULE CARDS ── */}
      <section className="py-16 md:py-24 px-6 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#D4AF37] mb-3">Core modules</p>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900" style={{ fontFamily: "var(--font-cinzel)" }}>
              Everything a Mandal Needs
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {modules.map((m, i) => (
              <motion.div
                key={m.label}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.6 }} viewport={{ once: true }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="bg-white rounded-3xl border border-slate-100 shadow-sm p-7 flex flex-col gap-4 group cursor-default"
              >
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform" style={{ backgroundColor: `${m.color}12` }}>
                  <m.icon size={22} style={{ color: m.color }} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-1 group-hover:text-[#D4AF37] transition-colors" style={{ fontFamily: "var(--font-cinzel)" }}>
                    {m.label}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{m.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TICKER STRIP ── */}
      <section className="bg-slate-900 py-4 overflow-hidden">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
          className="flex gap-10 w-[200%]"
        >
          {[...tickerItems, ...tickerItems].map((item, i) => (
            <span key={i} className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-500 whitespace-nowrap flex items-center gap-10">
              {item} <span className="text-[#D4AF37]">·</span>
            </span>
          ))}
        </motion.div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-20 md:py-32 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-14">
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#D4AF37] mb-3">How it works</p>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900" style={{ fontFamily: "var(--font-cinzel)" }}>
              Four steps.<br />Zero paperwork.
            </h2>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-slate-100 rounded-2xl overflow-hidden border border-slate-100">
            {steps.map((s, i) => (
              <motion.div key={s.n} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.6 }} viewport={{ once: true }}
                className="bg-white p-8 flex flex-col gap-4 hover:bg-slate-50 transition-colors">
                <span className="text-4xl font-black text-slate-100" style={{ fontFamily: "var(--font-cinzel)" }}>{s.n}</span>
                <h3 className="text-base font-bold text-slate-900">{s.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY SAMANWAY ── */}
      <section className="py-20 md:py-32 px-6 bg-slate-50">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#D4AF37] mb-4">Why Samanway</p>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight mb-6" style={{ fontFamily: "var(--font-cinzel)" }}>
              Built for<br /><span className="text-[#D4AF37]">Real Seva</span><br />Work.
            </h2>
            <p className="text-slate-500 leading-relaxed text-base mb-8">
              Not a generic SaaS adapted for mandals. Samanway was designed from the ground up for the specific workflows of Indian community organisations.
            </p>
            <Link href="/about/" className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-slate-900 border-b-2 border-[#D4AF37] pb-0.5 hover:text-[#D4AF37] transition-colors">
              Read the full story <ArrowRight size={14} />
            </Link>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1 }} className="flex flex-col gap-3">
            {whyPoints.map((pt, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: 16 }} whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.07, duration: 0.5 }} viewport={{ once: true }}
                className="flex items-start gap-4 bg-white rounded-2xl border border-slate-100 px-5 py-4">
                <CheckCircle2 size={17} className="text-[#D4AF37] mt-0.5 shrink-0" />
                <p className="text-sm text-slate-600 leading-relaxed">{pt}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── JYM DIGITAL ── */}
      <section className="py-20 md:py-32 px-6 bg-white">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
            className="border-l-4 border-[#D4AF37] pl-8">
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400 mb-3">The team behind it</p>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-5" style={{ fontFamily: "var(--font-cinzel)" }}>JYM Digital</h2>
            <p className="text-slate-500 leading-relaxed mb-4">
              JYM Digital is the technology initiative of <span className="font-semibold text-slate-800">Jineshwar Yuva Mandal, Rajajinagar, Bengaluru</span> — tech-minded mandal members who believe digital tools should amplify seva, not complicate it.
            </p>
            <p className="text-slate-500 leading-relaxed">
              Samanway started as an internal tool. When it worked, we opened it up — because every mandal deserves the same infrastructure.
            </p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.15 }}
            className="grid grid-cols-2 gap-4">
            {[
              { icon: Heart,       color: "#D32F2F", label: "Seva-first",      sub: "Every feature reduces volunteer burden" },
              { icon: ShieldCheck, color: "#D4AF37", label: "Secure",          sub: "RLS-enforced tenant isolation" },
              { icon: Zap,         color: "#2E7D32", label: "Fast",            sub: "Edge-ready, works on 3G" },
              { icon: Globe,       color: "#1565C0", label: "For all mandals", sub: "Any community, anywhere in India" },
            ].map((item, i) => (
              <motion.div key={item.label} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.08 }} viewport={{ once: true }}
                className="bg-slate-50 rounded-2xl p-5 flex flex-col gap-2 border border-slate-100">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${item.color}15` }}>
                  <item.icon size={16} style={{ color: item.color }} />
                </div>
                <p className="text-sm font-bold text-slate-900">{item.label}</p>
                <p className="text-[11px] text-slate-400 leading-relaxed">{item.sub}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CTA — sits on white, footer waves transition naturally ── */}
      <section className="py-20 md:py-32 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
            className="relative rounded-[2.5rem] bg-slate-900 overflow-hidden p-10 md:p-20 text-center">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_#D4AF3718,_transparent_55%)] pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_#D32F2F10,_transparent_55%)] pointer-events-none" />
            {/* Subtle moving orb inside CTA */}
            <motion.div
              animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-8 right-12 w-40 h-40 rounded-full bg-[#D4AF37]/8 blur-[60px] pointer-events-none"
            />
            <div className="relative z-10">
              <Code2 className="w-10 h-10 text-[#D4AF37] mx-auto mb-6 opacity-70" />
              <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-[#D4AF37] mb-5">Get started today</p>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight" style={{ fontFamily: "var(--font-cinzel)" }}>
                Bring your mandal<br /><span className="text-[#D4AF37]">into the digital age.</span>
              </h2>
              <p className="text-slate-400 text-base mb-10 max-w-md mx-auto leading-relaxed">
                Sign in with your mandal credentials, or reach out to your mandal leadership to get access.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link href="/login/" className="inline-flex items-center gap-3 px-8 py-4 bg-[#D4AF37] text-slate-900 rounded-full font-black text-sm uppercase tracking-widest hover:bg-yellow-300 transition-colors group">
                  Sign In <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link href="/about/" className="inline-flex items-center gap-3 px-8 py-4 border border-slate-700 text-slate-300 rounded-full font-bold text-sm uppercase tracking-widest hover:border-[#D4AF37] hover:text-[#D4AF37] transition-colors">
                  About Samanway
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

    </main>
  );
}
