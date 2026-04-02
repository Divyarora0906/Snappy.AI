import React, { useState } from 'react';
import { 
  Sparkles, CheckCircle2, ArrowLeft, Bookmark, Share2, MessageSquare, 
  BarChart2, ShieldCheck, Clock, Zap, ExternalLink, Activity
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export default function Article() {
  const navigate = useNavigate();
  const [isBookmarked, setIsBookmarked] = useState(false);

  return (
    <div className="min-h-screen bg-[#05070E] text-slate-200 font-sans selection:bg-blue-500/30">
      
      {/* Dynamic Reading Progress Bar */}
      <div className="fixed top-0 left-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-fuchsia-500 w-[35%] z-[60] shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>

      {/* Modern Floating Header */}
      <nav className="fixed top-0 left-0 right-0 px-6 py-4 flex items-center justify-between border-b border-white/5 backdrop-blur-xl bg-[#05070E]/80 z-50">
         <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors bg-white/5 px-4 py-2 rounded-full border border-white/10 hover:border-white/20">
           <ArrowLeft className="w-4 h-4" /> Back to Explore
         </button>
         
         <div className="hidden md:flex items-center gap-2">
           <div className="bg-gradient-to-tr from-blue-600 to-indigo-500 p-1 rounded-sm">
             <Sparkles className="w-3 h-3 text-white" />
           </div>
           <span className="font-extrabold text-[15px] tracking-widest uppercase text-white">Snappy<span className="text-blue-500">.</span>AI</span>
         </div>
         
         <div className="flex items-center gap-3">
           <button onClick={() => setIsBookmarked(!isBookmarked)} className={`p-2 rounded-full border transition-all ${isBookmarked ? 'bg-blue-500/20 border-blue-500/50 text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.2)]' : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'}`}>
             <Bookmark className="w-4 h-4" fill={isBookmarked ? 'currentColor' : 'none'} />
           </button>
           <button className="p-2 rounded-full bg-white/5 border border-white/10 text-slate-400 hover:text-white transition-colors">
             <Share2 className="w-4 h-4" />
           </button>
         </div>
      </nav>

      {/* Main Content Area */}
      <main className="max-w-4xl mx-auto px-6 pt-32 pb-24 relative z-10 animate-fade-in-up">
        
        {/* Article Metadata */}
        <div className="flex flex-wrap items-center gap-4 mb-8 border-b border-white/5 pb-8">
           <span className="bg-blue-600 border border-blue-500 text-white text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-widest shadow-[0_0_15px_rgba(59,130,246,0.4)]">Hardware</span>
           <span className="bg-[#12182A] border border-blue-500/20 text-blue-400 text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-widest flex items-center gap-1.5">
             <Zap className="w-3 h-3" /> High Market Impact
           </span>
           <div className="flex items-center gap-1.5 text-slate-500 text-xs font-medium ml-auto">
             <Clock className="w-3.5 h-3.5" /> 6 MIN READ • UPDATED 2H AGO
           </div>
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-[1.1] tracking-tight text-balance">
          NVIDIA H200 Shortage Triggers Unprecedented Pivot to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-fuchsia-400">Custom Silicon</span>
        </h1>

        <p className="text-xl md:text-2xl text-slate-400 font-medium leading-relaxed mb-10 max-w-3xl">
          Hyperscalers are actively abandoning traditional supply chains, prioritizing internal ASIC development to combat 54-week lead times on next-gen GPUs.
        </p>

        {/* AI Synthesis Box */}
        <div className="bg-gradient-to-br from-[#0A1128] to-[#0A0F1C] border border-indigo-500/30 rounded-3xl p-6 md:p-8 mb-12 shadow-[0_10px_40px_rgba(37,99,235,0.1)] relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-[60px] pointer-events-none"></div>
          
          <div className="flex items-center gap-3 mb-6 relative z-10">
            <div className="bg-gradient-to-tr from-indigo-500 to-purple-500 p-2 rounded-xl shadow-lg shadow-indigo-500/20">
               <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-sm font-bold text-white tracking-wide">Snappy.AI Synthesis</span>
            <span className="ml-auto text-xs font-medium text-slate-500 flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5 text-emerald-500"/> Verified from 124 sources</span>
          </div>

          <ul className="space-y-4 relative z-10">
             <li className="flex gap-4 items-start bg-[#05070E]/50 p-4 rounded-2xl border border-white/5">
                <div className="mt-0.5"><CheckCircle2 className="w-5 h-5 text-blue-400" /></div>
                <div>
                  <h4 className="text-white font-bold text-sm mb-1">Critical Supply Bottleneck</h4>
                  <p className="text-sm text-slate-400 leading-relaxed">TSMC's CoWoS packaging capacity is maxed out until Q3 2025, effectively delaying NVIDIA H200 deliveries globally.</p>
                </div>
             </li>
             <li className="flex gap-4 items-start bg-[#05070E]/50 p-4 rounded-2xl border border-white/5">
                <div className="mt-0.5"><CheckCircle2 className="w-5 h-5 text-fuchsia-400" /></div>
                <div>
                  <h4 className="text-white font-bold text-sm mb-1">The Hyperscaler Pivot</h4>
                  <p className="text-sm text-slate-400 leading-relaxed">Google (TPU v6), Amazon (Trainium3), and Microsoft (Maia 2) have accelerated in-house chip production schedules by 18 months.</p>
                </div>
             </li>
             <li className="flex gap-4 items-start bg-[#05070E]/50 p-4 rounded-2xl border border-white/5">
                <div className="mt-0.5"><CheckCircle2 className="w-5 h-5 text-emerald-400" /></div>
                <div>
                  <h4 className="text-white font-bold text-sm mb-1">Market Sentiment Shock</h4>
                  <p className="text-sm text-slate-400 leading-relaxed">Startups lacking locked-in hardware contracts are seeing valuation dips as deployment timelines stretch.</p>
                </div>
             </li>
          </ul>
        </div>

        {/* Article Body Content */}
        <div className="prose prose-invert prose-lg max-w-none text-slate-300 font-medium">
          <p className="mb-6">The artificial intelligence sector is currently navigating its most severe hardware constraint since the initial ChatGPT boom in 2022. While demand for generative capabilities continues to scale exponentially, the physical infrastructure required to train these massive orbital-class models has hit a fundamental manufacturing wall.</p>
          
          <img src="https://images.unsplash.com/photo-1591405351990-4726e331f14c?auto=format&fit=crop&q=80&w=1200" alt="Server room" className="w-full h-80 object-cover rounded-3xl my-10 border border-white/10 shadow-2xl opacity-90" />
          
          <h3 className="text-2xl font-bold text-white mt-12 mb-6">The CoWoS Dilemma</h3>
          <p className="mb-6">At the heart of the issue is not the fabrication of the silicon wafers themselves, but the intricate "Chip-on-Wafer-on-Substrate" (CoWoS) advanced packaging technique. TSMC, the sole provider of this crucial step for NVIDIA's high-end accelerators, has openly admitted that their expansion efforts cannot outpace the aggressive timelines demanded by Silicon Valley.</p>
          
          <blockquote className="border-l-4 border-blue-500 bg-[#12182A] p-6 rounded-r-2xl my-10 italic text-white text-lg">
            "We are not constrained by capital, we are constrained by the sheer physics of building advanced packaging facilities and training the technicians to operate them."
            <span className="block mt-4 text-sm font-bold text-blue-400 not-italic uppercase tracking-widest">— Industry Executive Leak, via Reuters</span>
          </blockquote>

          <h3 className="text-2xl font-bold text-white mt-12 mb-6">Rise of the Custom ASIC</h3>
          <p className="mb-6">In response, the industry is witnessing a "Balkanization" of hardware. Companies that previously relied solely on NVIDIA's CUDA ecosystem are quietly rewriting core infrastructure to be hardware-agnostic. This ensures that their proprietary models can be trained on Google TPUs, AMD Instinct accelerators, or bespoke internal silicon without requiring complete rewrites.</p>
        </div>

      </main>

      {/* Floating Action Bar / AI Assistant */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-full max-w-lg px-4 z-50">
        <div className="bg-[#0B101E]/90 backdrop-blur-2xl border border-white/10 p-2 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.8)] flex items-center gap-2">
           <button onClick={() => navigate('/chat')} className="flex-1 bg-[#12182A] hover:bg-[#1a2333] border border-blue-500/30 hover:border-blue-500/50 text-slate-200 px-4 py-3 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 shadow-inner">
             <MessageSquare className="w-4 h-4 text-blue-400" /> Chat with AI about this article
           </button>
           <button onClick={() => navigate('/dashboard')} className="px-4 py-3 bg-[#12182A] hover:bg-[#1a2333] border border-white/10 hover:border-white/20 rounded-xl transition-colors text-emerald-400 hover:text-emerald-300">
             <BarChart2 className="w-5 h-5" />
           </button>
        </div>
      </div>

    </div>
  );
}
