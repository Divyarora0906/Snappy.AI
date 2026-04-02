import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Sparkles,
  Search,
  CheckCircle2,
  BarChart2,
  Users,
  Calendar,
  Zap,
  MessageSquare,
  Bell,
  User,
  LayoutGrid,
  Command,
  ArrowRight,
} from "lucide-react";

import axios from "axios";

const Sidebar = () => {
  // 🔥 TRENDING STATE
  const [trending, setTrending] = useState([]);
  const [loadingTrending, setLoadingTrending] = useState(true);

  // 🔥 METALS STATE
  const [prices, setPrices] = useState({
    gold: null,
    silver: null,
    platinum: null,
  });
  const [loadingMetals, setLoadingMetals] = useState(true);

  // 🔥 FETCH TRENDING
  useEffect(() => {
    fetch("http://localhost:5000/api/news/trending?limit=3")
      .then((res) => res.json())
      .then((data) => setTrending(data.data || []))
      .catch((err) => console.log(err))
      .finally(() => setLoadingTrending(false));
  }, []);

  // 🔥 FETCH METALS (YOUR LOGIC)
  const fetchPrices = async () => {
    // try {
    //   const [goldRes, silverRes, platinumRes] = await Promise.all([
    //     axios.get("https://gold-api.com/price/XAU"),
    //     axios.get("https://gold-api.com/price/XAG"),
    //     axios.get("https://gold-api.com/price/XPT"),
    //   ]);
    //   console.log(goldRes);
    //   const USD_TO_INR = 83;

    //   const convertToGram = (price) =>
    //     (price * USD_TO_INR) / 31.1;

    //   setPrices({
    //     gold: convertToGram(goldRes.data.price),
    //     silver: convertToGram(silverRes.data.price),
    //     platinum: convertToGram(platinumRes.data.price),
    //   });

    //   setLoadingMetals(false);
    // } catch (error) {
    //   console.error("Error fetching prices:", error);
    //   setLoadingMetals(false);
    // }
  };

  useEffect(() => {
    fetchPrices();

    const interval = setInterval(fetchPrices, 60000); // 🔥 auto refresh
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-8 animate-fade-in-up delay-300">

      {/* 🔥 TRENDING BLOCK */}
      <div className="bg-transparent border border-white/5 rounded-3xl p-8 hover:border-[#1e293b] transition-colors">

        <h3 className="flex items-center gap-2 text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-6">
          <Zap className="w-4 h-4 text-blue-500" />
          Trending Now
        </h3>

        <div className="space-y-6">

          {/* SKELETON */}
          {loadingTrending ? (
            [...Array(3)].map((_, i) => (
              <div key={i} className="flex gap-5 items-center animate-pulse">
                <div className="w-10 h-8 bg-slate-800 rounded"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-3 bg-slate-700 rounded w-3/4"></div>
                  <div className="h-2 bg-slate-700 rounded w-1/2"></div>
                </div>
              </div>
            ))
          ) : (
            trending.map((item, index) => (
              <div
                key={index}
                onClick={() => window.open(item.link, "_blank")}
                className="flex gap-5 items-center cursor-pointer group"
              >
                {/* 🔥 01 02 03 */}
                <span className="text-3xl font-black italic text-slate-800 group-hover:text-blue-500/50 transition-all">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <div>
                  <h4 className="text-[15px] font-bold text-slate-200 group-hover:text-white line-clamp-2">
                    {item.title}
                  </h4>
                  <p className="text-[11px] text-slate-500">
                    {item.category || "News"}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* 🔥 METALS BLOCK */}
      <div className="bg-gradient-to-b from-[#0B101E] to-[#0A0F1C] border border-[#1e293b] rounded-3xl p-8 shadow-2xl">

        <h3 className="text-sm font-bold text-white mb-6">
          Metal Prices (₹ / gram)
        </h3>

        <div className="space-y-4">

          {/* SKELETON */}
          {loadingMetals ? (
            [...Array(3)].map((_, i) => (
              <div key={i} className="h-10 bg-slate-800 rounded animate-pulse"></div>
            ))
          ) : (
            <>
              {/* GOLD */}
              <div className="flex justify-between items-center bg-[#12182A] px-4 py-3 rounded-xl">
                <span className="text-xs text-slate-400">Gold</span>
                <span className="text-yellow-400 font-bold">
                  ₹{prices.gold?.toFixed(2)}
                </span>
              </div>

              {/* SILVER */}
              <div className="flex justify-between items-center bg-[#12182A] px-4 py-3 rounded-xl">
                <span className="text-xs text-slate-400">Silver</span>
                <span className="text-gray-300 font-bold">
                  ₹{prices.silver?.toFixed(2)}
                </span>
              </div>

              {/* PLATINUM */}
              <div className="flex justify-between items-center bg-[#12182A] px-4 py-3 rounded-xl">
                <span className="text-xs text-slate-400">Platinum</span>
                <span className="text-blue-400 font-bold">
                  ₹{prices.platinum?.toFixed(2)}
                </span>
              </div>
            </>
          )}

        </div>
      </div>

    </div>
  );
};

export default Sidebar;