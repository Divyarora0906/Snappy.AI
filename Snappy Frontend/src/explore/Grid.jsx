import React, { useEffect, useState } from "react";
import Card from "./Card";

const Grid = ({ category }) => {
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const ITEMS_PER_PAGE = 12;

  // 🔥 Fetch only 12 per page
  const fetchNews = async (pageNum = 1) => {
    try {
      setLoading(true);

      const url = category
        ? `http://localhost:5000/api/news/all?page=${pageNum}&limit=${ITEMS_PER_PAGE}&category=${category}`
        : `http://localhost:5000/api/news/all?page=${pageNum}&limit=${ITEMS_PER_PAGE}`;

      const res = await fetch(url);
      const json = await res.json();

      setArticles(json.data || []);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  // 🔥 Reload when category changes
  useEffect(() => {
    setPage(1);
    fetchNews(1);
  }, [category]);

  // 🔥 Fetch on page change
  useEffect(() => {
    fetchNews(page);
  }, [page]);

  return (
    <>
      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 min-h-[600px]">

        {/* 🔥 Skeleton Loader */}
        {loading ? (
          [...Array(12)].map((_, i) => (
            <div
              key={i}
              className="bg-[#0A0F1C] border border-[#1e293b] rounded-2xl h-[260px] animate-pulse"
            >
              <div className="h-32 bg-slate-800 rounded-t-2xl"></div>
              <div className="p-4 space-y-3">
                <div className="h-3 bg-slate-700 rounded w-1/3"></div>
                <div className="h-4 bg-slate-700 rounded w-full"></div>
                <div className="h-4 bg-slate-700 rounded w-5/6"></div>
              </div>
            </div>
          ))
        ) : articles.length === 0 ? (
          <p className="text-center text-slate-400 col-span-3">
            No articles found
          </p>
        ) : (
          articles.map((item) => (
            <Card key={item.id} article={item} />
          ))
        )}
      </div>

      {/* PAGINATION */}
      <div className="flex justify-center mt-8 gap-2">
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
          className="px-4 py-2 bg-gray-800 text-white rounded disabled:opacity-50"
        >
          Prev
        </button>

        <span className="px-4 py-2 text-white font-semibold">
          Page {page}
        </span>

        <button
          onClick={() => setPage((p) => p + 1)}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          Next
        </button>
      </div>
    </>
  );
};

export default Grid;