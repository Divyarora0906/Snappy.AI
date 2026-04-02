import React, { useState } from "react";
import {
  Sparkles,
  Search,
  Bell,
  User,
  Filter,
  BookOpen,
  Activity,
  Clock,
  BookmarkPlus,
  ChevronRight,
  Zap,
  PlayCircle,
  CheckCircle2,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function StoryTracker() {
  const navigate = useNavigate();
  const [subscribed, setSubscribed] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const stories = [
    {
      id: 1,
      title: "The OpenAI Restructuring",
      category: "Company Evolution",
      status: "Developing",
      progress: 75,
      lastUpdate: "2 hours ago",
      color: "from-blue-500 to-indigo-600",
      glowColor: "group-hover:shadow-[0_0_30px_rgba(59,130,246,0.3)]",
      iconColor: "text-blue-400",
      events: [
        { date: "Oct 12", event: "New hardware division announced" },
        { date: "Nov 05", event: "O1 model wide rollout" },
        { date: "Live", event: "Board expansion confirmed" },
      ],
    },
    {
      id: 2,
      title: "EU AI Act Implementation",
      category: "Regulation",
      status: "Critical Phase",
      progress: 40,
      lastUpdate: "1 day ago",
      color: "from-emerald-500 to-teal-600",
      glowColor: "group-hover:shadow-[0_0_30px_rgba(16,185,129,0.2)]",
      iconColor: "text-emerald-400",
      events: [
        { date: "Aug 2025", event: "Initial compliance deadline" },
        { date: "Yesterday", event: "Tech Giants file appeal" },
        { date: "Pending", event: "Fines structure revealed" },
      ],
    },
    {
      id: 3,
      title: "Quantum Supremacy Race",
      category: "Hardware",
      status: "Trending",
      progress: 90,
      lastUpdate: "3 hours ago",
      color: "from-fuchsia-500 to-purple-600",
      glowColor: "group-hover:shadow-[0_0_30px_rgba(217,70,239,0.3)]",
      iconColor: "text-fuchsia-400",
      events: [
        { date: "Sep 15", event: "IBM announces 1000 qubits" },
        { date: "Oct 30", event: "Topological shielding breach" },
        { date: "Live", event: "Fault-tolerance achieved" },
      ],
    },
  ];

  const handleSearch = (e) => {
    if (e.key === "Enter" && searchValue.trim()) {
      navigate("/explore");
    }
  };

  const handleSubscribe = () => {
    setSubscribed(true);
    setTimeout(() => setSubscribed(false), 3000);
  };

  return (
    <div className="min-h-screen bg-[#05070E] text-slate-200 font-sans selection:bg-blue-500/30 overflow-x-hidden relative flex flex-col">
      {/* Dynamic Background Effects */}
      <div className="fixed top-0 right-0 w-[50vw] h-[50vh] bg-blue-600/5 rounded-full blur-[150px] pointer-events-none z-0"></div>
      <div className="fixed bottom-0 left-0 w-[50vw] h-[50vh] bg-fuchsia-600/5 rounded-full blur-[180px] pointer-events-none z-0"></div>

      <Header />

      <main className="max-w-7xl mx-auto px-6 mt-10 w-full relative z-10 flex-grow pb-24 animate-fade-in-up">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-blue-600/20 text-blue-400 border border-blue-500/30 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest flex items-center gap-1.5 backdrop-blur-sm shadow-[0_0_15px_rgba(59,130,246,0.2)]">
                <PlayCircle className="w-3.5 h-3.5" /> Live Engine
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-3 tracking-tight">
              Story{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-fuchsia-400">
                Tracker
              </span>
            </h1>
            <p className="text-slate-400 max-w-2xl text-[15px] leading-relaxed font-medium">
              Follow continuously developing news narratives. Never lose context
              on complex, multi-week tech and AI events. We automatically group
              related articles into chronological timelines.
            </p>
          </div>

        </div>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stories.map((story) => (
            <div
              key={story.id}
              onClick={() => navigate("/article")}
              className={`bg-[#0B101E]/90 backdrop-blur-2xl rounded-3xl border border-white/10 overflow-hidden hover:border-slate-500 transition-all duration-300 shadow-2xl group cursor-pointer relative ${story.glowColor} hover:-translate-y-1`}
            >
              {/* Top Accent Gradient */}
              <div className="h-2 w-full bg-[#12182A] relative overflow-hidden">
                <div
                  className={`absolute top-0 left-0 h-full bg-gradient-to-r ${story.color} transition-all duration-1000 ease-out`}
                  style={{ width: `${story.progress}%` }}
                ></div>
              </div>

              <div className="p-8">
                {/* Header Information */}
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="bg-[#12182A] border border-white/10 text-slate-300 text-[10px] font-bold px-3 py-1.5 rounded-lg uppercase tracking-wider shadow-sm">
                      {story.category}
                    </span>
                    <span className="flex items-center gap-1 text-[10px] font-bold text-slate-500">
                      <Clock className="w-3 h-3" /> {story.lastUpdate}
                    </span>
                  </div>
                  <div
                    className={`w-10 h-10 rounded-xl bg-[#05070E] flex items-center justify-center border border-white/5 shadow-inner ${story.iconColor} group-hover:scale-110 transition-transform`}
                  >
                    <BookOpen className="w-5 h-5" />
                  </div>
                </div>

                <h2 className="text-2xl font-bold text-white mb-3 leading-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-slate-400 transition-all">
                  {story.title}
                </h2>
                <div className="flex items-center gap-2 text-xs font-bold text-slate-400 mb-8 border border-white/5 bg-[#05070E]/50 px-3 py-2 rounded-lg w-fit">
                  <Activity className="w-4 h-4" /> Status:{" "}
                  <span className="text-white drop-shadow-md">
                    {story.status}
                  </span>
                </div>

                {/* Progress Bar Label */}
                <div className="mb-8">
                  <div className="flex justify-between items-center bg-[#05070E] border border-white/5 p-3 rounded-xl">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
                      <Zap className={`w-3.5 h-3.5 ${story.iconColor}`} />{" "}
                      Synthesis Progress
                    </span>
                    <span className="text-sm font-black text-white">
                      {story.progress}%
                    </span>
                  </div>
                </div>

                {/* Vertical Timeline */}
                <div className="mb-8 bg-[#05070E]/50 rounded-2xl p-5 border border-white/5 hover:border-white/10 transition-colors">
                  <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-5 ml-1 flex items-center gap-2">
                    Key Milestones <ChevronRight className="w-3 h-3" />
                  </h3>

                  <div className="relative pl-6 space-y-6 before:absolute before:inset-y-0 before:left-[11px] before:w-[2px] before:bg-slate-800">
                    {story.events.map((event, idx) => {
                      const isLive =
                        event.date === "Live" || event.date === "Today";
                      return (
                        <div key={idx} className="relative text-xs group/item">
                          <div
                            className={`absolute -left-[27px] top-1 w-3.5 h-3.5 rounded-full ring-4 ring-[#0B101E] ${isLive ? "bg-blue-500 animate-pulse ring-blue-500/20" : "bg-slate-700"}`}
                          ></div>
                          <span
                            className={`text-[10px] font-black uppercase tracking-widest block mb-1 ${isLive ? "text-blue-400" : "text-slate-500"}`}
                          >
                            {event.date}
                          </span>
                          <span
                            className={`font-semibold text-sm leading-snug group-hover/item:text-white transition-colors ${isLive ? "text-white" : "text-slate-400"}`}
                          >
                            {event.event}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="w-full bg-[#12182A] border border-white/10 text-slate-300 py-3.5 rounded-xl text-[13px] font-bold transition-all flex items-center justify-center gap-2 group-hover:bg-white group-hover:text-black shadow-lg">
                  Explore Full Timeline{" "}
                  <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Global Stats or Newsletter Banner inside Tracker */}
        <div className="mt-16 bg-gradient-to-br from-indigo-900/30 to-blue-900/30 border border-blue-500/20 hover:border-blue-500/40 transition-colors rounded-3xl p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-8 backdrop-blur-xl relative overflow-hidden shadow-2xl">
          <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-blue-500/20 rounded-full blur-[60px] pointer-events-none"></div>

          <div className="relative z-10 flex-1 text-center md:text-left">
            <h3 className="text-2xl font-extrabold text-white mb-3 tracking-tight">
              Can't keep up with rapid developments?
            </h3>
            <p className="text-[15px] font-medium text-slate-400 max-w-xl leading-relaxed mx-auto md:mx-0">
              Get automated weekly digests of only the stories you are actively
              tracking. We synthesize all updates into one clean summary.
            </p>
          </div>
          <div className="relative z-10 flex w-full md:w-auto shadow-2xl max-w-md mx-auto md:mx-0">
            {subscribed ? (
              <div className="w-full md:w-auto bg-emerald-500/20 border border-emerald-500/50 text-emerald-400 px-8 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 text-sm">
                <CheckCircle2 className="w-5 h-5" /> Subscribed successfully!
              </div>
            ) : (
              <>
                <input
                  type="email"
                  placeholder="Your work email..."
                  className="w-full md:w-72 bg-[#0B101E] border border-white/10 text-white px-5 py-4 rounded-l-2xl outline-none focus:border-blue-500/50 text-sm placeholder:text-slate-500 font-medium transition-colors"
                />
                <button
                  onClick={handleSubscribe}
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:opacity-90 text-white px-8 py-4 rounded-r-2xl text-sm font-bold shadow-lg transition-all shrink-0"
                >
                  Notify Me
                </button>
              </>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
