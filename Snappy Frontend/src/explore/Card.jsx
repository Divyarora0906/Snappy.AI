import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  Sparkles,
  Video,
  X,
  Loader2,
  Download,
  ExternalLink,
} from "lucide-react";

const Card = ({ article }) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  // States
  const [showVideoPopup, setShowVideoPopup] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [videoUrl, setVideoUrl] = useState(null);
  const [status, setStatus] = useState("");

  /**
   * 🎥 MAIN GENERATION HANDLER
   * Connects AI Analysis -> Video Rendering
   */
  const handleGenerateVideo = async (e) => {
    e.stopPropagation(); // Stop card click
    setShowVideoPopup(true);
    setIsGenerating(true);
    setVideoUrl(null);
    setStatus("AI is analyzing news...");

    try {
      // 1️⃣ Step 1: Get AI Analysis (Script & Keywords) from your backend
      const aiResponse = await fetch("http://localhost:5000/api/ask-news", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: article.title,
          userType: "founder",
          articles: [article],
        }),
      });

      if (!aiResponse.ok) throw new Error("AI Analysis failed");
      const aiData = await aiResponse.json();
      console.log(aiData);
      setStatus("Rendering Video (FFmpeg)...");

      // 2️⃣ Step 2: Pass AI results to Video Renderer
      const videoResponse = await fetch("http://localhost:5000/api/videos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          script: aiData.insights.script, // The 5-6 lines narration
          keywords: aiData.insights.image_keywords, // The Pexels keywords
        }),
      });

      const videoData = await videoResponse.json();

      if (videoData.success) {
        setVideoUrl(videoData.url); // Cloudinary URL
      } else {
        throw new Error(videoData.error || "Video rendering failed");
      }
    } catch (err) {
      console.error("❌ Generation Error:", err.message);
      setStatus("Error: " + err.message);
    } finally {
      setIsGenerating(false);
    }
  };

  /**
   * 🖱️ TRACKING & LINK HANDLER
   */
  const handleCardClick = async () => {
    try {
      await fetch("http://localhost:5000/api/reading", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firebase_uid: user?.uid,
          article_id: article.id,
          category: article.category?.toLowerCase(),
          title: article.title,
        }),
      });
    } catch (err) {
      console.log("Tracking failed", err);
    }
    window.open(article.link, "_blank");
  };

  return (
    <>
      <div
        onClick={handleCardClick}
        className="relative bg-[#0A0F1C] border border-[#1e293b] rounded-2xl overflow-hidden hover:border-blue-500/50 transition-all duration-300 group cursor-pointer shadow-lg flex flex-col h-full"
      >
        {/* ✨ Action Buttons */}
        <div className="absolute top-3 right-3 z-20 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={(e) => e.stopPropagation()}
            className="p-2 bg-black/60 backdrop-blur-md border border-white/10 rounded-full hover:bg-blue-600 transition-colors text-white"
          >
            <Sparkles size={16} className="text-yellow-400" />
          </button>
          <button
            onClick={handleGenerateVideo}
            className="p-2 bg-black/60 backdrop-blur-md border border-white/10 rounded-full hover:bg-purple-600 transition-colors text-white"
          >
            <Video size={16} />
          </button>
        </div>

        <div className="p-5 flex-grow">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-slate-200 flex items-center justify-center">
                <span className="text-[10px] font-black text-[#0A0F1C]">
                  {article.source?.[0] || "N"}
                </span>
              </div>
              <span className="text-xs font-bold text-slate-300">
                {article.source}
              </span>
            </div>
            <span className="text-[10px] font-medium text-slate-500">
              {new Date(article.pubDate).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>
          <h4 className="text-[15px] font-bold text-white mb-2 leading-tight group-hover:text-blue-400 transition-colors line-clamp-2">
            {article.title}
          </h4>
        </div>

        <div className="h-32 w-full overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F1C] via-[#0A0F1C]/40 to-transparent z-10"></div>
          <img
            src={
              article.image ||
              "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=400"
            }
            alt=""
            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
          />
        </div>
      </div>

      {/* 📺 VIDEO POPUP */}
      {showVideoPopup && (
        <div className="fixed inset-0 z-[100] flex items-center justify-end p-6 pointer-events-none">
          <div className="w-48 md:w-[280px] bg-[#0F172A] border border-white/10 rounded-2xl shadow-2xl pointer-events-auto overflow-hidden animate-in slide-in-from-right duration-300">
            <div className="p-4 border-b border-white/10 flex justify-between items-center bg-white/5">
              <div className="flex items-center gap-2">
                <Video size={18} className="text-purple-400" />
                <span className="text-xs font-bold text-white uppercase tracking-wider">
                  Snappy.News 
                </span>
              </div>
              <button
                onClick={() => setShowVideoPopup(false)}
                className="text-slate-400 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6">
              {isGenerating ? (
                <div className="flex flex-col items-center py-10 gap-4">
                  <Loader2 size={40} className="text-blue-500 animate-spin" />
                  <div className="text-center">
                    <p className="text-white text-sm font-medium">{status}</p>
                    <p className="text-slate-500 text-[10px] mt-1 uppercase tracking-tighter">
                      Please wait, stitching assets...
                    </p>
                  </div>
                </div>
              ) : videoUrl ? (
                <div className="space-y-4 animate-in fade-in zoom-in">
                  <div className="aspect-[9/16] bg-black rounded-xl overflow-hidden border border-white/5 shadow-inner">
                    <video
                      src={videoUrl}
                      controls
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              ) : (
                <div className="py-10 text-center">
                  <p className="text-slate-500 text-xs">
                    {status || "Ready to Generate"}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Card;
