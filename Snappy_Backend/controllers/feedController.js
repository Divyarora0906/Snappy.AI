const { fetchNews } = require("../service/fetchNews");

const getFeed = async (req, res) => {
  try {
    const data = await fetchNews();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch feed" });
  }
};

module.exports = { getFeed };