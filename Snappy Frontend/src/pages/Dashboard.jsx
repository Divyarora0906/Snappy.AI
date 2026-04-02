import React from "react";
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
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import UserCard from "../dashboard/UserCard";
import WatchList from "../dashboard/WatchList";
import UserBehaviour from "../components/UserBehaviour";

export default function Dashboard() {
  const navigate = useNavigate();

  const handleNav = (path) => {
    navigate(path);
  };

  const preventOuter = (e, path) => {
    e.stopPropagation();
    navigate(path);
  };

  return (
    <div className="min-h-screen bg-[#05070E] text-slate-200 font-sans selection:bg-blue-500/30 overflow-x-hidden relative">
      <div className="fixed top-[-10%] right-[10%] w-[40rem] h-[40rem] bg-indigo-600/10 rounded-full blur-[150px] pointer-events-none z-0"></div>
      <div className="fixed bottom-[-10%] left-[-10%] w-[50rem] h-[50rem] bg-blue-600/10 rounded-full blur-[180px] pointer-events-none z-0"></div>
      <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-[#0B152A] to-transparent pointer-events-none opacity-50 z-0"></div>
      <Header />
      <main className="max-w-[1400px] mx-auto px-6 py-10 relative z-10 w-full mb-10 animate-fade-in-up">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-extrabold text-white tracking-tight flex items-center gap-3 drop-shadow-lg">
            Good morning,{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
              User
            </span>{" "}
            <span className="text-2xl hover:origin-bottom-right hover:rotate-12 transition-transform cursor-default">
              👋
            </span>
          </h1>
          <div
            className="hidden sm:flex items-center gap-2 bg-[#0B101E] border border-[#1e293b] px-4 py-2.5 rounded-xl shadow-lg hover:border-blue-500/30 transition-colors cursor-pointer"
            onClick={() => handleNav("/tracker")}
          >
            <CalendarIcon className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-bold text-slate-300">
              Mar 19, 2026
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-3 space-y-6">
            <UserCard />
            <WatchList />
          </div>
          <UserBehaviour />
          {/* RIGHT COLUMN: Alerts & Bookmarks (3 cols) */}
          <div className="lg:col-span-3 space-y-6">
            {/* Live Alerts */}
          

            {/* Bookmarked Reading */}
            <div className="bg-[#090D1A]/90 backdrop-blur-2xl border border-white/10 shadow-2xl rounded-3xl p-6 hover:border-emerald-500/20 transition-colors">
              <div
                className="flex justify-between items-center mb-6 cursor-pointer group"
                onClick={() => handleNav("/account")}
              >
                <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2 group-hover:text-emerald-400 transition-colors">
                  <Bookmark className="w-4 h-4 text-emerald-400" /> Read Later
                </h3>
              </div>

              <div className="space-y-5">
                <div
                  onClick={() => handleNav("/article")}
                  className="flex gap-4 group cursor-pointer hover:bg-white/5 p-2 -mx-2 rounded-xl transition-all"
                >
                  <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-white/5 relative shadow-sm">
                    <img
                      src="https://images.unsplash.com/photo-1620712948343-008423671236?auto=format&fit=crop&q=80&w=200"
                      alt="Chip"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-[#0B101E]/40 group-hover:bg-transparent transition-colors"></div>
                  </div>
                  <div className="flex flex-col justify-center">
                    <h4 className="text-[13px] font-bold text-white mb-1 group-hover:text-blue-400 transition-colors line-clamp-2 leading-tight">
                      The architectural limits of GPT-5
                    </h4>
                    <span className="text-[10px] font-bold text-slate-500">
                      12 MIN READ
                    </span>
                  </div>
                </div>

                <div
                  onClick={() => handleNav("/article")}
                  className="flex gap-4 group cursor-pointer hover:bg-white/5 p-2 -mx-2 rounded-xl transition-all"
                >
                  <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-white/5 relative shadow-sm">
                    <img
                      src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80&w=200"
                      alt="Stocks"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-[#0B101E]/40 group-hover:bg-transparent transition-colors"></div>
                  </div>
                  <div className="flex flex-col justify-center">
                    <h4 className="text-[13px] font-bold text-white mb-1 group-hover:text-emerald-400 transition-colors line-clamp-2 leading-tight">
                      Venture Capital freezes amidst election
                    </h4>
                    <span className="text-[10px] font-bold text-slate-500">
                      8 MIN READ
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => handleNav("/explore")}
                className="w-full mt-6 bg-[#12182A]/80 hover:bg-[#1a2333] border border-white/5 hover:border-emerald-500/30 py-2.5 rounded-xl text-xs font-bold text-slate-300 hover:text-emerald-400 transition-all shadow-sm"
              >
                Explore More Articles
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

const CalendarIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
    <line x1="16" x2="16" y1="2" y2="6" />
    <line x1="8" x2="8" y1="2" y2="6" />
    <line x1="3" x2="21" y1="10" y2="10" />
    <path d="M8 14h.01" />
    <path d="M12 14h.01" />
    <path d="M16 14h.01" />
    <path d="M8 18h.01" />
    <path d="M12 18h.01" />
    <path d="M16 18h.01" />
  </svg>
);
