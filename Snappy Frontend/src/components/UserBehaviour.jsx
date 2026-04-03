import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ChevronRight,
  Zap,
  TrendingUp,
  BookOpen,
  Activity,
} from "lucide-react";

const UserBehaviour = () => {
  const navigate = useNavigate();

  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleNav = (path) => {
    navigate(path);
  };

  const preventOuter = (e, path) => {
    e.stopPropagation();
    navigate(path);
  };

  // ✅ Fetch latest trending news
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch(
          "http://localhost:5000/api/news/trending?limit=3"
        );
        const data = await res.json();
        setNews(data.data || []);
      } catch (err) {
        console.error("Failed to fetch news", err);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  return (
    <div className="lg:col-span-9 space-y-6">
      {/* FULL WIDTH CARD */}
      <div
        onClick={() => handleNav("/chat")}
        className="bg-gradient-to-br from-[#0B101E]/90 to-[#0A0F1C]/90 backdrop-blur-3xl border border-white/10 shadow-2xl rounded-3xl p-8 relative overflow-hidden group hover:border-indigo-500/40 transition-all cursor-pointer"
      >
        {/* Glow */}
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/5 to-transparent z-0 opacity-50 group-hover:opacity-100 transition-all"></div>

        <div className="relative z-10">
          {/* HEADER */}
          <div className="flex justify-between items-start mb-8">
            <div className="flex items-center gap-3">
              <div className="bg-indigo-600/20 border border-indigo-500/30 p-2.5 rounded-xl shadow-[0_0_15px_rgba(99,102,241,0.2)]">
                <Zap className="w-6 h-6 text-indigo-400" />
              </div>
              <div>
                <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest block mb-0.5">
                  Automated Synthesis
                </span>
                <h2 className="text-2xl font-bold text-white group-hover:text-indigo-300 transition-colors">
                  Daily AI Intelligence
                </h2>
              </div>
            </div>

            <div className="bg-[#12182A] border border-[#1e293b] text-[9px] font-bold text-slate-400 px-3 py-1.5 rounded-full uppercase tracking-widest flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping"></div>
              Live
            </div>
          </div>

          {/* SUMMARY TEXT */}
          <p className="text-[15px] font-medium text-slate-300 leading-relaxed mb-8 border-l-2 border-indigo-500/50 pl-4 bg-indigo-500/5 py-2 rounded-r-lg">
            Here’s what’s trending right now based on global activity and signals.
          </p>

          {/* NEWS LIST */}
          <div className="space-y-5 bg-[#05070E]/50 rounded-2xl p-6 border border-white/5">

            {/* ⏳ Loading */}
            {loading && (
              <p className="text-slate-500 text-sm">Fetching intelligence...</p>
            )}

            {/* ❌ Empty */}
            {!loading && news.length === 0 && (
              <p className="text-slate-500 text-sm">No signals detected</p>
            )}

            {/* ✅ News */}
            {!loading &&
              news.map((item, index) => {
                const icons = [TrendingUp, BookOpen, Activity];
                const Icon = icons[index % icons.length];

                return (
                  <div
                    key={index}
                    className="flex items-start gap-4 hover:bg-white/5 p-2 -m-2 rounded-lg transition-colors cursor-pointer"
                    onClick={(e) =>
                      preventOuter(e, `/article/${item.id}`)
                    }
                  >
                    <div className="w-8 h-8 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center shrink-0 mt-0.5">
                      <Icon className="w-4 h-4 text-indigo-400" />
                    </div>

                    <div>
                      <h4 className="text-[15px] font-bold text-white mb-1 hover:text-indigo-400 transition-colors line-clamp-1">
                        {item.title}
                      </h4>
                      <p className="text-xs text-slate-400 leading-relaxed font-medium line-clamp-2">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
          </div>

          {/* AI BUTTON */}
          <button
            onClick={(e) => preventOuter(e, "/chat")}
            className="mt-8 bg-[#12182A]/80 hover:bg-indigo-600/20 border border-indigo-500/30 hover:border-indigo-400 w-full py-3.5 rounded-xl text-sm font-bold text-indigo-300 hover:text-indigo-100 transition-all flex items-center justify-center gap-2"
          >
            Generate deep dive with AI
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserBehaviour;