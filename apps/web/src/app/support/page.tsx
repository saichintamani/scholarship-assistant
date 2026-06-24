"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Mail, Code2, Link as LinkIcon, LifeBuoy } from "lucide-react";

export default function CustomerCare() {
  return (
    <div className="min-h-screen flex flex-col relative z-10 p-6 md:p-12">
      <Link href="/" className="inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300 font-mono mb-8 transition">
        <ArrowLeft className="w-5 h-5" /> Back to Home
      </Link>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl mx-auto w-full mt-10"
      >
        <div className="glass-card p-10 md:p-16 relative overflow-hidden">
          {/* Background Glows */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/20 blur-[100px] rounded-full pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-600/20 blur-[100px] rounded-full pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center text-center">
            <div className="w-20 h-20 bg-indigo-900/50 border border-indigo-500/50 rounded-full flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(99,102,241,0.4)]">
              <LifeBuoy className="w-10 h-10 text-cyan-400" />
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 to-cyan-300">
              Customer Care Portal
            </h1>
            <p className="text-gray-400 text-lg max-w-lg mb-10">
              Need help with your scholarship search or have questions about our AI platform? Reach out directly!
            </p>

            <div className="w-full space-y-4">
              <div className="glass-card p-6 flex flex-col md:flex-row items-center justify-between gap-4 border-white/5 hover:border-indigo-500/30 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-white/5 rounded-lg">
                    <Mail className="w-6 h-6 text-indigo-400" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-white font-semibold text-lg">Sai Chintamani</h3>
                    <p className="text-gray-400 font-mono text-sm">saichintamani5@gmail.com</p>
                  </div>
                </div>
                <a href="mailto:saichintamani5@gmail.com" className="neon-button px-6 py-2 text-sm font-bold w-full md:w-auto">
                  Send Email
                </a>
              </div>

              <div className="glass-card p-6 flex flex-col md:flex-row items-center justify-between gap-4 border-white/5 hover:border-blue-500/30 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-white/5 rounded-lg">
                    <LinkIcon className="w-6 h-6 text-blue-400" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-white font-semibold text-lg">LinkedIn</h3>
                    <p className="text-gray-400 text-sm">Professional Profile</p>
                  </div>
                </div>
                <a href="https://linkedin.com/in/saichintamani" target="_blank" rel="noopener noreferrer" className="px-6 py-2 border border-blue-500/50 text-blue-400 hover:bg-blue-500/10 rounded-lg font-bold transition w-full md:w-auto">
                  Connect
                </a>
              </div>

              <div className="glass-card p-6 flex flex-col md:flex-row items-center justify-between gap-4 border-white/5 hover:border-gray-500/30 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-white/5 rounded-lg">
                    <Code2 className="w-6 h-6 text-gray-300" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-white font-semibold text-lg">GitHub</h3>
                    <p className="text-gray-400 text-sm">SamvaadAI</p>
                  </div>
                </div>
                <a href="https://github.com/saichintamani/SamvaadAI" target="_blank" rel="noopener noreferrer" className="px-6 py-2 border border-gray-500/50 text-gray-300 hover:bg-gray-500/10 rounded-lg font-bold transition w-full md:w-auto">
                  View Source
                </a>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
