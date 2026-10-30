"use client";

import { motion } from "framer-motion";
import { useEffect } from "react";

export default function SamanwayLoader({ onFinish }: { onFinish?: () => void }) {
  useEffect(() => {
    if (onFinish) {
      const timer = setTimeout(() => onFinish(), 3000);
      return () => clearTimeout(timer);
    }
  }, [onFinish]);

  const riseAnim = {
    hidden: { y: "110%" },
    visible: (i: number) => ({
      y: "0%",
      transition: {
        delay: i * 0.15,
        duration: 1.2,
        ease: [0.76, 0, 0.24, 1] as const,
      },
    }),
  };

  const letters = [
    { char: "S", color: "#0047AB" },
    { char: "A", color: "#FFD700" },
    { char: "M", color: "#0047AB" },
    { char: "A", color: "#FFD700" },
    { char: "N", color: "#0047AB" },
    { char: "W", color: "#FFD700" },
    { char: "A", color: "#0047AB" },
    { char: "Y", color: "#FFD700" },
  ];

  return (
    <motion.div
      className="fixed top-0 left-0 w-screen h-screen z-[9999] flex flex-col items-center justify-center bg-[#FDFBF7]"
      exit={{ opacity: 0, transition: { duration: 1, ease: "easeInOut" } }}
    >
      <div className="flex items-center gap-2 md:gap-5 relative z-10">
        {letters.map((l, i) => (
          <div key={i} className="overflow-hidden">
            <motion.span
              custom={i}
              variants={riseAnim}
              initial="hidden"
              animate="visible"
              className="block text-6xl md:text-8xl lg:text-[7rem] font-bold leading-none"
              style={{ fontFamily: "var(--font-cinzel)", color: l.color }}
            >
              {l.char}
            </motion.span>
          </div>
        ))}
      </div>
      <div className="overflow-hidden mt-4">
        <motion.p
          custom={letters.length}
          variants={riseAnim}
          initial="hidden"
          animate="visible"
          className="text-[10px] font-bold uppercase tracking-[0.4em] text-slate-400"
        >
          Mandal Management System
        </motion.p>
      </div>
    </motion.div>
  );
}
