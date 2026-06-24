"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Activity, Database, AlertTriangle, ShieldCheck, Users } from "lucide-react";

export default function AdminDashboard() {
  return (
    <div className="min-h-screen p-8 relative text-white">
      <motion.div animate={{ opacity: [0.2, 0.4, 0.2] }} transition={{ repeat: Infinity, duration: 4 }} className="absolute top-0 right-0 w-96 h-96 bg-red-900/20 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-10 pb-6 border-b border-white/10">
          <div>
            <h1 className="text-3xl font-bold font-mono text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-500">Command Center</h1>
            <p className="text-gray-400 font-medium mt-1">System Health & Scraper Operations</p>
          </div>
          <Link href="/dashboard" className="neon-button px-5 py-2.5 font-bold">Return to User App</Link>
        </div>

        {/* Top Stats */}
        <div className="grid grid-cols-4 gap-6 mb-10">
          {[
            { label: "Active Scholarships", val: "14,092", icon: Database, color: "text-indigo-400", border: "border-indigo-500/50", glow: "shadow-[0_0_15px_rgba(99,102,241,0.2)]" },
            { label: "FAISS Vector Ops", val: "1.2M/hr", icon: Activity, color: "text-cyan-400", border: "border-cyan-500/50", glow: "shadow-[0_0_15px_rgba(34,211,238,0.2)]" },
            { label: "Blocked Scam Sites", val: "482", icon: ShieldCheck, color: "text-orange-400", border: "border-orange-500/50", glow: "shadow-[0_0_15px_rgba(249,115,22,0.2)]" },
            { label: "Active Sessions", val: "89", icon: Users, color: "text-pink-400", border: "border-pink-500/50", glow: "shadow-[0_0_15px_rgba(236,72,153,0.2)]" },
          ].map((stat, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className={`glass-card p-6 ${stat.glow}`}>
              <div className={`w-10 h-10 bg-black/50 rounded-lg flex items-center justify-center mb-4 border ${stat.border}`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <p className="text-3xl font-bold font-mono text-white">{stat.val}</p>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Logs Grid */}
        <div className="grid grid-cols-3 gap-8">
          <div className="col-span-2">
            <h2 className="text-xl font-bold font-mono mb-4 text-white">Automated Scraping Logs</h2>
            <div className="glass-card overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-white/5 border-b border-white/10">
                  <tr>
                    <th className="px-6 py-4 font-bold text-gray-300">Target Domain</th>
                    <th className="px-6 py-4 font-bold text-gray-300">Status</th>
                    <th className="px-6 py-4 font-bold text-gray-300">Records Parsed</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10 font-medium text-gray-400">
                  <tr className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4 font-mono">nsf.gov/funding</td>
                    <td className="px-6 py-4"><span className="px-2 py-1 bg-cyan-900/30 text-cyan-400 border border-cyan-500/30 rounded font-bold text-xs shadow-[0_0_10px_rgba(34,211,238,0.2)]">SUCCESS</span></td>
                    <td className="px-6 py-4">245</td>
                  </tr>
                  <tr className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4 font-mono">scholarships.com/api</td>
                    <td className="px-6 py-4"><span className="px-2 py-1 bg-cyan-900/30 text-cyan-400 border border-cyan-500/30 rounded font-bold text-xs shadow-[0_0_10px_rgba(34,211,238,0.2)]">SUCCESS</span></td>
                    <td className="px-6 py-4">1,029</td>
                  </tr>
                  <tr className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4 font-mono">sketchy-grants.net</td>
                    <td className="px-6 py-4"><span className="px-2 py-1 bg-red-900/30 text-red-400 border border-red-500/30 rounded font-bold text-xs shadow-[0_0_10px_rgba(239,68,68,0.2)]">BLOCKED BY AI</span></td>
                    <td className="px-6 py-4">0</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold font-mono mb-4 text-white">System Alerts</h2>
            <div className="glass-card p-6 space-y-4">
              <div className="flex gap-4 items-start p-4 bg-orange-900/20 border border-orange-500/50 rounded-xl shadow-[0_0_15px_rgba(249,115,22,0.15)]">
                <AlertTriangle className="w-5 h-5 text-orange-400 mt-0.5 shrink-0" />
                <div>
                  <h4 className="font-bold text-orange-300">Rate Limit Warning</h4>
                  <p className="text-sm font-medium text-orange-200/70 mt-1">OpenAI API token usage exceeding 80% threshold for the hour.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
