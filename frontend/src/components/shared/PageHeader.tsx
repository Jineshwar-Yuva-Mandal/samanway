"use client";

import { motion } from "framer-motion";

export default function PageHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="relative h-[30vh] md:h-[40vh] flex flex-col items-center justify-center bg-white overflow-hidden pt-20">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-50 to-white z-0" />

      <div className="relative z-10 text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex items-center justify-center gap-4 mb-4 opacity-60"
        >
          <div className="h-[1px] w-8 md:w-12 bg-slate-400" />
          <span className="text-xs font-bold text-slate-500 uppercase tracking-[0.3em]">{subtitle}</span>
          <div className="h-[1px] w-8 md:w-12 bg-slate-400" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-4xl md:text-6xl font-bold text-slate-900 tracking-tight"
          style={{ fontFamily: "var(--font-cinzel)" }}
        >
          {title}
        </motion.h1>
      </div>
    </div>
  );
}
