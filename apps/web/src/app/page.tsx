"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Zap, Database } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-10 py-6 border-b-2 border-[#E0E7FF] bg-white">
        <h1 className="text-2xl font-bold text-[#6366F1] font-mono tracking-tight">Atlas Scholarship AI</h1>
        <div className="flex gap-4">
          <Link href="/login" className="px-5 py-2.5 font-semibold text-[#1E1B4B] hover:text-[#6366F1] transition">Log In</Link>
          <Link href="/login" className="flat-button px-5 py-2.5 font-bold">Get Started</Link>
        </div>
      </nav>

      {/* Hero */}
      <main className="max-w-6xl mx-auto px-6 py-20 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <span className="inline-block px-4 py-1.5 mb-6 text-sm font-bold text-[#10B981] bg-[#D1FAE5] border-2 border-[#10B981] rounded-full uppercase tracking-wider">
            Now in Public Beta
          </span>
          <h2 className="text-5xl md:text-7xl font-bold text-[#1E1B4B] tracking-tight mb-8 leading-tight">
            Education Funding, <br/>
            <span className="text-[#6366F1]">Solved by AI.</span>
          </h2>
          <p className="text-xl text-[#4F46E5] mb-12 max-w-2xl mx-auto font-medium">
            Stop searching blindly. Our Multi-Agent AI system uses semantic reasoning to instantly match you with the scholarships you actually qualify for.
          </p>
          <Link href="/login" className="flat-button inline-flex items-center gap-2 px-8 py-4 text-lg font-bold">
            Launch AI Intelligence <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>

        {/* Feature Grid */}
        <div className="grid md:grid-cols-3 gap-8 mt-24 text-left">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="flat-card p-8">
            <div className="w-12 h-12 bg-[#EEF2FF] border-2 border-[#6366F1] rounded-xl flex items-center justify-center mb-6">
              <Zap className="w-6 h-6 text-[#6366F1]" />
            </div>
            <h3 className="text-xl font-bold mb-3 font-mono">Semantic Matching</h3>
            <p className="text-[#4F46E5]">Using FAISS Vector Search to understand your exact profile intent instead of simple keyword matching.</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="flat-card p-8">
            <div className="w-12 h-12 bg-[#EEF2FF] border-2 border-[#6366F1] rounded-xl flex items-center justify-center mb-6">
              <Database className="w-6 h-6 text-[#6366F1]" />
            </div>
            <h3 className="text-xl font-bold mb-3 font-mono">Live Intelligence</h3>
            <p className="text-[#4F46E5]">Automated scraping nodes pull the latest scholarships daily into our vector database.</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="flat-card p-8">
            <div className="w-12 h-12 bg-[#EEF2FF] border-2 border-[#6366F1] rounded-xl flex items-center justify-center mb-6">
              <ShieldCheck className="w-6 h-6 text-[#6366F1]" />
            </div>
            <h3 className="text-xl font-bold mb-3 font-mono">Fraud Protection</h3>
            <p className="text-[#4F46E5]">Our AI Verification Agent cross-references domains to protect students from scam portals.</p>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
