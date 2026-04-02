import React from "react";
import { Zap, ArrowRight, LogOut, User } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

const Header = () => {
  const { pathname } = useLocation();
  const { user } = useAuth();
  const navigate = useNavigate();

  const navLinkClass = (path) => {
    const isActive = pathname === path;
    return `transition-colors ${
      isActive
        ? "text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]"
        : "hover:text-white"
    }`;
  };

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  // Get first name only
  const firstName = user?.displayName?.split(" ")[0] || user?.email?.split("@")[0];
  console.log(user);

  return (
    <div>
      <nav className="flex items-center justify-between px-6 md:px-12 py-5 border-b border-white/5 backdrop-blur-md sticky top-0 z-50 bg-[#05070E]/70">
        <Link to="/" className="flex items-center gap-2 cursor-pointer group">
          <span className="font-extrabold text-2xl text-white">
            Snappy<span className="text-blue-500">.</span>News
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400 bg-white/5 px-6 py-2 rounded-full border border-white/10 shadow-inner backdrop-blur-sm">
          <Link to="/" className={navLinkClass("/")}>Home</Link>
          <Link to="/explore" className={navLinkClass("/explore")}>Explore</Link>
          <Link to="/dashboard" className={navLinkClass("/dashboard")}>Dashboard</Link>
          <Link to="/tracker" className={navLinkClass("/tracker")}>Tracker</Link>
        </div>

        <div className="flex items-center gap-4">
          {user ? (
            // ── Logged in state ──
            <>
              <Link
                to="/account"
                className="hidden sm:inline-flex items-center gap-2 text-slate-300 hover:text-white text-sm font-medium transition-colors"
              >
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt={firstName}
                    className="w-7 h-7 rounded-full border border-white/20"
                  />
                ) : (
                  <div className="w-7 h-7 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center">
                    <User className="w-3.5 h-3.5 text-blue-400" />
                  </div>
                )}
                {firstName}
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white px-4 py-2.5 rounded-xl text-sm font-bold transition-all"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </>
          ) : (
            // ── Logged out state ──
            <>
              <Link
                to="/auth"
                className="hidden sm:inline-flex text-slate-300 hover:text-white text-sm font-medium transition-colors"
              >
                Log in
              </Link>
              <Link
                to="/auth"
                className="bg-white hover:bg-slate-200 text-[#05070E] px-5 py-2.5 rounded-xl text-sm font-bold transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_25px_rgba(255,255,255,0.4)]"
              >
                Start Free
              </Link>
            </>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Header;