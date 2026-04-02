const RSS_TO_JSON_API = "https://api.rss2json.com/v1/api.json?rss_url=";

const TOI_FEEDS = {
  tech: "https://timesofindia.indiatimes.com/rssfeeds/5880659.cms",
  geopolitics: "https://timesofindia.indiatimes.com/rssfeeds/296589292.cms", // World News
  sports: "https://timesofindia.indiatimes.com/rssfeeds/4719148.cms",
};
const fetchIndianNews = async (categoryUrl) => {
  try {
    const url = `${RSS_TO_JSON_API}${encodeURIComponent(categoryUrl)}`;
    const response = await axios.get(url);
    return response.data.items;
  } catch (error) {
    console.error(`Error fetching news:`, error.message);
    throw new Error("Failed to fetch data");
  }
};
module.exports = {fetchIndianNews};


