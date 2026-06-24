"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Brain, Sparkles, Target, Zap, ShieldCheck, Search, ShieldAlert, Cpu } from "lucide-react";

export default function AtlasSystem() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("GENERAL");
  const [income, setIncome] = useState(500000);
  const [loading, setLoading] = useState(false);
  const [streamLog, setStreamLog] = useState<string[]>([]);
  const [results, setResults] = useState<any>(null);

  const simulateIntelligenceStream = async (data: any) => {
    setLoading(true);
    setStreamLog([]);
    const logs = [
      "Initializing Atlas AI Brain...",
      `Analyzing user profile: Income ₹${income}, Category ${category}...`,
      "Converting query to semantic embedding...",
      "Querying FAISS Vector Database for top 50 matches...",
      "Applying multi-variable eligibility reasoning...",
      "Calculating deadline urgency & financial fit...",
      "Finalizing top recommended candidates..."
    ];

    for (let i = 0; i < logs.length; i++) {
      await new Promise(r => setTimeout(r, 600));
      setStreamLog(prev => [...prev, logs[i]]);
    }
    
    setResults(data);
    setLoading(false);
  };

  const handleEvaluate = async () => {
    // In production, this would be an actual streaming response from FastAPI.
    // For now, we mock the network latency and animate the logs.
    setResults(null);
    try {
      const res = await fetch("http://localhost:8000/api/v1/scholarships/evaluate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query,
          profile: { category, income: Number(income) }
        })
      });
      const data = await res.json();
      await simulateIntelligenceStream(data);
    } catch (e) {
      console.error(e);
      await simulateIntelligenceStream({ error: "Failed to connect to AI Orchestrator." });
    }
  };

  return (
    <main className="min-h-screen bg-[#050505] text-white p-4 md:p-8 font-sans overflow-x-hidden">
      {/* Dynamic Neural Background */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600 rounded-full mix-blend-screen filter blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600 rounded-full mix-blend-screen filter blur-[120px] animate-pulse delay-1000"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-12 border-b border-white/10 pb-6"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-900/30 rounded-xl border border-blue-500/30">
              <Cpu className="text-blue-400 w-8 h-8" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 tracking-tight">
                Atlas Scholar Intelligence
              </h1>
              <p className="text-gray-400 text-sm mt-1 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                AI Orchestrator Online
              </p>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Input & Live Intelligence Stream */}
          <div className="lg:col-span-5 space-y-6">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl"
            >
              <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <Target className="text-purple-400 w-5 h-5" /> Target Parameters
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs text-gray-400 uppercase tracking-wider mb-2">Semantic Intent</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
                    <input 
                      type="text" 
                      className="w-full bg-black/50 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:ring-2 focus:ring-purple-500 outline-none transition"
                      placeholder="e.g. tech grants for engineering..."
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-gray-400 uppercase tracking-wider mb-2">Income (₹)</label>
                    <input 
                      type="number" 
                      className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-white focus:ring-2 focus:ring-purple-500 outline-none transition"
                      value={income}
                      onChange={(e) => setIncome(Number(e.target.value))}
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 uppercase tracking-wider mb-2">Category</label>
                    <select 
                      className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-white focus:ring-2 focus:ring-purple-500 outline-none transition appearance-none"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                    >
                      <option value="GENERAL">GENERAL</option>
                      <option value="OBC">OBC</option>
                      <option value="SC">SC</option>
                      <option value="ST">ST</option>
                      <option value="MINORITY">MINORITY</option>
                    </select>
                  </div>
                </div>
                <button 
                  onClick={handleEvaluate}
                  disabled={loading}
                  className="w-full mt-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 disabled:opacity-50 transition-all duration-300 text-white font-semibold py-4 rounded-xl shadow-lg shadow-purple-500/25 flex items-center justify-center gap-2 group"
                >
                  {loading ? (
                    <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}>
                      <Brain className="w-5 h-5 text-white" />
                    </motion.div>
                  ) : (
                    <Sparkles className="w-5 h-5 group-hover:animate-pulse" />
                  )}
                  {loading ? "Orchestrating Agents..." : "Engage AI Intelligence"}
                </button>
              </div>
            </motion.div>

            {/* Live Intelligence Feed */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-black/40 backdrop-blur-md border border-blue-500/20 rounded-2xl p-6 font-mono text-sm relative overflow-hidden h-64"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50"></div>
              <h3 className="text-blue-400 mb-4 flex items-center gap-2 font-semibold font-sans">
                <Zap className="w-4 h-4" /> Live Reasoning Stream
              </h3>
              <div className="space-y-2">
                <AnimatePresence>
                  {streamLog.map((log, idx) => (
                    <motion.div 
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-gray-300 flex items-start gap-2"
                    >
                      <span className="text-blue-500 mt-0.5">→</span>
                      <span>{log}</span>
                    </motion.div>
                  ))}
                </AnimatePresence>
                {loading && (
                  <motion.div 
                    animate={{ opacity: [0.5, 1, 0.5] }} 
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    className="text-gray-500 flex items-center gap-2 mt-4"
                  >
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-ping"></span>
                    Waiting for agent consensus...
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>

          {/* Right Column: AI Output & Ranking */}
          <div className="lg:col-span-7 space-y-6">
            <AnimatePresence mode="wait">
              {results ? (
                <motion.div 
                  key="results"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="space-y-6"
                >
                  {/* Top Match Card */}
                  <div className="bg-gradient-to-br from-indigo-900/40 to-purple-900/20 border border-indigo-500/30 rounded-2xl p-8 relative overflow-hidden shadow-[0_0_40px_rgba(79,70,229,0.15)]">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                      <ShieldCheck className="w-32 h-32" />
                    </div>
                    
                    <div className="inline-block px-3 py-1 bg-indigo-500/20 border border-indigo-500/40 rounded-full text-indigo-300 text-xs font-bold uppercase tracking-widest mb-4">
                      Primary Target
                    </div>
                    
                    <h2 className="text-3xl font-bold text-white mb-2">{results.top_match?.name || "No Match Found"}</h2>
                    
                    <div className="flex gap-4 mb-8">
                      <span className="bg-black/50 px-3 py-1.5 rounded-lg text-sm text-gray-300 border border-white/5">
                        <span className="text-gray-500 mr-1">Req Cat:</span> {results.top_match?.category}
                      </span>
                      <span className="bg-black/50 px-3 py-1.5 rounded-lg text-sm text-gray-300 border border-white/5">
                        <span className="text-gray-500 mr-1">Max Income:</span> ₹{results.top_match?.max_income}
                      </span>
                    </div>

                    {/* AI Explanation Box */}
                    <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-xl p-5 relative">
                      <div className="absolute -top-3 left-5 bg-indigo-600 px-3 py-0.5 rounded-full text-xs font-bold text-white shadow-lg flex items-center gap-1">
                        <Brain className="w-3 h-3" /> AI Reasoning
                      </div>
                      <p className="text-gray-200 mt-2 leading-relaxed text-sm">
                        {results.reasoning || "Failed to generate reasoning logic."}
                      </p>
                    </div>
                  </div>

                  {/* Strategy Box */}
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                    <h3 className="text-lg font-semibold mb-3 flex items-center gap-2 text-purple-400">
                      <ShieldAlert className="w-5 h-5" /> Recommended Strategy
                    </h3>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {results.overall_strategy}
                    </p>
                  </div>

                  {/* Semantic Match Rankings */}
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                    <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
                      <Target className="w-5 h-5 text-blue-400" /> Vector Database Matches
                    </h3>
                    <div className="space-y-4">
                      {results.all_matches?.slice(1, 4).map((match: any, idx: number) => {
                        // Normalize score to max 100 for percentage bar
                        const percentage = Math.min((match.ranking_score / 150) * 100, 100);
                        return (
                          <div key={idx} className="group">
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-sm font-medium text-gray-200">{match.name}</span>
                              <span className="text-xs text-blue-400 font-mono bg-blue-500/10 px-2 py-0.5 rounded">
                                Score: {match.ranking_score}
                              </span>
                            </div>
                            <div className="h-2 w-full bg-gray-800 rounded-full overflow-hidden">
                              <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: `${percentage}%` }}
                                transition={{ duration: 1, delay: idx * 0.2 }}
                                className="h-full bg-gradient-to-r from-blue-500 to-purple-500 relative"
                              >
                                <div className="absolute top-0 right-0 bottom-0 w-4 bg-white/30 skew-x-[-20deg] group-hover:animate-[translate_1s_infinite]"></div>
                              </motion.div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div 
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="h-full flex flex-col items-center justify-center text-center p-12 border border-dashed border-white/10 rounded-2xl bg-white/[0.02]"
                >
                  <div className="w-24 h-24 rounded-full bg-blue-900/20 flex items-center justify-center mb-6">
                    <Brain className="w-10 h-10 text-blue-500 opacity-50" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">Awaiting Parameters</h3>
                  <p className="text-gray-500 text-sm max-w-sm">
                    Enter your profile details and semantic intent on the left to initialize the multi-agent reasoning flow.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </main>
  );
}
