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
const UserBehaviour = () => {
  const navigate = useNavigate();

  const handleNav = (path) => {
    navigate(path);
  };

  const preventOuter = (e, path) => {
    e.stopPropagation();
    navigate(path);
  };
  return (
    <>
      <div className="lg:col-span-6 space-y-6">
        {/* The Ultimate "Daily Intelligence" Bento Card */}
        <div
          onClick={() => handleNav("/chat")}
          className="bg-gradient-to-br from-[#0B101E]/90 to-[#0A0F1C]/90 backdrop-blur-3xl border border-white/10 shadow-2xl rounded-3xl p-8 relative overflow-hidden group hover:border-indigo-500/40 transition-all cursor-pointer"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/5 to-transparent z-0 opacity-50 group-hover:opacity-100 transition-all"></div>

          <div className="relative z-10">
            <div className="flex justify-between items-start mb-8">
              <div className="flex items-center gap-3">
                <div className="bg-indigo-600/20 border border-indigo-500/30 p-2.5 rounded-xl shadow-[0_0_15px_rgba(99,102,241,0.2)]">
                  <Zap className="w-6 h-6 text-indigo-400" />
                </div>
                <div>
                  <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest block mb-0.5">
                    Automated Synthesis
                  </span>
                  <h2 className="text-2xl font-bold text-white drop-shadow-md group-hover:text-indigo-300 transition-colors">
                    Daily AI Intelligence
                  </h2>
                </div>
              </div>
              <div className="bg-[#12182A] border border-[#1e293b] text-[9px] font-bold text-slate-400 px-3 py-1.5 rounded-full uppercase tracking-widest flex items-center gap-2 shadow-inner">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping"></div>{" "}
                Live generated
              </div>
            </div>

            <p className="text-[15px] font-medium text-slate-300 leading-relaxed mb-8 border-l-2 border-indigo-500/50 pl-4 bg-indigo-500/5 py-2 rounded-r-lg">
              Over the last 24h, we observed extreme velocity in semiconductor
              infrastructure investments. Two major foundation models achieved
              breakthrough benchmark limits simultaneously.
            </p>

            <div className="space-y-5 bg-[#05070E]/50 rounded-2xl p-6 border border-white/5 shadow-inner">
              <div
                className="flex items-start gap-4 hover:bg-white/5 p-2 -m-2 rounded-lg transition-colors cursor-pointer"
                onClick={(e) => preventOuter(e, "/explore")}
              >
                <div className="w-8 h-8 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                  <TrendingUp className="w-4 h-4 text-blue-400" />
                </div>
                <div>
                  <h4 className="text-[15px] font-bold text-white mb-1 hover:text-blue-400 transition-colors">
                    Semiconductor Rally Continues
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed font-medium">
                    Taiwan manufacturing indicates 15% increase in next-gen
                    wafer orders, driving up confidence globally.
                  </p>
                </div>
              </div>

              <div
                className="flex items-start gap-4 hover:bg-white/5 p-2 -m-2 rounded-lg transition-colors cursor-pointer"
                onClick={(e) => preventOuter(e, "/explore")}
              >
                <div className="w-8 h-8 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                  <BookOpen className="w-4 h-4 text-purple-400" />
                </div>
                <div>
                  <h4 className="text-[15px] font-bold text-white mb-1 hover:text-purple-400 transition-colors">
                    EU Regulation Final Draft
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed font-medium">
                    Lobbyists confirmed minor concessions regarding general
                    purpose AI models. Compliance costs estimated to rise by 4%.
                  </p>
                </div>
              </div>

              <div
                className="flex items-start gap-4 hover:bg-white/5 p-2 -m-2 rounded-lg transition-colors cursor-pointer"
                onClick={(e) => preventOuter(e, "/article")}
              >
                <div className="w-8 h-8 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                  <Activity className="w-4 h-4 text-emerald-400" />
                </div>
                <div>
                  <h4 className="text-[15px] font-bold text-white mb-1 hover:text-emerald-400 transition-colors">
                    Quantum Supremacy Claim
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed font-medium">
                    A stealth startup announced 1,000 fault-tolerant qubits
                    utilizing topological shielding.
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={(e) => preventOuter(e, "/chat")}
              className="mt-8 bg-[#12182A]/80 hover:bg-indigo-600/20 border border-indigo-500/30 hover:border-indigo-400 w-full py-3.5 rounded-xl text-sm font-bold text-indigo-300 hover:text-indigo-100 transition-all flex items-center justify-center gap-2 shadow-lg group/btn"
            >
              Generate deep dive with AI{" "}
              <ChevronRight className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserBehaviour;
