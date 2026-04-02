const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
const fetchQuery = async (query) => {
  try {
    const searchTerm = query.toLowerCase();
    const validCategories = [
      "tech",
      "geopolitics",
      "sports",
      "business",
      "india",
      "science",
    ];

    // 1. Determine the best endpoint
    let url = `http://localhost:5000/api/news/all?limit=100`;

    // If it's a direct category match, use that for better accuracy
    if (validCategories.includes(searchTerm)) {
      url = `http://localhost:5000/api/news/all?category=${searchTerm}`;
    }

    const res = await fetch(url);
    if (!res.ok) throw new Error("Server error");
    const json = await res.json();

    if (json.success && json.data) {
      // 2. SMART MATCHING:
      // Filter articles where the title or description contains the query
      const matches = json.data.filter((article) => {
        const title = article.title.toLowerCase();
        const desc = article.description.toLowerCase();
        return title.includes(searchTerm) || desc.includes(searchTerm);
      });

      // 3. Fallback: If no keyword match, return the latest 'trending' news
      // so the AI has *something* to talk about.
      return matches.length > 0 ? matches : json.data.slice(0, 5);
    }

    return [];
  } catch (error) {
    console.error("Search failed:", error);
    return [];
  }
};
module.exports = { fetchQuery };
