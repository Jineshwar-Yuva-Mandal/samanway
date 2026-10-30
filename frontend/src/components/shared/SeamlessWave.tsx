"use client";

import { motion } from "framer-motion";

const wavePath = "M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,160C960,139,1056,149,1152,160C1248,171,1344,181,1392,186.7L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z";

export default function SeamlessWave({
  color,
  duration,
  direction = 1,
  style = {},
}: {
  color: string;
  duration: number;
  direction?: number;
  style?: React.CSSProperties;
}) {
  return (
    <div className="absolute bottom-0 left-0 w-full overflow-hidden pointer-events-none" style={style}>
      <motion.div
        animate={{ x: direction > 0 ? ["0%", "-50%"] : ["-50%", "0%"] }}
        transition={{ duration, repeat: Infinity, ease: "linear" }}
        className="flex w-[200%] h-full"
      >
        <svg className="w-1/2 h-full" viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path fill={color} fillOpacity="1" d={wavePath} />
        </svg>
        <svg className="w-1/2 h-full" viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path fill={color} fillOpacity="1" d={wavePath} />
        </svg>
      </motion.div>
    </div>
  );
}
