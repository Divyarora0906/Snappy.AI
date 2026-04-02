import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import {
  Sparkles,
  Search,
  Zap,
  TrendingUp,
  BarChart2,
  Globe,
  Leaf,
  Bookmark,
  Twitter,
  Linkedin,
  Layers,
  ArrowRight,
  ChevronRight,
  Command,
  MessageSquare,
} from "lucide-react";

const AISearch = () => {
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const [trending, setTrending] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/news/trending?limit=6")
      .then((res) => res.json())
      .then((data) => setTrending(data.data || []))
      .catch((err) => console.log(err));
  }, []);
  return (
    <section className="pt-24 pb-20 flex flex-col items-center text-center">
      <div className="mb-6 animate-fade-in-up">
        <Link
          to="/explore"
          className="inline-flex items-center gap-2 bg-[#12182A] border border-blue-500/30 text-blue-400 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide shadow-lg shadow-blue-500/10 cursor-pointer hover:border-blue-500/50 transition-colors"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
          </span>
          Snappy.AI 2.0 Live - Start Exploring{" "}
          <ChevronRight className="w-3 h-3 ml-1" />
        </Link>
      </div>

      <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-8 relative z-10 max-w-4xl leading-[1.1] animate-fade-in-up delay-75">
        The future of news,
        <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 drop-shadow-lg">
          personalized by AI.
        </span>
      </h1>

      <p className="text-lg md:text-xl text-slate-400/90 mb-12 max-w-2xl relative z-10 font-medium leading-relaxed animate-fade-in-up delay-150">
        Cut through the noise. Get instant synthesis of global events, real-time
        market impacts, and interactive deep-dives tailored exactly to your
        interests.
      </p>

      {/* Central Search Palette */}
      <div className="w-full max-w-3xl relative animate-fade-in-up delay-200 group">
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>

        <div className="relative flex items-center bg-[#0B101E]/90 backdrop-blur-md border border-[#ffffff15] rounded-xl p-2 shadow-2xl focus-within:border-blue-500/50 transition-colors h-16">
          <div className="pl-4 pr-3 text-slate-400">
            <Search className="w-6 h-6" />
          </div>
          <input
            type="text"
            placeholder="Ask about AI regulations, Nvdia stock, or any topic..."
            className="flex-1 bg-transparent border-none outline-none text-slate-200 placeholder:text-slate-500 text-base md:text-lg px-2 h-full"
            onKeyDown={(e) => {
              if (e.key === "Enter") navigate(`/chat/?query=${input}`);
            }}
            onChange={(e) => setInput(e.target.value)}
          />
          <div className="hidden sm:flex items-center gap-1 px-3 text-slate-500 border-r border-[#ffffff15] h-8 mr-3">
            <Command className="w-4 h-4" />
            <span className="text-xs font-bold font-mono">K</span>
          </div>
          <button
            onClick={() => navigate("/chat")}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white px-8 py-3 rounded-lg text-sm font-bold flex items-center gap-2 transition-all shadow-lg shadow-blue-500/25 h-full"
          >
            Analyze <Zap className="w-4 h-4 fill-white shrink-0" />
          </button>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3 mt-12 relative z-10 animate-fade-in-up delay-300">
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-widest mr-2 flex items-center gap-1">
          <TrendingUp className="w-3.5 h-3.5" /> Trending
        </span>

        {trending.map((item) => (
          <button
            key={item.id}
            onClick={() =>
              navigate(`/chat?query=${encodeURIComponent(item.title)}`)
            }
            className="px-4 py-2 rounded-full border border-[#1e293b] bg-[#0A0F1C]/80 text-slate-300 text-xs font-medium hover:bg-[#12182A] hover:border-blue-500/50 hover:text-white transition-colors backdrop-blur-sm shadow-sm"
          >
            {item.title.slice(0, 40)}...
          </button>
        ))}
      </div>
    </section>
  );
};

export default AISearch;
