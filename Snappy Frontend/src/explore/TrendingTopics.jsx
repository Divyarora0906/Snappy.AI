import React, { useEffect, useState } from "react";

const TrendingTopics = ({ setCategory, selectedCategory }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/categories")
      .then((res) => res.json())
      .then((data) => {
        setCategories(data.data || []);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="flex flex-col items-center mb-10 mt-2 animate-fade-in-up">
      <div className="flex flex-wrap justify-center gap-4 mt-6">

        {/* 🔥 SKELETON */}
        {loading ? (
          [...Array(6)].map((_, i) => (
            <div
              key={i}
              className="px-6 py-2.5 rounded-full bg-slate-800/60 animate-pulse h-[36px] w-[90px]"
            ></div>
          ))
        ) : (
          <>
            {/* 🔥 ALL BUTTON */}
            <button
              onClick={() => {
                setCategory("");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all
                ${
                  selectedCategory === ""
                    ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-[0_0_20px_rgba(59,130,246,0.3)]"
                    : "bg-white/5 backdrop-blur-sm border border-white/10 text-slate-300 hover:border-blue-500/50 hover:text-white"
                }
              `}
            >
              All
            </button>

            {/* 🔥 DYNAMIC CATEGORIES */}
            {categories.map((cat) => {
              const slug = cat.name.toLowerCase();

              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    setCategory(slug);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all
                    ${
                      selectedCategory === slug
                        ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-[0_0_20px_rgba(59,130,246,0.3)]"
                        : "bg-white/5 backdrop-blur-sm border border-white/10 text-slate-300 hover:border-blue-500/50 hover:text-white"
                    }
                  `}
                >
                  {cat.name}
                </button>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
};

export default TrendingTopics;