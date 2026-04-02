import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sparkles } from "lucide-react";

const NewsGrid = () => {
  const navigate = useNavigate();

  const [tech, setTech] = useState([]);
  const [geo, setGeo] = useState([]);
  const [business, setBusiness] = useState([]);
  const [science, setScience] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/news/tech")
      .then((res) => res.json())
      .then((data) => setTech(data.data?.slice(0, 6) || []));

    fetch("http://localhost:5000/api/news/geopolitics")
      .then((res) => res.json())
      .then((data) => setGeo(data.data?.slice(0, 5) || []));

    fetch("http://localhost:5000/api/news/business")
      .then((res) => res.json())
      .then((data) => setBusiness(data.data?.slice(0, 5) || []));

    fetch("http://localhost:5000/api/news/science")
      .then((res) => res.json())
      .then((data) => setScience(data.data?.slice(0, 5) || []));
  }, []);

  return (
    <section className="max-w-7xl mx-auto mb-32 mt-10">

      {/* HEADER */}
      <div className="flex justify-between mb-8">
        <h2 className="text-3xl font-bold text-white flex items-center gap-3">
          <Sparkles className="w-6 h-6 text-blue-400" />
          Real-time Insights
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[250px]">

        {/* 🔵 TECH */}
        <div
          onClick={() => navigate("/explore")}
          className="md:col-span-2 md:row-span-2 bg-[#0A0F1C] rounded-3xl p-6 border border-[#1e293b] overflow-hidden"
        >
          <h3 className="text-xl font-bold text-white mb-4">Tech</h3>

          <div className="overflow-hidden relative">
            <div className="fade-top"></div>
            <div className="fade-bottom"></div>

            <div className="animate-scroll flex flex-col gap-3">
              {[...tech, ...tech].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 cursor-pointer group"
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(item.link, "_blank");
                  }}
                >
                  <img src={item.image} className="w-14 h-10 rounded object-cover" />
                  <p className="text-sm text-slate-300 group-hover:text-white line-clamp-2">
                    {item.title}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 🟣 GEOPOLITICS (NOW WITH IMAGE + SCROLL) */}
        <div
          onClick={() => navigate("/explore")}
          className="md:col-span-2 bg-[#0A0F1C] rounded-3xl p-6 border border-[#1e293b] overflow-hidden"
        >
          <h3 className="text-lg font-bold text-white mb-4">Geopolitics</h3>

          <div className="h-[140px] overflow-hidden relative">
            <div className="fade-top"></div>
            <div className="fade-bottom"></div>

            <div className="animate-scroll flex flex-col gap-3">
              {[...geo, ...geo].map((item, i) => (
                <div
                  key={i}
                  className="flex gap-2 items-center cursor-pointer group"
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(item.link, "_blank");
                  }}
                >
                  <img
                    src={item.image}
                    className="w-10 h-8 rounded object-cover"
                  />
                  <p className="text-sm text-slate-300 group-hover:text-white line-clamp-2">
                    {item.title}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 🟢 BUSINESS (NOW ANIMATED + IMAGE) */}
        <div
          onClick={() => navigate("/explore")}
          className="bg-[#0A0F1C] rounded-3xl p-6 border border-[#1e293b] overflow-hidden"
        >
          <h3 className="text-sm font-bold text-white mb-3">Business</h3>

          <div className="h-[140px] overflow-hidden relative">
            <div className="fade-top"></div>
            <div className="fade-bottom"></div>

            <div className="animate-scroll flex flex-col gap-3">
              {[...business, ...business].map((item, i) => (
                <div
                  key={i}
                  className="flex gap-2 items-center cursor-pointer group"
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(item.link, "_blank");
                  }}
                >
                  <img
                    src={item.image}
                    className="w-8 h-6 rounded object-cover"
                  />
                  <p className="text-xs text-slate-300 group-hover:text-white line-clamp-2">
                    {item.title}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 🔥 SCIENCE */}
        <div className="bg-gradient-to-tr from-indigo-900/30 to-purple-900/30 border border-indigo-500/30 rounded-3xl p-6 overflow-hidden relative">

          <h3 className="text-sm font-bold text-white mb-4">
            ⚡ Live Science Feed
          </h3>

          <div className="fade-top"></div>
          <div className="fade-bottom"></div>

          <div className="h-[140px] overflow-hidden">
            <div className="animate-scroll flex flex-col gap-3">
              {[...science, ...science].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 cursor-pointer group"
                  onClick={() => window.open(item.link, "_blank")}
                >
                  <img
                    src={item.image}
                    className="w-10 h-8 object-cover rounded"
                  />
                  <p className="text-xs text-slate-300 group-hover:text-white line-clamp-2">
                    {item.title}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default NewsGrid;