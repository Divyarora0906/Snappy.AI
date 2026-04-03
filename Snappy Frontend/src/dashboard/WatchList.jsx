import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ChevronRight,
  LayoutGrid,
  Bookmark,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

const WatchList = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const userId = user?.uid;

  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleNav = (path) => {
    navigate(path);
  };

  // ✅ Fetch bookmarks
  useEffect(() => {
    if (!userId) return;

    const fetchBookmarks = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/bookmarks/${userId}`
        );
        const data = await res.json();
        setBookmarks(data);
      } catch (err) {
        console.error("Failed to fetch bookmarks", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookmarks();
  }, [userId]);

  return (
    <div className="bg-[#090D1A]/90 backdrop-blur-2xl border border-white/10 shadow-2xl rounded-3xl p-6 hover:border-indigo-500/20 transition-colors">
      
      {/* Header */}
      <div
        className="flex justify-between items-center mb-6 cursor-pointer group"
        onClick={() => handleNav("/explore")}
      >
        <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2 group-hover:text-indigo-400 transition-colors">
          <LayoutGrid className="w-4 h-4 text-indigo-400" />
          Read Later
        </h3>
        <span className="text-white/30 group-hover:text-white transition-colors">
          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </span>
      </div>

      {/* Content */}
      <div className="space-y-4">

        {/* ⏳ Loading */}
        {loading && (
          <p className="text-slate-500 text-sm">Loading...</p>
        )}

        {/* ❌ Empty State */}
        {!loading && bookmarks.length === 0 && (
          <div className="flex flex-col items-center justify-center py-6 text-center">
            <Bookmark className="w-8 h-8 text-slate-600 mb-2" />
            <p className="text-sm text-slate-400 font-medium">
              No saved articles
            </p>
            <p className="text-xs text-slate-500">
              Save articles to read later
            </p>
          </div>
        )}

        {/* ✅ Bookmarks List */}
        {!loading &&
          bookmarks.length > 0 &&
          bookmarks.slice(0, 5).map((item, index) => (
            <div
              key={index}
              onClick={() => handleNav(`/article/${item.article_id}`)}
              className="flex justify-between items-center group cursor-pointer border-b border-white/5 pb-3 hover:bg-white/5 p-2 -mx-2 rounded-xl transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#0B101E] border border-[#1e293b] flex items-center justify-center group-hover:bg-indigo-500/20 transition-colors">
                  <Bookmark className="w-4 h-4 text-indigo-400" />
                </div>

                <div>
                  <p className="text-sm font-bold text-white group-hover:text-indigo-400 transition-colors line-clamp-1">
                    {item.article_id}
                  </p>
                  <p className="text-[10px] font-medium text-slate-500">
                    Saved Article
                  </p>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default WatchList;