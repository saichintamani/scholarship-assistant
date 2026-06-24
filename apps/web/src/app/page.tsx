"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function Home() {
  const [loading, setLoading] = useState(false);

  return (
    <div className="min-h-screen bg-[#05060a] text-white px-10 py-8">

      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center"
      >
        <h1 className="text-2xl font-bold">🎓 Atlas Scholarship AI</h1>

        <button className="px-4 py-2 bg-blue-600 rounded-xl hover:bg-blue-500">
          Connect AI
        </button>
      </motion.div>

      {/* HERO SECTION */}
      <div className="grid grid-cols-3 gap-6 mt-10">

        {/* LEFT PANEL */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          className="col-span-1 bg-[#0d1117] p-5 rounded-2xl border border-gray-800"
        >
          <h2 className="text-lg font-semibold">🧠 AI Brain Status</h2>

          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="mt-4 text-green-400"
          >
            ● ACTIVE
          </motion.div>

          <p className="text-sm text-gray-400 mt-4">
            Real-time scholarship intelligence engine running...
          </p>
        </motion.div>

        {/* CENTER PANEL */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="col-span-2 bg-gradient-to-br from-[#0d1117] to-[#111827] p-6 rounded-2xl border border-gray-800"
        >
          <h2 className="text-xl font-semibold">⚡ Live Intelligence Feed</h2>

          {loading ? (
            <p className="text-blue-400 mt-4">Analyzing candidates...</p>
          ) : (
            <motion.div className="mt-6 space-y-4">

              {["NSF Scholarship", "AI Talent Grant", "Edu Future Fund"].map(
                (item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.2 }}
                    className="p-4 bg-black/40 rounded-xl border border-gray-700"
                  >
                    <div className="flex justify-between">
                      <p>{item}</p>
                      <span className="text-green-400">{98 - i * 3}%</span>
                    </div>

                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${98 - i * 3}%` }}
                      className="h-1 bg-blue-500 mt-2 rounded-full"
                    />
                  </motion.div>
                )
              )}
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* BOTTOM SECTION */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-10 bg-[#0d1117] p-6 rounded-2xl border border-gray-800"
      >
        <h2 className="text-lg font-semibold">🧠 AI Reasoning Flow</h2>

        <motion.ul className="mt-4 space-y-2 text-gray-300">
          {[
            "Analyzing GPA...",
            "Matching financial profile...",
            "Scanning scholarship database...",
            "Ranking results...",
          ].map((step, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.3 }}
            >
              {step}
            </motion.li>
          ))}
        </motion.ul>
      </motion.div>
    </div>
  );
}
