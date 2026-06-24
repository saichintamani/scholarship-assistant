"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Lock } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative">
      <motion.div animate={{ y: [0, -20, 0], opacity: [0.3, 0.6, 0.3] }} transition={{ repeat: Infinity, duration: 5 }} className="absolute top-1/4 left-1/4 w-64 h-64 bg-indigo-600 rounded-full blur-[120px] pointer-events-none" />
      <motion.div animate={{ y: [0, 20, 0], opacity: [0.3, 0.6, 0.3] }} transition={{ repeat: Infinity, duration: 7 }} className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-cyan-600 rounded-full blur-[120px] pointer-events-none" />

      <Link href="/" className="absolute top-6 left-10 text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400 font-mono tracking-tight z-10">Atlas AI</Link>
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }} 
        animate={{ opacity: 1, scale: 1 }} 
        className="glass-card w-full max-w-md p-8 relative z-10"
      >
        <div className="w-16 h-16 bg-black/50 border border-indigo-500/50 rounded-full flex items-center justify-center mb-6 mx-auto shadow-[0_0_20px_rgba(99,102,241,0.4)]">
          <Lock className="w-8 h-8 text-indigo-400" />
        </div>
        
        <h2 className="text-2xl font-bold text-center mb-2 font-mono text-white">System Authentication</h2>
        <p className="text-center text-gray-400 mb-8 font-medium">Access your AI Intelligence Dashboard</p>

        <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label className="block text-xs font-bold text-gray-300 mb-2 uppercase tracking-wider">Email Address</label>
            <input 
              type="email" 
              className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all text-white font-medium"
              placeholder="admin@atlas.ai"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-300 mb-2 uppercase tracking-wider">Password</label>
            <input 
              type="password" 
              className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all text-white font-medium"
              placeholder="••••••••"
            />
          </div>
          
          <Link href="/dashboard" className="neon-button w-full block text-center py-3.5 font-bold mt-6">
            Authenticate Connection
          </Link>
        </form>

        <div className="mt-6 pt-6 border-t border-white/10 text-center">
          <p className="text-sm font-medium text-gray-400">Admin Portal? <Link href="/admin" className="text-cyan-400 font-bold hover:text-cyan-300 hover:underline">Access Command Center</Link></p>
        </div>
      </motion.div>
    </div>
  );
}
