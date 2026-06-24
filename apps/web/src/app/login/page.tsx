"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Lock } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Link href="/" className="absolute top-6 left-10 text-2xl font-bold text-[#6366F1] font-mono tracking-tight">Atlas AI</Link>
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }} 
        animate={{ opacity: 1, scale: 1 }} 
        className="flat-card w-full max-w-md p-8"
      >
        <div className="w-12 h-12 bg-[#EEF2FF] border-2 border-[#6366F1] rounded-full flex items-center justify-center mb-6 mx-auto">
          <Lock className="w-6 h-6 text-[#6366F1]" />
        </div>
        
        <h2 className="text-2xl font-bold text-center mb-2 font-mono">System Authentication</h2>
        <p className="text-center text-[#4F46E5] mb-8 font-medium">Access your AI Intelligence Dashboard</p>

        <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label className="block text-sm font-bold text-[#1E1B4B] mb-2 uppercase tracking-wider">Email Address</label>
            <input 
              type="email" 
              className="w-full px-4 py-3 bg-white border-2 border-[#E0E7FF] rounded-lg focus:outline-none focus:border-[#6366F1] focus:ring-4 focus:ring-[#E0E7FF] transition-all text-[#1E1B4B] font-medium"
              placeholder="admin@atlas.ai"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-[#1E1B4B] mb-2 uppercase tracking-wider">Password</label>
            <input 
              type="password" 
              className="w-full px-4 py-3 bg-white border-2 border-[#E0E7FF] rounded-lg focus:outline-none focus:border-[#6366F1] focus:ring-4 focus:ring-[#E0E7FF] transition-all text-[#1E1B4B] font-medium"
              placeholder="••••••••"
            />
          </div>
          
          <Link href="/dashboard" className="flat-button w-full block text-center py-3.5 font-bold mt-6">
            Authenticate Connection
          </Link>
        </form>

        <div className="mt-6 pt-6 border-t-2 border-[#E0E7FF] text-center">
          <p className="text-sm font-medium text-[#4F46E5]">Admin Portal? <Link href="/admin" className="text-[#6366F1] font-bold hover:underline">Access Command Center</Link></p>
        </div>
      </motion.div>
    </div>
  );
}
