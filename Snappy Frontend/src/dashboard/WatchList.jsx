import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Sparkles,
  Bell,
  User,
  Clock,
  Bookmark,
  Settings,
  LogOut,
  Activity,
  ChevronRight,
  LayoutGrid,
  Zap,
  TrendingUp,
  TrendingDown,
  BookOpen,
  AlertCircle,
} from "lucide-react";
const WatchList = () => {
  const navigate = useNavigate();

  const handleNav = (path) => {
    navigate(path);
  };

  return (
    <>
      {/* Watchlist Widget */}
      <div className="bg-[#090D1A]/90 backdrop-blur-2xl border border-white/10 shadow-2xl rounded-3xl p-6 hover:border-indigo-500/20 transition-colors">
        <div
          className="flex justify-between items-center mb-6 cursor-pointer group"
          onClick={() => handleNav("/explore")}
        >
          <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2 group-hover:text-indigo-400 transition-colors">
            <LayoutGrid className="w-4 h-4 text-indigo-400" /> Topic Watchlist
          </h3>
          <span className="text-white/30 group-hover:text-white transition-colors">
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </span>
        </div>

        <div className="space-y-4">
          <div
            onClick={() => handleNav("/explore")}
            className="flex justify-between items-center group cursor-pointer border-b border-white/5 pb-3 hover:bg-white/5 p-2 -mx-2 rounded-xl transition-all"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#0B101E] border border-[#1e293b] flex items-center justify-center group-hover:bg-blue-500/20 transition-colors">
                <span className="text-[10px] font-black text-white">NVDA</span>
              </div>
              <div>
                <p className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">
                  Nvidia Corp
                </p>
                <p className="text-[10px] font-medium text-slate-500">
                  Earnings Report
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-bold flex items-center gap-1 text-emerald-400">
                <TrendingUp className="w-3 h-3" /> +4.2%
              </p>
            </div>
          </div>

          <div
            onClick={() => handleNav("/tracker")}
            className="flex justify-between items-center group cursor-pointer border-b border-white/5 pb-3 hover:bg-white/5 p-2 -mx-2 rounded-xl transition-all"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#0B101E] border border-[#1e293b] flex items-center justify-center group-hover:bg-fuchsia-500/20 transition-colors">
                <span className="text-[10px] font-black text-white">OAI</span>
              </div>
              <div>
                <p className="text-sm font-bold text-white group-hover:text-fuchsia-400 transition-colors">
                  OpenAI
                </p>
                <p className="text-[10px] font-medium text-slate-500">
                  Board Restructuring
                </p>
              </div>
            </div>
            <div className="text-right flex flex-col items-end gap-1">
              <div className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span>
                <p className="text-[11px] font-bold text-blue-400 uppercase tracking-widest">
                  Live
                </p>
              </div>
            </div>
          </div>

          <div
            onClick={() => handleNav("/explore")}
            className="flex justify-between items-center group cursor-pointer hover:bg-white/5 p-2 -mx-2 rounded-xl transition-all"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#0B101E] border border-[#1e293b] flex items-center justify-center group-hover:bg-emerald-500/20 transition-colors">
                <span className="text-[10px] font-black text-white">INTC</span>
              </div>
              <div>
                <p className="text-sm font-bold text-white group-hover:text-emerald-400 transition-colors">
                  Intel Foundry
                </p>
                <p className="text-[10px] font-medium text-slate-500">
                  Govt Grants
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-bold flex items-center gap-1 text-red-400">
                <TrendingDown className="w-3 h-3" /> -1.8%
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WatchList;
