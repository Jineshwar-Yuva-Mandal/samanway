"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import PageHeader from "@/components/shared/PageHeader";
import {
  BookOpen, Handshake, Zap, Trophy, Star, Heart,
  ShieldCheck, Code2, Globe, Lock, Users, ArrowRight,
} from "lucide-react";

const samanwayPillars = [
  { icon: ShieldCheck, color: "#D4AF37", title: "Tenant Isolation",   desc: "Each mandal's data is completely private. Supabase Row-Level Security ensures zero data bleed across tenants — ever." },
  { icon: Code2,       color: "#1565C0", title: "Modern Stack",       desc: "Next.js 15, Hono, TypeScript, Tailwind v4, Framer Motion. Built with the same tools that power the best products on the web." },
  { icon: Globe,       color: "#2E7D32", title: "Any Mandal",         desc: "Not just JYM. Any Jain mandal, any community organisation, anywhere in India can onboard Samanway and go digital immediately." },
  { icon: Lock,        color: "#D32F2F", title: "Role-Based Access",  desc: "Platform admin, mandal admin, member — every role sees exactly what it needs. No confusion, no accidental data exposure." },
  { icon: Zap,         color: "#EF6C00", title: "Fast by Default",    desc: "Server-rendered pages, edge-ready API, and optimised queries mean Samanway feels instant even on a mobile data connection." },
  { icon: Heart,       color: "#7B1FA2", title: "Seva First",         desc: "Built by volunteers, for volunteers. Every design decision was made to reduce burden — not add more complexity to mandal work." },
];

const jymPillars = [
  { icon: BookOpen,  color: "#D4AF37", title: "Religious Roots",       desc: "Active participation in all major Jain observances — Mahaveer Jayanti, Paryushan, and more — alongside Shri Vardhaman Sthanakwasi Jain Shravak Sangh Rajajinagar." },
  { icon: Handshake, color: "#1565C0", title: "Network Building",      desc: "Connecting the next generation of Jain youth — building friendships, professional relationships, and a lifelong sense of belonging within the community." },
  { icon: Zap,       color: "#2E7D32", title: "Business & GenZ Vision", desc: "We bridge tradition with opportunity. From startup culture to career exploration, we have conversations that matter for the world our members are entering." },
  { icon: Trophy,    color: "#EF6C00", title: "Sports & Culture",       desc: "Cricket, chess, trekking, cultural competitions — we believe a sharp mind lives in an active body. Our calendar goes well beyond the prayer hall." },
  { icon: Star,      color: "#7B1FA2", title: "Cultural Honours",       desc: "Celebrating talent, rewarding effort, and honouring tradition through felicitations, cultural nights, and community recognition events." },
  { icon: Heart,     color: "#D32F2F", title: "360° Development",       desc: "Religious, social, intellectual, and physical — we invest in the whole person. Every member leaves more grounded, more connected, and more capable." },
];

const jymMilestones = [
  { year: "2022",   detail: "Founded under the divine guidance of Shrut Muni Ji M.S." },
  { year: "9+",     detail: "Events hosted across religious, social, and sporting categories." },
  { year: "35+",    detail: "Active youth members across Rajajinagar and beyond." },
  { year: "Seva",   detail: "Consistent seva partner for all major Rajajinagar Jain Sangh events." },
];

export default function AboutPage() {
  return (
    <main className="bg-white min-h-screen pb-24">
      <PageHeader title="About Us" subtitle="Samanway & JYM Digital" />

      {/* ── ABOUT SAMANWAY ── */}
      <section className="py-12 md:py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <p className="text-xs font-black uppercase tracking-[0.3em] text-[#D4AF37] mb-4">The Platform</p>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight mb-8" style={{ fontFamily: "var(--font-cinzel)" }}>
              What is <br />
              <span className="text-[#D4AF37]">Samanway?</span>
            </h2>
            <p className="text-slate-500 text-lg leading-relaxed mb-6 max-w-2xl mx-auto">
              <span className="font-bold text-slate-800">Samanway (समन्वय)</span> means coordination and harmony. It is a <span className="font-bold text-slate-800">multi-tenant mandal management platform</span> that digitises the day-to-day operations of Jain mandals — attendance, fines, membership, and events — all in one place.
            </p>
            <p className="text-slate-500 text-lg leading-relaxed max-w-2xl mx-auto">
              The idea was born inside Jineshwar Yuva Mandal when managing attendance registers, WhatsApp reminders, and handwritten fine records became too unwieldy. Instead of adapting a generic tool, we built one from scratch — purpose-built for how Indian community organisations actually work.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── SAMANWAY PILLARS ── */}
      <section className="py-12 md:py-24 px-6 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10 md:mb-16">
            <p className="text-xs font-black uppercase tracking-[0.3em] text-slate-400 mb-3">What makes it different</p>
            <h2 className="text-4xl font-bold text-slate-900" style={{ fontFamily: "var(--font-cinzel)" }}>Built Right</h2>
            <p className="text-slate-500 mt-4 max-w-xl mx-auto">Six principles that guided every decision in designing Samanway.</p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {samanwayPillars.map((p, i) => (
              <motion.div key={p.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1, duration: 0.6 }} viewport={{ once: true }}
                className="group bg-white border border-slate-100 rounded-3xl p-8 hover:shadow-2xl transition-all duration-300">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform" style={{ backgroundColor: `${p.color}15` }}>
                  <p.icon size={22} style={{ color: p.color }} />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-3 group-hover:text-[#D4AF37] transition-colors">{p.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── JYM DIGITAL ── */}
      <section className="py-12 md:py-24 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, scale: 0.97 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
            className="relative rounded-[2rem] md:rounded-[3rem] bg-slate-900 overflow-hidden p-8 md:p-16 text-center">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_#D4AF3720,_transparent_55%)] pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_#D32F2F15,_transparent_55%)] pointer-events-none" />
            <div className="relative z-10">
              <Code2 className="w-10 h-10 text-[#D4AF37] mx-auto mb-6 opacity-80" />
              <p className="text-xs font-black uppercase tracking-[0.3em] text-[#D4AF37] mb-4">The Builders</p>
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight" style={{ fontFamily: "var(--font-cinzel)" }}>
                JYM Digital
              </h3>
              <p className="text-slate-400 leading-relaxed max-w-xl mx-auto text-base mb-4">
                JYM Digital is the technology initiative of <span className="text-slate-200 font-semibold">Jineshwar Yuva Mandal, Rajajinagar, Bengaluru</span>. We are a group of tech-minded mandal members who believe digital tools can amplify the seva work of communities — without replacing the human heart behind it.
              </p>
              <p className="text-slate-400 leading-relaxed max-w-xl mx-auto text-base">
                Samanway is our first open platform. We built it to solve our own problems — and we are making it available to every mandal that needs it.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── ABOUT JYM ── */}
      <section className="py-12 md:py-24 px-6 bg-slate-50">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <p className="text-xs font-black uppercase tracking-[0.3em] text-[#D4AF37] mb-4">The Community</p>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight mb-8" style={{ fontFamily: "var(--font-cinzel)" }}>
              Jineshwar <br />
              <span className="text-[#D4AF37]">Yuva Mandal</span>
            </h2>
            <p className="text-slate-500 text-lg leading-relaxed mb-6 max-w-2xl mx-auto">
              Jineshwar Yuva Mandal is the youth wing of <span className="font-bold text-slate-800">Shri Vardhaman Sthanakwasi Jain Shravak Sangh Rajajinagar, Bengaluru</span> — founded under the divine guidance of <span className="font-bold text-slate-800">Shrut Muni Ji M.S.</span>
            </p>
            <p className="text-slate-500 text-lg leading-relaxed max-w-2xl mx-auto">
              Since 2022, we have organised events, served alongside the Rajajinagar Jain Sangh in every major observance, and built a tight-knit community of young Jains. Our belief: the youth of today are the guardians of Dharma tomorrow.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── JYM MILESTONES ── */}
      <section className="bg-slate-900 py-16 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {jymMilestones.map((m, i) => (
            <motion.div key={m.year} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1, duration: 0.5 }} viewport={{ once: true }} className="text-center">
              <p className="text-[#D4AF37] font-black text-lg uppercase tracking-wider mb-2" style={{ fontFamily: "var(--font-cinzel)" }}>{m.year}</p>
              <p className="text-slate-400 text-xs leading-relaxed">{m.detail}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── JYM PILLARS ── */}
      <section className="py-16 md:py-28 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10 md:mb-16">
            <p className="text-xs font-black uppercase tracking-[0.3em] text-slate-400 mb-3">What we stand for</p>
            <h2 className="text-4xl font-bold text-slate-900" style={{ fontFamily: "var(--font-cinzel)" }}>A 360° Mandal</h2>
            <p className="text-slate-500 mt-4 max-w-xl mx-auto">We are not just a religious organisation. We are a launchpad — for friendships, careers, and character.</p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jymPillars.map((p, i) => (
              <motion.div key={p.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1, duration: 0.6 }} viewport={{ once: true }}
                className="group bg-white border border-slate-100 rounded-3xl p-8 hover:shadow-2xl transition-all duration-300">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform" style={{ backgroundColor: `${p.color}15` }}>
                  <p.icon size={22} style={{ color: p.color }} />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-3 group-hover:text-[#D4AF37] transition-colors">{p.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SEVA HIGHLIGHT ── */}
      <section className="py-12 md:py-24 px-6 bg-slate-50">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, scale: 0.97 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
            className="relative rounded-[2rem] md:rounded-[3rem] bg-slate-900 overflow-hidden p-8 md:p-16 text-center">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_#D4AF3718,_transparent_55%)] pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_#D32F2F12,_transparent_55%)] pointer-events-none" />
            <div className="relative z-10">
              <Heart className="w-10 h-10 text-[#D4AF37] mx-auto mb-6 opacity-80" />
              <p className="text-xs font-black uppercase tracking-[0.3em] text-[#D4AF37] mb-4">Our Seva</p>
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight" style={{ fontFamily: "var(--font-cinzel)" }}>
                Proud partners of <br />
                <span className="text-[#D4AF37]">Rajajinagar Jain Sangh</span>
              </h3>
              <p className="text-slate-400 leading-relaxed max-w-xl mx-auto text-base">
                JYM plays a cordial and hands-on role in every major event organised by the Rajajinagar Jain Sangh — from Mahaveer Jayanti Mahotsav to Paryushan Aradhana. Our members volunteer in large numbers, upholding the spirit of{" "}
                <em className="text-slate-300">Parasparopagraho Jivanam</em> — souls rendering service to one another.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── JOIN CTA ── */}
      <section className="py-12 md:py-24 px-6 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <Users className="w-10 h-10 text-[#D4AF37] mx-auto mb-6 opacity-80" />
            <h2 className="text-4xl font-bold text-slate-900 mb-5" style={{ fontFamily: "var(--font-cinzel)" }}>
              Ready to bring your Mandal online?
            </h2>
            <p className="text-slate-500 text-lg leading-relaxed mb-10">
              Contact your mandal leadership to get access to Samanway, or reach out to JYM Digital to onboard your mandal.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/login/" className="inline-flex items-center gap-3 px-8 py-4 bg-slate-900 text-white rounded-full font-black text-sm uppercase tracking-widest hover:bg-[#D4AF37] hover:text-slate-900 transition-colors group">
                Sign In <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/" className="inline-flex items-center gap-3 px-8 py-4 border-2 border-slate-200 text-slate-700 rounded-full font-bold text-sm uppercase tracking-widest hover:border-[#D4AF37] hover:text-[#D4AF37] transition-colors">
                Back to Home
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
