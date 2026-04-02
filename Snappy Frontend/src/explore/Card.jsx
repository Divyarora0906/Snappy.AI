import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Card = ({ article }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  console.log(user);
  const handleClick = async () => {
    try {
      // 🔥 Track user behavior (VERY IMPORTANsT for your sytem)
      await fetch("http://localhost:5000/api/reading", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firebase_uid: user?.uid,
          article_id: article.id,
          category: article.category.toLowerCase(), // 🔥 important
          title: article.title,
        }),
      });
    } catch (err) {
      console.log("Tracking failed", err);
    }

    // 👉 open original article
    window.open(article.link, "_blank");
  };

  return (
    <div
      onClick={handleClick}
      className="bg-[#0A0F1C] border border-[#1e293b] rounded-2xl overflow-hidden hover:border-blue-500/50 transition-colors group cursor-pointer shadow-lg flex flex-col h-full"
    >
      <div className="p-5 flex-grow">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-slate-200 flex items-center justify-center">
              <span className="text-[10px] font-black text-[#0A0F1C]">
                {article.source?.[0] || "N"}
              </span>
            </div>

            {/* ✅ dynamic source */}
            <span className="text-xs font-bold text-slate-300">
              {article.source}
            </span>
          </div>

          {/* ✅ dynamic time */}
          <span className="text-[10px] font-medium text-slate-500">
            {new Date(article.pubDate).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>

        {/* ✅ dynamic title */}
        <h4 className="text-[15px] font-bold text-white mb-2 leading-tight group-hover:text-blue-400 transition-colors line-clamp-2">
          {article.title}
        </h4>
      </div>

      <div className="h-32 w-full overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F1C] via-[#0A0F1C]/40 to-transparent z-10"></div>

        {/* 🖼 Image */}
        <img
          src={
            article.image ||
            "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=400"
          }
          alt={article.title}
          className="w-full h-full object-cover transition-all duration-700 
               group-hover:scale-110 
               brightness-90 group-hover:brightness-110 
               contrast-110"
        />
      </div>
    </div>
  );
};

export default Card;
