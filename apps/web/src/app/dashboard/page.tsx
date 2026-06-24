"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import { LogOut } from "lucide-react";

export default function Dashboard() {
  const [loading, setLoading] = useState(false);

  return (
    <div className="min-h-screen p-8">
      
      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center mb-10 border-b-2 border-[#E0E7FF] pb-6"
      >
        <h1 className="text-3xl font-bold font-mono text-[#1E1B4B]">🎓 Atlas Scholar Engine</h1>
        
        <div className="flex items-center gap-4">
          <span className="font-bold text-[#4F46E5] bg-[#EEF2FF] px-3 py-1 rounded-full border-2 border-[#E0E7FF] text-sm">Pro Member</span>
          <Link href="/" className="flat-button px-4 py-2 font-bold flex items-center gap-2">
            <LogOut className="w-4 h-4" /> Disconnect
          </Link>
        </div>
      </motion.div>

      {/* HERO SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-10">

        {/* LEFT PANEL */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          className="col-span-1 flat-card p-6"
        >
          <h2 className="text-xl font-bold font-mono mb-6 text-[#1E1B4B]">🧠 Multi-Agent Status</h2>

          <div className="flex items-center gap-4 bg-[#F5F3FF] border-2 border-[#E0E7FF] p-4 rounded-xl mb-6">
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="w-4 h-4 rounded-full bg-[#10B981] border-2 border-[#059669]"
            />
            <span className="font-bold text-[#10B981] uppercase tracking-wider">Online & Ready</span>
          </div>

          <p className="text-[#4F46E5] font-medium leading-relaxed">
            The semantic FAISS orchestrator is active. Enter your credentials to begin deep vector search across 14,000+ verified scholarships.
          </p>

          <button onClick={() => setLoading(true)} className="flat-button w-full py-3 mt-6 font-bold text-lg">
            Initialize Engine
          </button>
        </motion.div>

        {/* CENTER PANEL */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="col-span-2 flat-card p-8 bg-[#EEF2FF] border-[#C7D2FE]"
        >
          <h2 className="text-2xl font-bold font-mono text-[#1E1B4B] mb-2">⚡ Live Intelligence Feed</h2>
          <p className="text-[#4F46E5] font-medium mb-8">Real-time matching algorithms based on your semantic profile.</p>

          {loading ? (
            <div className="flex items-center gap-3 text-[#6366F1] font-bold animate-pulse p-4">
              <div className="w-6 h-6 border-4 border-[#6366F1] border-t-transparent rounded-full animate-spin"></div>
              Analyzing candidates via RAG...
            </div>
          ) : (
            <motion.div className="space-y-6">
              {[
                { name: "NSF Scholarship", match: 98, color: "bg-[#10B981]" },
                { name: "AI Talent Grant", match: 92, color: "bg-[#6366F1]" },
                { name: "Edu Future Fund", match: 88, color: "bg-[#F59E0B]" }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.2 }}
                  className="p-5 bg-white rounded-xl border-2 border-[#E0E7FF] shadow-sm relative overflow-hidden"
                >
                  <div className="flex justify-between font-bold text-[#1E1B4B] mb-3 relative z-10">
                    <p className="font-mono text-lg">{item.name}</p>
                    <span className="text-[#10B981]">{item.match}% Match</span>
                  </div>

                  <div className="h-2 w-full bg-[#EEF2FF] rounded-full overflow-hidden relative z-10">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${item.match}%` }}
                      transition={{ duration: 1, delay: i * 0.2 }}
                      className={`h-full ${item.color} rounded-full`}
                    />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* BOTTOM SECTION */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-8 flat-card p-8"
      >
        <h2 className="text-xl font-bold font-mono text-[#1E1B4B] mb-6">🧠 AI Reasoning Flow</h2>

        <motion.ul className="grid grid-cols-4 gap-4 text-[#4F46E5] font-medium font-mono text-sm">
          {[
            "1. Analyzing GPA Vector...",
            "2. Matching FAISS Index...",
            "3. Scanning RAG Database...",
            "4. Finalizing Weights...",
          ].map((step, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.3 }}
              className="bg-[#EEF2FF] border-2 border-[#E0E7FF] p-4 rounded-xl"
            >
              {step}
            </motion.li>
          ))}
        </motion.ul>
      </motion.div>
    </div>
  );
}
