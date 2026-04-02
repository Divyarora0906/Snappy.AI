import React from "react";
import { useNavigate } from "react-router-dom";
const LiveAlerts = () => {
  const navigate = useNavigate();
  const handleNav = (path) => {
    navigate(path);
  };
  return (
    <>
      <div className="bg-[#090D1A]/90 backdrop-blur-2xl border border-white/10 shadow-2xl rounded-3xl p-6 relative overflow-hidden group">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-orange-400" /> Live Alerts
          </h3>
        </div>
        <div className="space-y-4">
          <div
            onClick={() => handleNav("/article")}
            className="p-4 rounded-2xl bg-[#1A110B]/80 border border-orange-500/30 hover:bg-[#1A110B] hover:border-orange-500/60 cursor-pointer transition-colors shadow-sm relative overflow-hidden group/alert"
          >
            <div className="absolute top-0 right-0 w-12 h-12 bg-orange-500/10 rounded-full blur-xl group-hover/alert:bg-orange-500/20 transition-colors"></div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-pulse"></span>
              <span className="text-[9px] font-black text-orange-400 uppercase tracking-widest">
                Urgent Market Shift
              </span>
            </div>
            <p className="text-[13px] font-semibold text-slate-200 leading-snug group-hover/alert:text-white transition-colors">
              Major tech stock plummeted 4% following a leaked memo on GPU
              scarcity.
            </p>
          </div>
          <div
            onClick={() => handleNav("/tracker")}
            className="p-4 rounded-2xl bg-[#09151D]/80 border border-cyan-500/30 hover:bg-[#09151D] hover:border-cyan-500/60 cursor-pointer transition-colors shadow-sm relative overflow-hidden group/alert"
          >
            <div className="absolute top-0 right-0 w-12 h-12 bg-cyan-500/10 rounded-full blur-xl group-hover/alert:bg-cyan-500/20 transition-colors"></div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-pulse"></span>
              <span className="text-[9px] font-black text-cyan-400 uppercase tracking-widest">
                Story Update
              </span>
            </div>
            <p className="text-[13px] font-semibold text-slate-200 leading-snug group-hover/alert:text-white transition-colors">
              Startup OpenAI board has announced 2 new independent directors.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default LiveAlerts;
