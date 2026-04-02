import React from "react";
import { Link } from "react-router-dom";
import AISearch from "../home/AISearch";
import NewsGrid from "../home/NewsGrid";
import YourAlgorithm from "../home/YourAlgorithm";
import Footer from "../components/Footer";
import Header from "../components/Header"
export default function Home() {
  return (
    <div className="min-h-screen bg-[#05070E] text-slate-200 font-sans selection:bg-blue-500/30 overflow-x-hidden">
      <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-[#0B152A] to-transparent pointer-events-none opacity-50 z-0"></div>
        <Header />
      <div className="absolute top-40 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] pointer-events-none z-0"></div>
      <div className="absolute top-60 right-1/4 w-[30rem] h-[30rem] bg-indigo-600/10 rounded-full blur-[150px] pointer-events-none z-0"></div>

      <main className="px-6 md:px-12 pb-10 relative z-10 w-full">
          <AISearch />
          <NewsGrid />
          <YourAlgorithm />
      </main>
      <Footer />
    </div>
  );
}
