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
const UserCard = () => {
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
      <div
        className="bg-[#090D1A]/90 backdrop-blur-2xl border border-white/10 shadow-2xl rounded-3xl p-6 relative overflow-hidden group cursor-pointer"
        onClick={() => handleNav("/account")}
      >
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-600/30 rounded-full blur-3xl group-hover:bg-blue-600/40 transition-all"></div>
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-fuchsia-600/20 rounded-full blur-3xl group-hover:bg-fuchsia-600/30 transition-all"></div>

        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-orange-400 to-pink-500 flex items-center justify-center p-0.5 shadow-lg">
              <div className="w-full h-full bg-[#05070E] rounded-full flex items-center justify-center relative overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80"
                  alt="Avatar"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
            </div>
            <div>
              <h2 className="text-xl font-bold text-white mb-0.5 group-hover:text-blue-400 transition-colors">
                Unknown User
              </h2>
              <p className="text-[11px] font-bold tracking-wider text-blue-400 uppercase drop-shadow-[0_0_5px_rgba(59,130,246,0.3)]">
                Pro Analyst
              </p>
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t border-white/10">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
              <Activity className="w-3.5 h-3.5" /> Intelligence Core
            </h3>
            <div className="flex flex-wrap gap-2">
              <span className="bg-[#12182A] border border-blue-500/30 text-slate-300 hover:bg-blue-600/20 hover:text-white transition-colors text-[10.5px] font-bold px-3 py-1.5 rounded-lg">
                AI Startups
              </span>
              <span className="bg-[#12182A] border border-emerald-500/30 text-slate-300 hover:bg-emerald-600/20 hover:text-white transition-colors text-[10.5px] font-bold px-3 py-1.5 rounded-lg">
                Green Energy
              </span>
              <span className="bg-[#12182A] border border-purple-500/30 text-slate-300 hover:bg-purple-600/20 hover:text-white transition-colors text-[10.5px] font-bold px-3 py-1.5 rounded-lg">
                Quantum
              </span>
            </div>
          </div>

          <button
            onClick={(e) => preventOuter(e, "/account")}
            className="w-full mt-6 bg-white/5 hover:bg-blue-500/20 border border-white/10 hover:border-blue-500/30 py-3 rounded-xl text-xs font-bold text-white transition-all shadow-sm flex items-center justify-center gap-2"
          >
            <Settings className="w-4 h-4" /> Manage Account
          </button>
        </div>
      </div>
    </>
  );
};

export default UserCard;
