"use client";
import { useState } from "react";

export default function Home() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("GENERAL");
  const [income, setIncome] = useState(500000);
  const [results, setResults] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleEvaluate = async () => {
    setLoading(true);
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
      setResults(data);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-gray-950 text-white p-8 font-sans">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600 mb-2">
          Samvaad AI Intelligence Engine
        </h1>
        <p className="text-gray-400 mb-8">FAANG-Level RAG Search & Scholarship Orchestration</p>

        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 shadow-2xl mb-8">
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Semantic Query (What are you looking for?)</label>
              <input 
                type="text" 
                className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="e.g. I need a minority tech grant..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Annual Income (₹)</label>
              <input 
                type="number" 
                className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-blue-500 outline-none"
                value={income}
                onChange={(e) => setIncome(Number(e.target.value))}
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Category</label>
              <select 
                className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-blue-500 outline-none"
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
            className="w-full bg-blue-600 hover:bg-blue-700 transition text-white font-semibold py-3 rounded-lg shadow-lg"
          >
            {loading ? "Agent Orchestrator is Reasoning..." : "Launch AI Intelligence Engine"}
          </button>
        </div>

        {results && (
          <div className="space-y-6">
            {/* Top Match */}
            <div className="bg-blue-900/20 border border-blue-500/30 rounded-xl p-6">
              <h3 className="text-xl font-bold text-blue-400 mb-2">🎯 Primary Target: {results.top_match?.name}</h3>
              <p className="text-sm text-gray-300">Category: {results.top_match?.category} | Max Income: ₹{results.top_match?.max_income}</p>
              <p className="mt-4 text-gray-200"><strong>AI Reasoning Agent:</strong> {results.reasoning}</p>
            </div>

            {/* Strategy */}
            <div className="bg-purple-900/20 border border-purple-500/30 rounded-xl p-6">
              <h3 className="text-xl font-bold text-purple-400 mb-2">🧠 Action Strategy</h3>
              <p className="text-gray-200">{results.overall_strategy}</p>
            </div>

            {/* Semantic Matches */}
            <h3 className="text-xl font-bold mt-8 mb-4">Other Semantic RAG Matches</h3>
            <div className="grid grid-cols-2 gap-4">
              {results.all_matches?.slice(1).map((match: any, idx: number) => (
                <div key={idx} className="bg-gray-900 border border-gray-800 rounded-lg p-4">
                  <h4 className="font-semibold text-white">{match.name}</h4>
                  <p className="text-sm text-gray-400">FAANG Ranking Score: {match.ranking_score}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
