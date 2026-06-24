"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Activity, Database, AlertTriangle, ShieldCheck, Users } from "lucide-react";

export default function AdminDashboard() {
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-10 pb-6 border-b-2 border-[#E0E7FF]">
          <div>
            <h1 className="text-3xl font-bold font-mono text-[#1E1B4B]">Command Center</h1>
            <p className="text-[#4F46E5] font-medium mt-1">System Health & Scraper Operations</p>
          </div>
          <Link href="/dashboard" className="flat-button px-5 py-2.5 font-bold">Return to User App</Link>
        </div>

        {/* Top Stats */}
        <div className="grid grid-cols-4 gap-6 mb-10">
          {[
            { label: "Active Scholarships", val: "14,092", icon: Database, color: "text-[#6366F1]", bg: "bg-[#EEF2FF]" },
            { label: "FAISS Vector Ops", val: "1.2M/hr", icon: Activity, color: "text-[#10B981]", bg: "bg-[#D1FAE5]" },
            { label: "Blocked Scam Sites", val: "482", icon: ShieldCheck, color: "text-[#F59E0B]", bg: "bg-[#FEF3C7]" },
            { label: "Active Sessions", val: "89", icon: Users, color: "text-[#EC4899]", bg: "bg-[#FCE7F3]" },
          ].map((stat, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="flat-card p-6">
              <div className={`w-10 h-10 ${stat.bg} rounded-lg flex items-center justify-center mb-4 border-2 border-[#E0E7FF]`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <p className="text-3xl font-bold font-mono text-[#1E1B4B]">{stat.val}</p>
              <p className="text-sm font-bold text-[#4F46E5] uppercase tracking-wider mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Logs Grid */}
        <div className="grid grid-cols-3 gap-8">
          <div className="col-span-2">
            <h2 className="text-xl font-bold font-mono mb-4 text-[#1E1B4B]">Automated Scraping Logs</h2>
            <div className="flat-card overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-[#EEF2FF] border-b-2 border-[#E0E7FF]">
                  <tr>
                    <th className="px-6 py-4 font-bold text-[#1E1B4B]">Target Domain</th>
                    <th className="px-6 py-4 font-bold text-[#1E1B4B]">Status</th>
                    <th className="px-6 py-4 font-bold text-[#1E1B4B]">Records Parsed</th>
                  </tr>
                </thead>
                <tbody className="divide-y-2 divide-[#E0E7FF] font-medium text-[#4F46E5]">
                  <tr>
                    <td className="px-6 py-4">nsf.gov/funding</td>
                    <td className="px-6 py-4"><span className="px-2 py-1 bg-[#D1FAE5] text-[#10B981] rounded font-bold text-xs">SUCCESS</span></td>
                    <td className="px-6 py-4">245</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4">scholarships.com/api</td>
                    <td className="px-6 py-4"><span className="px-2 py-1 bg-[#D1FAE5] text-[#10B981] rounded font-bold text-xs">SUCCESS</span></td>
                    <td className="px-6 py-4">1,029</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4">sketchy-grants.net</td>
                    <td className="px-6 py-4"><span className="px-2 py-1 bg-[#FEE2E2] text-[#EF4444] rounded font-bold text-xs">BLOCKED BY AI</span></td>
                    <td className="px-6 py-4">0</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold font-mono mb-4 text-[#1E1B4B]">System Alerts</h2>
            <div className="flat-card p-6 space-y-4">
              <div className="flex gap-4 items-start p-4 bg-[#FEF3C7] border-2 border-[#FCD34D] rounded-xl">
                <AlertTriangle className="w-5 h-5 text-[#D97706] mt-0.5 shrink-0" />
                <div>
                  <h4 className="font-bold text-[#92400E]">Rate Limit Warning</h4>
                  <p className="text-sm font-medium text-[#B45309] mt-1">OpenAI API token usage exceeding 80% threshold for the hour.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
