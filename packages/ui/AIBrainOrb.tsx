"use client";
import { motion } from "framer-motion";

export function AIBrainOrb() {
  return (
    <motion.div
      animate={{
        scale: [1, 1.2, 1],
        boxShadow: [
          "0 0 20px #3b82f6",
          "0 0 40px #6366f1",
          "0 0 20px #3b82f6",
        ],
      }}
      transition={{ repeat: Infinity, duration: 2 }}
      className="w-10 h-10 rounded-full bg-blue-500"
    />
  );
}
