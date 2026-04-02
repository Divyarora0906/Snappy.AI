import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Mail } from "lucide-react";
import { auth, googleProvider } from "../firebase";
import {
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

const LoginForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // ── Sync to Neon (simple, no conflict check here) ────────
  const syncUserToNeon = async (user) => {
    try {
      await fetch("http://localhost:5000/api/users/sync", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firebase_uid: user.uid,
          email: user.email,
          display_name: user.displayName || user.email.split("@")[0],
          photo_url: user.photoURL || null,
        }),
      });
    } catch (err) {
      console.error("Neon sync failed:", err);
    }
  };

  // ── Google Login ──────────────────────────────────────────
  const handleGoogleLogin = async () => {
    setError("");
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      await syncUserToNeon(result.user);
      navigate("/dashboard");
    } catch (err) {
      setError("Google sign-in failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ── Email/Password Submit ─────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (isLogin) {
        // ── LOGIN: just try Firebase directly ──
        await signInWithEmailAndPassword(auth, email, password);
        navigate("/dashboard");

      } else {
        // ── SIGNUP: Firebase first, Neon after ──
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        
        // Set display name
        await updateProfile(userCredential.user, { displayName: name });

        // Sync to Neon — use upsert so no conflict issues
        await syncUserToNeon({
          ...userCredential.user,
          displayName: name, // updateProfile is async, pass name directly
        });

        navigate("/dashboard");
      }

    } catch (err) {
      console.log("Auth error code:", err.code); // helpful for debugging
      switch (err.code) {
        case "auth/user-not-found":
        case "auth/invalid-credential":
          setError("No account found. Please sign up first.");
          setIsLogin(false);
          break;
        case "auth/wrong-password":
          setError("Incorrect password. Please try again.");
          break;
        case "auth/email-already-in-use":
          setError("Account already exists. Please log in instead.");
          setIsLogin(true);
          break;
        case "auth/weak-password":
          setError("Password must be at least 6 characters.");
          break;
        case "auth/invalid-email":
          setError("Please enter a valid email address.");
          break;
        case "auth/too-many-requests":
          setError("Too many attempts. Please try again later.");
          break;
        default:
          setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full md:w-1/2 max-w-[450px] animate-fade-in-up delay-100">
      <div className="bg-[#050811]/80 backdrop-blur-3xl border border-white/[0.08] p-8 md:p-10 rounded-3xl shadow-[0_8px_40px_rgba(0,0,0,0.5)] relative overflow-hidden group">
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-500/20 rounded-full blur-[50px] pointer-events-none transition-all duration-1000 group-hover:bg-blue-500/30"></div>
        <div className="relative z-10">
          <h2 className="text-2xl font-bold text-white mb-2">
            {isLogin ? "Welcome back" : "Create an account"}
          </h2>
          <p className="text-sm text-slate-400 font-medium mb-8">
            {isLogin
              ? "Enter your credentials to access your dashboard."
              : "Start your 14-day free trial. No credit card required."}
          </p>

          {error && (
            <div className="mb-4 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-medium">
              {error}
            </div>
          )}

          <div className="flex w-full mb-6">
            <button
              onClick={handleGoogleLogin}
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl py-3.5 text-sm font-bold text-white transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              {loading ? "Please wait..." : "Continue with Google"}
            </button>
          </div>

          <div className="relative flex items-center justify-center mb-6">
            <div className="border-t border-white/10 w-full"></div>
            <div className="bg-[#050811] px-4 text-xs font-bold text-slate-500 uppercase tracking-widest absolute">
              Or continue with
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="space-y-1.5 focus-within:text-blue-400 transition-colors">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest pl-1">
                  Name
                </label>
                <input
                  type="text"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full bg-[#020409] border border-white/10 rounded-xl px-4 py-3.5 text-white text-sm placeholder-slate-600 focus:border-blue-500/50 outline-none transition-colors shadow-inner"
                />
              </div>
            )}

            <div className="space-y-1.5 focus-within:text-blue-400 transition-colors">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest pl-1">
                Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="email"
                  placeholder="john@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full bg-[#020409] border border-white/10 rounded-xl pl-11 pr-4 py-3.5 text-white text-sm placeholder-slate-600 focus:border-blue-500/50 outline-none transition-colors shadow-inner"
                />
              </div>
            </div>

            <div className="space-y-1.5 focus-within:text-blue-400 transition-colors">
              <div className="flex justify-between items-center pl-1">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                  Password
                </label>
                {isLogin && (
                  <a href="#" className="text-[11px] font-bold text-blue-400 hover:text-blue-300 transition-colors">
                    Forgot?
                  </a>
                )}
              </div>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-[#020409] border border-white/10 rounded-xl px-4 py-3.5 text-white text-sm placeholder-slate-600 focus:border-blue-500/50 outline-none transition-colors shadow-inner"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white py-3.5 rounded-xl text-sm font-extrabold transition-all shadow-[0_4px_20px_rgba(37,99,235,0.3)] hover:shadow-[0_4px_25px_rgba(37,99,235,0.5)] mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Please wait..." : isLogin ? "Sign In to Dashboard" : "Create Free Account"}
              {!loading && <ArrowRight className="w-4 h-4" />}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-xs font-medium text-slate-400">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <button
                onClick={() => { setIsLogin(!isLogin); setError(""); }}
                className="ml-1.5 text-blue-400 font-bold hover:text-blue-300 transition-colors"
              >
                {isLogin ? "Sign up" : "Log in"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;