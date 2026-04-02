import React from 'react';
import { Sparkles, Zap, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import LoginForm from '../auth/loginform';

export default function Auth() {
  return (
    <div className="min-h-screen bg-[#020409] text-slate-200 font-sans selection:bg-blue-500/30 overflow-hidden relative flex items-center justify-center">
      
      {/* Background glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.15),transparent_60%)] pointer-events-none z-0"></div>
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none z-0"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-fuchsia-600/10 rounded-full blur-[120px] pointer-events-none z-0"></div>

      {/* Grid overlay */}
      <div
        className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      ></div>

      <div className="w-full max-w-[1200px] mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center justify-center lg:gap-20">
        
        {/* Left branding */}
        <div className="hidden md:flex flex-col w-1/2 animate-fade-in-up pr-10">
          <Link to="/" className="flex items-center gap-3 mb-10 cursor-pointer group w-fit">
            <span className="font-extrabold text-2xl text-white tracking-widest uppercase">
              Snappy<span className="text-blue-500">.</span>AI
            </span>
          </Link>

          <h1 className="text-4xl lg:text-6xl font-black text-white leading-[1.1] tracking-tight mb-6">
            Decode the <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-fuchsia-400">
              global narrative.
            </span>
          </h1>

          <p className="text-lg text-slate-400 font-medium max-w-md leading-relaxed mb-12">
            Join Snappy.AI
          </p>

          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-4 text-slate-300">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20 shadow-inner">
                <Zap className="w-5 h-5 text-blue-400" />
              </div>
              <span className="font-semibold text-[15px]">Real-time data stream processing</span>
            </div>
            <div className="flex items-center gap-4 text-slate-300">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 shadow-inner">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
              </div>
              <span className="font-semibold text-[15px]">Enterprise-grade fact verification</span>
            </div>
          </div>
        </div>

        {/* Right — Login Form */}
        <LoginForm />
      </div>
    </div>
  );
}