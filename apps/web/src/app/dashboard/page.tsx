"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import { LogOut, Globe, ExternalLink, Activity, Database, Zap } from "lucide-react";
import { AIBrainOrb } from "@/components/AIBrainOrb";

export default function Dashboard() {
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState("English");
  const [category, setCategory] = useState("GENERAL");
  const [results, setResults] = useState<any>(null);

  const handleInitialize = async () => {
    setLoading(true);
    setResults(null);
    try {
      const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
      const response = await fetch(`${API_BASE_URL}/api/v1/scholarships/evaluate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: `I am a student looking for scholarships. My caste category is ${category}.`,
          profile: { category: category },
          language: language
        })
      });
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error("Failed to fetch from intelligence engine:", error);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-[150vh] pb-20 text-white relative">
      
      {/* Floating Particles */}
      <motion.div animate={{ y: [0, -30, 0], x: [0, 20, 0] }} transition={{ repeat: Infinity, duration: 8 }} className="absolute top-40 left-10 w-64 h-64 bg-indigo-600/20 rounded-full blur-[100px] pointer-events-none" />
      <motion.div animate={{ y: [0, 30, 0], x: [0, -20, 0] }} transition={{ repeat: Infinity, duration: 10 }} className="absolute bottom-40 right-10 w-80 h-80 bg-purple-600/20 rounded-full blur-[120px] pointer-events-none" />

      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-50 flex justify-between items-center px-8 py-6 mb-10 border-b border-white/10 bg-[#05060A]/60 backdrop-blur-xl shadow-lg transition-all duration-300 -mx-8"
      >
        <h1 className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400">🎓 Atlas Scholar Engine</h1>
        
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 glass-card px-3 py-1.5 rounded-full border border-white/10">
            <Globe className="w-4 h-4 text-cyan-400" />
            <select value={language} onChange={(e) => setLanguage(e.target.value)} className="bg-transparent text-sm font-medium outline-none text-gray-200">
              <option className="bg-gray-900">English</option>
              <option className="bg-gray-900">Hindi</option>
              <option className="bg-gray-900">Marathi</option>
              <option className="bg-gray-900">Telugu</option>
            </select>
          </div>
          <Link href="/" className="neon-button px-4 py-2 font-bold flex items-center gap-2 text-sm">
            <LogOut className="w-4 h-4" /> Disconnect
          </Link>
        </div>
      </motion.div>

      {/* HERO SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-10 relative z-10 px-8">

        {/* LEFT PANEL */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          className="col-span-1 glass-card p-6 border-indigo-500/20"
        >
          <div className="flex items-center gap-4 mb-6">
            <AIBrainOrb />
            <h2 className="text-xl font-bold font-mono text-white">Multi-Agent Status</h2>
          </div>

          <div className="flex items-center gap-4 bg-indigo-900/30 border border-indigo-500/30 p-4 rounded-xl mb-6 shadow-[0_0_15px_rgba(99,102,241,0.2)]">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)]"
            />
            <span className="font-bold text-cyan-400 uppercase tracking-wider text-sm">Online & Ready</span>
          </div>

          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-xs text-gray-400 uppercase tracking-wider mb-2">Applicant Category / Caste</label>
              <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-white focus:ring-2 focus:ring-indigo-500 outline-none transition appearance-none">
                <option value="GENERAL">General</option>
                <option value="OBC">OBC</option>
                <option value="SC">SC</option>
                <option value="ST">ST</option>
                <option value="MINORITY">Minority</option>
              </select>
            </div>
          </div>

          <p className="text-gray-400 text-sm leading-relaxed mb-6">
            The semantic FAISS orchestrator will filter 14,000+ verified scholarships explicitly mapping to {category} quotas and translate the strategy to {language}.
          </p>

          <button onClick={handleInitialize} className="neon-button w-full py-4 font-bold text-lg flex items-center justify-center gap-2 group">
            {loading ? <Activity className="w-5 h-5 animate-pulse" /> : <Database className="w-5 h-5 group-hover:scale-110 transition-transform" />}
            {loading ? "Processing..." : "Initialize Engine"}
          </button>
        </motion.div>

        {/* CENTER PANEL */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="col-span-2 glass-card p-8 border-purple-500/20"
        >
          <h2 className="text-2xl font-bold font-mono text-white mb-2 flex items-center gap-2">
            <Zap className="w-6 h-6 text-cyan-400" /> Live Intelligence Feed
          </h2>
          <p className="text-gray-400 font-medium mb-8">Real-time matching algorithms based on your semantic profile.</p>

          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center justify-center py-20 text-indigo-400 font-bold">
                <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mb-4 shadow-[0_0_15px_rgba(99,102,241,0.5)]"></div>
                <motion.p animate={{ opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 1.5 }}>Translating RAG strategy to {language}...</motion.p>
              </motion.div>
            ) : results ? (
              <motion.div key="results" className="space-y-6">
                
                {/* Reasoning Output from Agent */}
                <div className="p-6 bg-indigo-900/20 border border-indigo-500/30 rounded-xl mb-8">
                  <h3 className="font-mono text-cyan-400 mb-2 flex items-center gap-2"><AIBrainOrb /> Intelligence Reasoning</h3>
                  <p className="text-gray-300 leading-relaxed text-sm italic">{results.reasoning}</p>
                </div>

                {results.all_matches?.map((item: any, i: number) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.2 }}
                    className="p-6 bg-black/40 rounded-xl border border-white/10 shadow-lg relative overflow-hidden group hover:border-indigo-500/50 transition-colors"
                  >
                    <div className="flex justify-between items-start font-bold text-white mb-4 relative z-10">
                      <div>
                        <p className="font-mono text-lg">{item.name}</p>
                        <a href={item.portal || "https://scholarships.gov.in"} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-xs text-indigo-400 hover:text-indigo-300 mt-1">
                          Apply via {item.portal ? new URL(item.portal).hostname : "scholarships.gov.in"} <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                      <span className="text-cyan-400 bg-cyan-900/30 px-3 py-1 rounded-full border border-cyan-500/30 shadow-[0_0_10px_rgba(34,211,238,0.2)]">
                        {item.match_score ? Math.round(item.match_score * 100) : 98}% Match
                      </span>
                    </div>

                    <div className="h-2 w-full bg-gray-800 rounded-full overflow-hidden relative z-10 shadow-inner">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${item.match_score ? Math.round(item.match_score * 100) : 98}%` }}
                        transition={{ duration: 1.5, delay: i * 0.2, ease: "easeOut" }}
                        className={`h-full bg-cyan-400 rounded-full relative`}
                      >
                        <div className="absolute top-0 right-0 bottom-0 w-8 bg-white/30 skew-x-[-20deg] animate-[translate_2s_infinite]"></div>
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <div className="py-20 text-center text-gray-500 font-mono">System standing by. Waiting for initialization...</div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
