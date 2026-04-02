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
import React from "react";
import { Link, useNavigate } from "react-router-dom";
const Footer = () => {
  const navigate = useNavigate();
  return (
    <>
      <footer className="border-t border-[#1e293b]/50 bg-[#030409] py-16 px-6 md:px-12 relative z-10 mt-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-1">
            <Link
              to="/"
              className="flex items-center gap-2 mb-6 cursor-pointer opacity-90 hover:opacity-100 transition-opacity"
            >
              <div className="bg-gradient-to-tr from-blue-600 to-indigo-500 p-1.5 rounded-[10px] shadow-lg shadow-blue-500/20 border border-blue-400/20">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="font-extrabold text-xl text-white tracking-widest uppercase">
                Snappy<span className="text-blue-500">.</span>News
              </span>
            </Link>
            <p className="text-sm text-slate-400/80 mb-6 leading-relaxed">
              Democratizing complex information through real-time AI
              intelligence. Stop reading endless articles, start understanding
              contexts.
            </p>
          </div>

          <div>
            <h4 className="text-white font-bold tracking-wide mb-6 text-sm">
              Product
            </h4>
            <ul className="space-y-4 text-sm text-slate-400">
              <li>
                <Link
                  to="/explore"
                  className="hover:text-white hover:translate-x-1 inline-block transition-all"
                >
                  Explore Trends
                </Link>
              </li>
              <li>
                <Link
                  to="/chat"
                  className="hover:text-white hover:translate-x-1 inline-block transition-all"
                >
                  AI Chat
                </Link>
              </li>
              <li>
                <Link
                  to="/tracker"
                  className="hover:text-white hover:translate-x-1 inline-block transition-all"
                >
                  Story Timeline Tracker
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard"
                  className="hover:text-white hover:translate-x-1 inline-block transition-all"
                >
                  My Analytics Dashboard
                </Link>
              </li>
              <li>
                <Link
                  to="/account"
                  className="hover:text-white hover:translate-x-1 inline-block transition-all text-fuchsia-400"
                >
                  Account Settings
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold tracking-wide mb-6 text-sm">
              Company
            </h4>
            <ul className="space-y-4 text-sm text-slate-400">
              <li>
                <button
                  onClick={() => navigate("/explore")}
                  className="hover:text-white hover:translate-x-1 inline-block transition-all"
                >
                  About Snappy.AI
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate("/explore")}
                  className="hover:text-white hover:translate-x-1 inline-block transition-all"
                >
                  Hackathon Mission
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate("/explore")}
                  className="hover:text-white hover:translate-x-1 inline-block transition-all"
                >
                  Privacy Concept
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate("/explore")}
                  className="hover:text-white hover:translate-x-1 inline-block transition-all"
                >
                  Enterprise API
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold tracking-wide mb-6 text-sm">
              Get the App
            </h4>
            <div className="flex flex-col gap-3">
              <Link
                to="/auth"
                className="bg-[#0B101E] border border-[#1e293b] hover:border-blue-500/50 hover:bg-blue-500/5 rounded-xl px-4 py-3 flex items-center justify-center text-sm font-medium text-slate-300 hover:text-white transition-all w-full sm:w-48 shadow-sm"
              >
                Create Free Account
              </Link>
              <div className="flex items-center gap-4 mt-4">
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-full bg-[#0B101E] border border-[#1e293b] flex items-center justify-center hover:bg-[#1DA1F2]/10 hover:border-[#1DA1F2]/50 transition-colors group"
                >
                  <Twitter className="w-4 h-4 text-slate-400 group-hover:text-[#1DA1F2]" />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-full bg-[#0B101E] border border-[#1e293b] flex items-center justify-center hover:bg-[#0077b5]/10 hover:border-[#0077b5]/50 transition-colors group"
                >
                  <Linkedin className="w-4 h-4 text-slate-400 group-hover:text-[#0077b5]" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto pt-8 border-t border-[#1e293b]/50 flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] text-slate-500/80 font-medium">
          <p>© 2026 Snappy.AI Technologies. Built for National Hackathon.</p>
          <div className="flex items-center gap-2 bg-[#0B101E] px-3 py-1.5 rounded-full border border-emerald-500/20 shadow-inner">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-emerald-500 tracking-wide font-bold">
              All Models Operational
            </span>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
