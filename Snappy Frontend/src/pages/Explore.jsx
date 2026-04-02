import React, { useState } from "react";
import Header from "../components/Header";
import Grid from "../explore/Grid";
import TrendingTopics from "../explore/TrendingTopics";
import Footer from "../components/Footer";
import Sidebar from "../explore/Sidebar";

export default function Explore() {
  // 🔥 central state
  const [category, setCategory] = useState("");

  return (
    <div className="min-h-screen bg-[#05070E] text-slate-200 font-sans selection:bg-blue-500/30 overflow-x-hidden relative">
      <div className="fixed top-0 left-0 right-0 h-64 bg-gradient-to-b from-[#0B152A] to-transparent pointer-events-none opacity-50 z-0"></div>
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[400px] bg-blue-600/10 rounded-[100%] blur-[120px] pointer-events-none z-0"></div>

      <Header />

      <main className="max-w-[1400px] mx-auto px-6 py-2 relative z-10 w-full mb-10">
        {/* 🔥 pass state */}
        <TrendingTopics
          setCategory={setCategory}
          selectedCategory={category}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* 🔥 pass category */}
            <Grid category={category} />
          </div>

          <Sidebar />
        </div>
      </main>

      <Footer />
    </div>
  );
}