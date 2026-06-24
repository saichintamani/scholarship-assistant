"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Zap, Database } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-[200vh]">
      {/* Sticky Glassmorphism Navbar */}
      <nav className="sticky top-0 z-50 flex justify-between items-center px-10 py-6 border-b border-white/10 bg-[#05060A]/60 backdrop-blur-xl shadow-lg transition-all duration-300">
        <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500 font-mono tracking-tight">
          Atlas Scholarship AI
        </h1>
        <div className="flex gap-4">
          <Link href="/login" className="px-5 py-2.5 font-semibold text-gray-300 hover:text-white transition">Log In</Link>
          <Link href="/login" className="neon-button px-5 py-2.5 font-bold">Get Started</Link>
        </div>
      </nav>

      {/* Hero */}
      <main className="max-w-6xl mx-auto px-6 py-20 text-center relative">
        {/* Floating Background Particles */}
        <motion.div animate={{ y: [0, -20, 0], opacity: [0.3, 0.6, 0.3] }} transition={{ repeat: Infinity, duration: 4 }} className="absolute top-10 left-20 w-32 h-32 bg-indigo-500 rounded-full blur-[100px] z-0" />
        <motion.div animate={{ y: [0, 20, 0], opacity: [0.3, 0.6, 0.3] }} transition={{ repeat: Infinity, duration: 6 }} className="absolute bottom-10 right-20 w-48 h-48 bg-purple-600 rounded-full blur-[120px] z-0" />

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="relative z-10">
          <span className="inline-block px-4 py-1.5 mb-6 text-sm font-bold text-cyan-400 bg-cyan-900/30 border border-cyan-500/50 rounded-full uppercase tracking-wider shadow-[0_0_15px_rgba(34,211,238,0.4)]">
            Now in Public Beta
          </span>
          <h2 className="text-5xl md:text-7xl font-bold text-white tracking-tight mb-8 leading-tight">
            Education Funding, <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400">Solved by AI.</span>
          </h2>
          <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto font-medium">
            Stop searching blindly. Our Multi-Agent AI system uses semantic reasoning to instantly match you with the scholarships you actually qualify for based on caste, income, and intent.
          </p>
          <Link href="/login" className="neon-button inline-flex items-center gap-2 px-8 py-4 text-lg font-bold group">
            Launch AI Intelligence <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        {/* Feature Grid */}
        <div className="grid md:grid-cols-3 gap-8 mt-32 text-left relative z-10">
          {[
            { icon: Zap, title: "Semantic Matching", desc: "Using FAISS Vector Search to understand your exact profile intent instead of simple keyword matching." },
            { icon: Database, title: "Live Intelligence", desc: "Automated scraping nodes pull the latest scholarships daily into our vector database." },
            { icon: ShieldCheck, title: "Fraud Protection", desc: "Our AI Verification Agent cross-references domains to protect students from scam portals." }
          ].map((feat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }} 
              whileHover={{ y: -5 }}
              className="glass-card p-8"
            >
              <div className="w-12 h-12 bg-indigo-900/50 border border-indigo-500/50 rounded-xl flex items-center justify-center mb-6 shadow-[0_0_15px_rgba(99,102,241,0.3)]">
                <feat.icon className="w-6 h-6 text-indigo-400" />
              </div>
              <h3 className="text-xl font-bold mb-3 font-mono text-white">{feat.title}</h3>
              <p className="text-gray-400 leading-relaxed">{feat.desc}</p>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
}
