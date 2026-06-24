"use client";

import { motion } from "framer-motion";

export function AIBrainOrb() {
  return (
    <div className="relative w-12 h-12 flex items-center justify-center">
      <motion.div
        animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
        transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
        className="absolute inset-0 rounded-full border border-cyan-400/50 border-t-cyan-400/10 shadow-[0_0_15px_rgba(34,211,238,0.3)]"
      />
      <motion.div
        animate={{ scale: [1, 0.8, 1], rotate: [0, -90, 0] }}
        transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
        className="absolute inset-1 rounded-full border border-indigo-500/50 border-b-indigo-500/10 shadow-[0_0_10px_rgba(99,102,241,0.4)]"
      />
      <motion.div
        animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="w-3 h-3 bg-cyan-400 rounded-full shadow-[0_0_15px_rgba(34,211,238,0.8)]"
      />
    </div>
  );
}
