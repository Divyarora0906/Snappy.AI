const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

const fetchTrendingTopics = async () => {
  try {
    const API_KEY = "9c1b96a1a32f46d58a14bdb373b2ce97";

    const response = await fetch(
      `https://newsapi.org/v2/top-headlines?country=us&pageSize=25&apiKey=${API_KEY}`
    );

    const data = await response.json();

    console.log("📰 Trending Raw:", data);

    if (!data.articles) return [];
    const cleanTitles = data.articles.map((a) => {
      let title = a.title || "";

      title = title.split(" - ")[0];
      title = title.split(" | ")[0];

      return title.trim();
    });

    // 🔥 Extract topics
    const topics = cleanTitles.map((title) => {
      return title.split(" ").slice(0, 4).join(" ");
    });

    // ❌ Remove duplicates
    const uniqueTopics = Array.from(new Set(topics));

    return uniqueTopics.slice(0, 10);

  } catch (error) {
    console.error("❌ Service Error:", error.message);
    return [];
  }
};

module.exports = { fetchTrendingTopics };