const { fetchQuery } = require("../service/fetchQuery");
const { fetchTrendingTopics } = require("../service/FetchTrending");
const { fetchIndianNews } = require("../service/generalNewsFetch");
const { generateNews } = require("../service/generateNews");

const askNews = async (req, res) => {
  try {
    const { query, userType } = req.body;

    if (!query) {
      return res.status(400).json({ error: "Query required" });
    }
    const articles = await fetchQuery(query);

    if (articles.length === 0) {
      return res.json({ message: "No news found" });
    }
    console.log(articles);
    const aiResult = await generateNews({
      query,
      userType,
      articles,
    });
    res.json({
      articles,
      insights: aiResult,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};
const getTrendingTopics = async (req, res) => {
  try {
    const topics = await fetchTrendingTopics();

    res.json({
      success: true,
      topics,
    });

  } catch (error) {
    console.error("Controller Error:", error.message);

    res.status(500).json({
      success: false,
      topics: [],
      error: "Failed to fetch trending topics",
    });
  }
};

const fetchtechNews = async (req, res) => {
    try {
        const articles = await fetchIndianNews(TOI_FEEDS.tech);
        res.json({ success: true, source: 'Times of India', category: 'Technology', data: articles });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Tech news fetch karne mein problem aayi' });
    }
}

module.exports = { askNews, getTrendingTopics, fetchtechNews};