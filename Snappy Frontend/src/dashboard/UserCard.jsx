import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Activity } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const UserCard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const userId = user?.uid;

  const [preferences, setPreferences] = useState([]);

  // ✅ First name extract
  const firstName = user?.displayName?.split(" ")[0] || "User";

  const handleNav = (path) => {
    navigate(path);
  };

  // ✅ Fetch preferences
  useEffect(() => {
    if (!userId) return;

    const fetchPrefs = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/preferences/${userId}`,
        );
        const data = await res.json();
        setPreferences(data);
      } catch (err) {
        console.error("Failed to fetch preferences", err);
      }
    };

    fetchPrefs();
  }, [userId]);
  const [imgLoaded, setImgLoaded] = useState(false);

  const firstLetter = user?.displayName?.charAt(0)?.toUpperCase() || "U";
  // ✅ Convert weights → percentage
  const totalWeight = preferences.reduce((acc, p) => acc + p.weight, 0);

  return (
    <div
      className="bg-[#090D1A]/90 backdrop-blur-2xl border border-white/10 shadow-2xl rounded-3xl p-6 relative overflow-hidden group cursor-pointer"
      onClick={() => handleNav("/account")}
    >
      {/* Glow Effects */}
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-600/30 rounded-full blur-3xl group-hover:bg-blue-600/40 transition-all"></div>
      <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-fuchsia-600/20 rounded-full blur-3xl group-hover:bg-fuchsia-600/30 transition-all"></div>

      <div className="relative z-10">
        {/* 👋 Greeting */}
        <h1 className="text-white text-lg font-semibold mb-4">
          Good Morning, {firstName}
        </h1>

        {/* 👤 User Info */}
        <div className="flex items-center gap-4 mb-6">
          <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-orange-400 to-pink-500 flex items-center justify-center p-0.5 shadow-lg">
            <div className="w-full h-full bg-[#05070E] rounded-full flex items-center justify-center relative overflow-hidden">
              {!imgLoaded && (
                <span className="text-white text-lg font-bold">
                  {firstLetter}
                </span>
              )}

              {/* ✅ Actual Image */}
              <img
                src={
                  user?.photoURL ||
                  "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80"
                }
                alt="Avatar"
                onLoad={() => setImgLoaded(true)}
                className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 ${
                  imgLoaded ? "opacity-100 scale-100" : "opacity-0 scale-110"
                }`}
              />
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold text-white mb-0.5 group-hover:text-blue-400 transition-colors">
              {user?.displayName}
            </h2>
            <p className="text-[11px] font-bold tracking-wider text-blue-400 uppercase">
              {user?.email}
            </p>
          </div>
        </div>

        {/* 🧠 Preferences */}
        <div className="space-y-4 pt-4 border-t border-white/10">
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
            <Activity className="w-3.5 h-3.5" /> Intelligence Core
          </h3>

          <div className="flex flex-wrap gap-2">
            {preferences.length > 0 ? (
              preferences.map((pref, index) => {
                const percent = totalWeight
                  ? ((pref.weight / totalWeight) * 100).toFixed(0)
                  : 0;

                return (
                  <span
                    key={index}
                    className="bg-[#12182A] border border-blue-500/30 text-slate-300 hover:bg-blue-600/20 hover:text-white transition-colors text-[10.5px] font-bold px-3 py-1.5 rounded-lg"
                  >
                    {pref.name} ({percent}%)
                  </span>
                );
              })
            ) : (
              <span className="text-slate-500 text-xs">No preferences yet</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
