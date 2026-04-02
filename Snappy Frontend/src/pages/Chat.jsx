import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { Sparkles, ArrowRight } from "lucide-react";
import Header from "../components/Header";

export default function Chat() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const query = params.get("query");

  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const scrollRef = useRef(null);
  const hasRun = useRef(false); // ✅ FIX duplicate

  // 🔥 AUTO CALL FIXED
  useEffect(() => {
    if (!query || hasRun.current) return;

    hasRun.current = true;
    sendMessage(query);
  }, [query]);

  // 🔥 SCROLL
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (text) => {
    if (!text.trim()) return;

    const userMsg = {
      id: crypto.randomUUID(),
      type: "user",
      text,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage("");
    setIsLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/ask-news", { // ✅ FIX URL
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: text,
          userType: "founder",
        }),
      });

      if (!res.ok) {
        const errorText = await res.text(); // ✅ read once only
        console.error("API error:", errorText);
        return;
      }

      const data = await res.json();

      const aiMsg = {
        id: crypto.randomUUID(),
        type: "ai",
        summary: data.insights?.summary || data.message,
        key_points: data.insights?.key_points || [],
        impact: data.insights?.impact || "",
        articles: data.articles || [],
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      console.error("Network error:", err);
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#05070E] text-slate-200 flex flex-col">
      <Header />
      {/* HEADER */}

      {/* CHAT */}
      <div className="flex-1 overflow-y-auto px-6 py-8 max-w-3xl mx-auto w-full space-y-6">
        <div className="text-center text-xs text-slate-500">Today</div>

        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${
              msg.type === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div className="max-w-[75%] space-y-2">

              {msg.type === "user" && (
                <div className="bg-blue-600 text-white px-4 py-3 rounded-2xl text-sm">
                  {msg.text}
                </div>
              )}

              {msg.type === "ai" && (
                <div className="bg-[#0A0F1C] border border-[#1e293b] rounded-2xl p-4 space-y-4">

                  <p className="text-sm text-slate-200">
                    {msg.summary}
                  </p>

                  {msg.key_points.length > 0 && (
                    <ul className="list-disc ml-4 text-sm text-slate-300">
                      {msg.key_points.map((p, i) => (
                        <li key={i}>{p}</li>
                      ))}
                    </ul>
                  )}

                  {msg.impact && (
                    <p className="text-xs text-blue-400">
                      {msg.impact}
                    </p>
                  )}

                  {msg.articles?.length > 0 && (
                    <div className="flex gap-3 overflow-x-auto pt-2">
                      {msg.articles.slice(0, 3).map((a, i) => (
                        <img
                          key={i}
                          src={a.image}
                          alt="news"
                          className="w-32 h-20 object-cover rounded-xl cursor-pointer hover:scale-105 transition"
                          onClick={() => window.open(a.link)}
                        />
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="text-center text-blue-400 animate-pulse">
            ✨ AI is thinking...
          </div>
        )}

        <div ref={scrollRef} />
      </div>

      {/* INPUT */}
      <div className="border-t border-[#1e293b] p-4">
        <div className="max-w-3xl mx-auto flex gap-2">
          <input
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={(e) =>
              e.key === "Enter" && sendMessage(inputMessage)
            }
            className="flex-1 px-4 py-3 bg-[#0A0F1C] border border-[#1e293b] rounded-xl outline-none focus:border-blue-500"
            placeholder="Ask about news..."
          />

          <button
            onClick={() => sendMessage(inputMessage)}
            className="bg-blue-600 px-4 rounded-xl hover:scale-105 transition"
          >
            <ArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
}