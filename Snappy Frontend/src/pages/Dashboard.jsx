import React, { useEffect, useState } from "react";
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
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import UserCard from "../dashboard/UserCard";
import WatchList from "../dashboard/WatchList";
import UserBehaviour from "../components/UserBehaviour";
import Skeleton from "../components/Skeleton";

export default function Dashboard() {
  const navigate = useNavigate();
  const today = new Date();

  const formattedDate = today.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const [loading, setLoading] = useState(true);

  const handleNav = (path) => {
    navigate(path);
  };

  useEffect(() => {
    // simulate loading (replace with real logic later)
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#05070E] text-slate-200 font-sans selection:bg-blue-500/30 overflow-x-hidden relative">
      {/* Background Effects */}
      <div className="fixed top-[-10%] right-[10%] w-[40rem] h-[40rem] bg-indigo-600/10 rounded-full blur-[150px] pointer-events-none z-0"></div>
      <div className="fixed bottom-[-10%] left-[-10%] w-[50rem] h-[50rem] bg-blue-600/10 rounded-full blur-[180px] pointer-events-none z-0"></div>
      <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-[#0B152A] to-transparent pointer-events-none opacity-50 z-0"></div>

      <Header />

      <main className="max-w-[1400px] mx-auto px-6 py-10 relative z-10 w-full mb-10 animate-fade-in-up">
        {/* Header Row */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-extrabold text-white tracking-tight flex items-center gap-3 drop-shadow-lg">
            Good morning,{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
              User
            </span>
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
              {formattedDate}
            </span>
          </div>
        </div>

        {/* MAIN CONTENT */}
        {loading ? (
          <DashboardSkeleton />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* LEFT SIDEBAR */}
            <div className="lg:col-span-3 space-y-6">
              <UserCard />
              <WatchList />
            </div>

            {/* RIGHT CONTENT */}
            <UserBehaviour />
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

/* ================= Skeleton Layout ================= */

const DashboardSkeleton = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* LEFT */}
      <div className="lg:col-span-3 space-y-6">
        {/* UserCard Skeleton */}
        <div className="bg-[#090D1A]/90 border border-white/10 rounded-3xl p-6 space-y-4">
          <Skeleton className="w-14 h-14 rounded-full" />
          <Skeleton className="w-32 h-4 rounded" />
          <Skeleton className="w-24 h-3 rounded" />
          <div className="flex gap-2 mt-4">
            <Skeleton className="w-16 h-6 rounded-lg" />
            <Skeleton className="w-16 h-6 rounded-lg" />
            <Skeleton className="w-16 h-6 rounded-lg" />
          </div>
        </div>

        {/* WatchList Skeleton */}
        <div className="bg-[#090D1A]/90 border border-white/10 rounded-3xl p-6 space-y-4">
          <Skeleton className="w-32 h-4 rounded" />
          <Skeleton className="w-full h-10 rounded-lg" />
          <Skeleton className="w-full h-10 rounded-lg" />
        </div>
      </div>

      {/* RIGHT */}
      <div className="lg:col-span-9 space-y-6">
        <div className="bg-[#090D1A]/90 border border-white/10 rounded-3xl p-8 space-y-6">
          <Skeleton className="w-48 h-5 rounded" />
          <Skeleton className="w-full h-16 rounded" />
          <Skeleton className="w-full h-12 rounded" />
          <Skeleton className="w-full h-12 rounded" />
          <Skeleton className="w-full h-12 rounded" />
          <Skeleton className="w-full h-10 rounded-xl" />
        </div>
      </div>
    </div>
  );
};

/* ================= Calendar Icon ================= */

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
