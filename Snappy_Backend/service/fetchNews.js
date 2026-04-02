const fetch = (...args) => import("node-fetch").then(({default: fetch}) => fetch(...args));

const fetchNews = async () => {
  const API_KEY = "9c1b96a1a32f46d58a14bdb373b2ce97";

  const res = await fetch(
    `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`
  );

  const data = await res.json();

  return data.articles.map(item => ({
    title: item.title,
    summary: item.description,
    image: item.image,
    source: item.source.name
  }));
};

module.exports = { fetchNews };