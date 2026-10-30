"use client";

import { useState } from "react";
import { useMotionValue } from "framer-motion";
import SamanwayLoader from "@/components/shared/SamanwayLoader";
import HomeContent from "./HomeContent";

export default function HomePage() {
  const [loading, setLoading] = useState(true);
  const mouseX = useMotionValue(0);

  function handleMouseMove({ clientX }: React.MouseEvent) {
    mouseX.set(clientX / window.innerWidth - 0.5);
  }

  return (
    <div onMouseMove={handleMouseMove}>
      <div className="relative z-[200]">
        {loading && <SamanwayLoader onFinish={() => setLoading(false)} />}
      </div>
      {!loading && <HomeContent mouseX={mouseX} />}
    </div>
  );
}
