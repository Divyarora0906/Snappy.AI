const express = require("express");
const fetch = require("node-fetch");
const dotenv = require("dotenv");
const cors = require("cors");
const { neon } = require("@neondatabase/serverless");
const Parser = require("rss-parser");
const { askNews } = require("./controllers/newsController");
dotenv.config();
const app = express();
app.use(express.text());
const PORT = process.env.PORT || 5000;
const sql = neon(
  "postgresql://neondb_owner:npg_3ji6JhScrPDZ@ep-billowing-dew-amgz9hig-pooler.c-5.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require",
);

const parser = new Parser({
  timeout: 10000,
  headers: { "User-Agent": "Mozilla/5.0 (compatible; SnappyBot/2.0)" },
  customFields: {
    item: [
      ["media:content", "media"],
      ["media:thumbnail", "mediaThumbnail"],
      ["enclosure", "enclosure"],
    ],
  },
});
app.use(cors());
app.use(express.json());
const SOURCES = {
  tech: [
    {
      url: "https://feeds.feedburner.com/TechCrunch",
      source: "TechCrunch",
      category: "Technology",
      color: "#4f8ef7",
    },
    {
      url: "https://www.wired.com/feed/rss",
      source: "Wired",
      category: "Technology",
      color: "#4f8ef7",
    },
    {
      url: "https://www.theverge.com/rss/index.xml",
      source: "The Verge",
      category: "Technology",
      color: "#4f8ef7",
    },
  ],
  geopolitics: [
    {
      url: "https://feeds.bbci.co.uk/news/world/rss.xml",
      source: "BBC News",
      category: "Geopolitics",
      color: "#f0883e",
    },
    {
      url: "https://rss.nytimes.com/services/xml/rss/nyt/World.xml",
      source: "NY Times",
      category: "Geopolitics",
      color: "#f0883e",
    },
  ],
  sports: [
    {
      url: "https://www.espn.com/espn/rss/news",
      source: "ESPN",
      category: "Sports",
      color: "#3fb950",
    },
    {
      url: "https://feeds.bbci.co.uk/sport/rss.xml",
      source: "BBC Sport",
      category: "Sports",
      color: "#3fb950",
    },
  ],
  business: [
    {
      url: "https://feeds.bbci.co.uk/news/business/rss.xml",
      source: "BBC Business",
      category: "Business",
      color: "#bc8cff",
    },
    {
      url: "https://rss.nytimes.com/services/xml/rss/nyt/Business.xml",
      source: "NY Times Business",
      category: "Business",
      color: "#bc8cff",
    },
  ],
  india: [
    {
      url: "https://feeds.feedburner.com/ndtvnews-top-stories",
      source: "NDTV",
      category: "India",
      color: "#ff4560",
    },
    {
      url: "https://www.hindustantimes.com/feeds/rss/india-news/rssfeed.xml",
      source: "Hindustan Times",
      category: "India",
      color: "#ff4560",
    },
  ],
  science: [
    {
      url: "https://www.sciencedaily.com/rss/top/science.xml",
      source: "Science Daily",
      category: "Science",
      color: "#39d353",
    },
    {
      url: "https://feeds.bbci.co.uk/news/science_and_environment/rss.xml",
      source: "BBC Science",
      category: "Science",
      color: "#39d353",
    },
  ],
};

const REGIONS = {
  india: {
    name: "India",
    flag: "🇮🇳",
    color: "#ff9933",
    mustContain: [],
    mustNotContain: [
      "pakistan news",
      "china news",
      "us news",
      "uk news",
      "white house",
      "congress us",
    ],
    feeds: [
      {
        url: "https://feeds.feedburner.com/ndtvnews-india-news",
        source: "NDTV",
        category: "India",
        color: "#ff9933",
      },
      {
        url: "https://www.hindustantimes.com/feeds/rss/india-news/rssfeed.xml",
        source: "Hindustan Times",
        category: "India",
        color: "#ff9933",
      },
      {
        url: "https://timesofindia.indiatimes.com/rss/feeds/46.cms",
        source: "Times of India",
        category: "India",
        color: "#ff9933",
      },
      {
        url: "https://indianexpress.com/section/india/feed/",
        source: "Indian Express",
        category: "India",
        color: "#ff9933",
      },
    ],
  },
  usa: {
    name: "USA",
    flag: "🇺🇸",
    color: "#3c78d8",
    mustContain: [],
    mustNotContain: ["india news", "china news", "uk news", "russia news"],
    feeds: [
      {
        url: "https://rss.nytimes.com/services/xml/rss/nyt/US.xml",
        source: "NY Times",
        category: "USA",
        color: "#3c78d8",
      },
      {
        url: "https://feeds.washingtonpost.com/rss/national",
        source: "Washington Post",
        category: "USA",
        color: "#3c78d8",
      },
      {
        url: "https://feeds.npr.org/1003/rss.xml",
        source: "NPR News",
        category: "USA",
        color: "#3c78d8",
      },
      {
        url: "https://feeds.abcnews.com/abcnews/usheadlines",
        source: "ABC News",
        category: "USA",
        color: "#3c78d8",
      },
    ],
  },
  uk: {
    name: "UK",
    flag: "🇬🇧",
    color: "#c0392b",
    mustContain: [],
    mustNotContain: ["india news", "us news", "china news"],
    feeds: [
      {
        url: "https://feeds.bbci.co.uk/news/uk/rss.xml",
        source: "BBC UK",
        category: "UK",
        color: "#c0392b",
      },
      {
        url: "https://www.theguardian.com/uk-news/rss",
        source: "The Guardian",
        category: "UK",
        color: "#c0392b",
      },
      {
        url: "https://feeds.skynews.com/feeds/rss/uk.xml",
        source: "Sky News UK",
        category: "UK",
        color: "#c0392b",
      },
    ],
  },
  australia: {
    name: "Australia",
    flag: "🇦🇺",
    color: "#27ae60",
    mustContain: [],
    mustNotContain: [],
    feeds: [
      {
        url: "https://www.abc.net.au/news/feed/51120/rss.xml",
        source: "ABC Australia",
        category: "Australia",
        color: "#27ae60",
      },
      {
        url: "https://www.theguardian.com/australia-news/rss",
        source: "Guardian AU",
        category: "Australia",
        color: "#27ae60",
      },
    ],
  },
  canada: {
    name: "Canada",
    flag: "🇨🇦",
    color: "#e74c3c",
    mustContain: [],
    mustNotContain: [],
    feeds: [
      {
        url: "https://www.cbc.ca/cmlink/rss-canada",
        source: "CBC News",
        category: "Canada",
        color: "#e74c3c",
      },
      {
        url: "https://globalnews.ca/canada/feed/",
        source: "Global News",
        category: "Canada",
        color: "#e74c3c",
      },
    ],
  },
  germany: {
    name: "Germany",
    flag: "🇩🇪",
    color: "#f39c12",
    mustContain: [],
    mustNotContain: [],
    feeds: [
      {
        url: "https://rss.dw.com/rdf/rss-en-ger",
        source: "DW News",
        category: "Germany",
        color: "#f39c12",
      },
      {
        url: "https://rss.dw.com/xml/rss-de-all",
        source: "DW German",
        category: "Germany",
        color: "#f39c12",
      },
    ],
  },
  japan: {
    name: "Japan",
    flag: "🇯🇵",
    color: "#e74c3c",
    mustContain: [],
    mustNotContain: [],
    feeds: [
      {
        url: "https://www3.nhk.or.jp/rss/news/cat0.xml",
        source: "NHK World",
        category: "Japan",
        color: "#e74c3c",
      },
      {
        url: "https://japantoday.com/feed",
        source: "Japan Today",
        category: "Japan",
        color: "#e74c3c",
      },
    ],
  },
  uae: {
    name: "UAE",
    flag: "🇦🇪",
    color: "#1abc9c",
    mustContain: [],
    mustNotContain: [],
    feeds: [
      {
        url: "https://www.khaleejtimes.com/rss.xml",
        source: "Khaleej Times",
        category: "UAE",
        color: "#1abc9c",
      },
      {
        url: "https://gulfnews.com/rss",
        source: "Gulf News",
        category: "UAE",
        color: "#1abc9c",
      },
    ],
  },
  france: {
    name: "France",
    flag: "🇫🇷",
    color: "#2980b9",
    mustContain: [],
    mustNotContain: [],
    feeds: [
      {
        url: "https://www.france24.com/en/france/rss",
        source: "France 24",
        category: "France",
        color: "#2980b9",
      },
      {
        url: "https://en.rfi.fr/france/rss",
        source: "RFI France",
        category: "France",
        color: "#2980b9",
      },
    ],
  },
  singapore: {
    name: "Singapore",
    flag: "🇸🇬",
    color: "#e84393",
    mustContain: [],
    mustNotContain: [],
    feeds: [
      {
        url: "https://www.channelnewsasia.com/rssfeeds/8395986",
        source: "CNA Singapore",
        category: "Singapore",
        color: "#e84393",
      },
      {
        url: "https://www.straitstimes.com/news/singapore/rss.xml",
        source: "Straits Times",
        category: "Singapore",
        color: "#e84393",
      },
    ],
  },
};

// ==========================================
// HELPERS
// ==========================================
const stripHtml = (str = "") => str.replace(/<\/?[^>]+(>|$)/g, "").trim();

const extractImage = (item) => {
  if (item.mediaThumbnail?.["$"]?.url) return item.mediaThumbnail["$"].url;
  if (item.media?.["$"]?.url) return item.media["$"].url;
  if (item.enclosure?.url) return item.enclosure.url;
  const match = (item.content || item["content:encoded"] || "").match(
    /<img[^>]+src=["']([^"']+)["']/i,
  );
  if (match) return match[1];
  return null;
};

const fetchFeed = async ({ url, source, category, color }) => {
  const feed = await parser.parseURL(url);
  return (feed.items || []).slice(0, 20).map((item) => ({
    id: item.guid || item.link || Math.random().toString(36),
    title: item.title || "",
    description: stripHtml(
      item.contentSnippet || item.content || item.summary || "",
    ).slice(0, 280),
    image: extractImage(item),
    link: item.link || item.guid || "",
    author: item.creator || item.author || source,
    pubDate: item.isoDate || item.pubDate || new Date().toISOString(),
    source,
    category,
    categoryColor: color,
  }));
};

function mergeAndSort(results) {
  let merged = [];
  results.forEach((r) => {
    if (r.status === "fulfilled") merged.push(...r.value);
  });
  merged.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));
  return merged;
}

function filterToRegion(articles, region) {
  const { mustNotContain = [], mustContain = [] } = region;
  return articles.filter((article) => {
    const text = (article.title + " " + article.description).toLowerCase();
    if (
      mustNotContain.length &&
      mustNotContain.some((kw) => text.includes(kw.toLowerCase()))
    )
      return false;
    if (
      mustContain.length &&
      !mustContain.some((kw) => text.includes(kw.toLowerCase()))
    )
      return false;
    return true;
  });
}

// ==========================================
// USER ROUTES (Neon DB)
// ==========================================

app.get("/api/users/check-email", async (req, res) => {
  const { email } = req.query;
  try {
    const result =
      await sql`SELECT firebase_uid FROM users WHERE email = ${email}`;
    res.json({ exists: result.length > 0 });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/users/sync", async (req, res) => {
  const { firebase_uid, email, display_name, photo_url } = req.body;
  try {
    const existing = await sql`SELECT * FROM users WHERE email = ${email}`;
    if (existing.length > 0 && existing[0].firebase_uid !== firebase_uid) {
      return res.status(409).json({
        error: "already_exists",
        message:
          "An account with this email already exists. Please log in instead.",
      });
    }
    await sql`
      INSERT INTO users (firebase_uid, email, display_name, photo_url)
      VALUES (${firebase_uid}, ${email}, ${display_name}, ${photo_url})
      ON CONFLICT (firebase_uid) DO UPDATE
      SET email = ${email}, display_name = ${display_name}, photo_url = ${photo_url}
    `;
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// ==========================================
// PERSONALIZED TRENDING (TOP 3)
// ==========================================

app.get("/api/recommendations/:firebase_uid", async (req, res) => {
  const { firebase_uid } = req.params;

  try {
    // 1️⃣ Get top preference
    const pref = await sql`
      SELECT c.name
      FROM user_preferences up
      JOIN categories c ON c.id = up.category_id
      WHERE up.firebase_uid = ${firebase_uid}
      ORDER BY up.weight DESC
      LIMIT 1
    `;

    let categoryName;

    if (pref.length > 0) {
      categoryName = pref[0].name;
    } else {
      // 2️⃣ fallback → last read
      const last = await sql`
        SELECT category
        FROM reading_history
        WHERE firebase_uid = ${firebase_uid}
        ORDER BY read_at DESC
        LIMIT 1
      `;

      if (last.length > 0) {
        categoryName = last[0].category;
      }
    }

    // 3️⃣ if still no category → return empty
    if (!categoryName) {
      return res.json({ success: true, data: [] });
    }

    // 🔥 map DB → slug (important)
    const reverseMap = {
      Technology: "tech",
      Geopolitics: "geopolitics",
      Sports: "sports",
      Business: "business",
      India: "india",
      Science: "science",
    };

    const slug = reverseMap[categoryName];

    // 4️⃣ fetch trending news (reuse your API logic)
    const sourcesToFetch = SOURCES[slug];

    const results = await Promise.allSettled(sourcesToFetch.map(fetchFeed));

    const articles = mergeAndSort(results).slice(0, 3);

    res.json({
      success: true,
      category: categoryName,
      data: articles,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.post("/api/reading", async (req, res) => {
  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
    const { firebase_uid, article_id, category, title } = body;
    const categoryMap = {
      tech: "Technology",
      geopolitics: "Geopolitics",
      sports: "Sports",
      business: "Business",
      india: "India",
      science: "Science",
    };

    const categoryName = categoryMap[category] || category;

    // 🔥 debug (check this in console)
    console.log("READING:", firebase_uid, categoryName);

    // 1️⃣ history
    await sql`
      INSERT INTO reading_history (firebase_uid, article_id, category, title)
      VALUES (${firebase_uid}, ${article_id}, ${categoryName}, ${title})
    `;

    // 2️⃣ preferences
    const result = await sql`
      SELECT id FROM categories WHERE name = ${categoryName}
    `;

    if (result.length > 0) {
      const categoryId = result[0].id;

      await sql`
        INSERT INTO user_preferences (firebase_uid, category_id, weight)
        VALUES (${firebase_uid}, ${categoryId}, 1.0)
        ON CONFLICT (firebase_uid, category_id)
        DO UPDATE SET weight = user_preferences.weight + 1.0
      `;
    }

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/preferences/:firebase_uid", async (req, res) => {
  const { firebase_uid } = req.params;
  try {
    const prefs = await sql`
      SELECT c.name, up.weight
      FROM user_preferences up
      JOIN categories c ON c.id = up.category_id
      WHERE up.firebase_uid = ${firebase_uid}
      ORDER BY up.weight DESC
      LIMIT 5
    `;
    res.json(prefs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ==========================================
// CATEGORIES ROUTE
// ==========================================

app.get("/api/categories", async (req, res) => {
  try {
    const categories = await sql`
      SELECT id, name
      FROM categories
      ORDER BY name ASC
    `;

    res.json({
      success: true,
      total: categories.length,
      data: categories,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

app.post("/api/bookmarks", async (req, res) => {
  const { firebase_uid, article_id } = req.body;
  try {
    await sql`
      INSERT INTO bookmarks (firebase_uid, article_id)
      VALUES (${firebase_uid}, ${article_id})
      ON CONFLICT DO NOTHING
    `;
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete("/api/bookmarks", async (req, res) => {
  const { firebase_uid, article_id } = req.body;
  try {
    await sql`
      DELETE FROM bookmarks WHERE firebase_uid = ${firebase_uid} AND article_id = ${article_id}
    `;
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/bookmarks/:firebase_uid", async (req, res) => {
  const { firebase_uid } = req.params;
  try {
    const bookmarks = await sql`
      SELECT * FROM bookmarks WHERE firebase_uid = ${firebase_uid}
      ORDER BY bookmarked_at DESC
    `;
    res.json(bookmarks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ==========================================
// NEWS ROUTES
// ==========================================

// All news — used for Explore page
// GET /api/news/all?limit=40&category=tech
app.get("/api/news/all", async (req, res) => {
  try {
    const limit = Math.min(parseInt(req.query.limit) || 40, 80);
    const category = req.query.category;
    const sourcesToFetch = category
      ? SOURCES[category]
      : Object.values(SOURCES).flat();
    if (category && !SOURCES[category]) {
      return res.status(400).json({
        success: false,
        message: `Unknown category "${category}". Valid: ${Object.keys(SOURCES).join(", ")}`,
      });
    }
    const results = await Promise.allSettled(sourcesToFetch.map(fetchFeed));
    const articles = mergeAndSort(results).slice(0, limit);
    res.json({
      success: true,
      total: articles.length,
      categories: Object.keys(SOURCES),
      data: articles,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Trending — used for Home page hero
// GET /api/news/trending?limit=12
app.get("/api/news/trending", async (req, res) => {
  try {
    const limit = Math.min(parseInt(req.query.limit) || 12, 24);
    const trendingSources = [
      ...SOURCES.india,
      ...SOURCES.business,
      ...SOURCES.tech.slice(0, 1),
      ...SOURCES.geopolitics.slice(0, 1),
    ];
    const results = await Promise.allSettled(trendingSources.map(fetchFeed));
    let allArticles = mergeAndSort(results);
    const seen = new Set();
    const deduped = allArticles.filter((a) => {
      const key = a.title.toLowerCase().slice(0, 50);
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
    const trending = deduped
      .slice(0, limit)
      .map((item, i) => ({ rank: i + 1, ...item }));
    res.json({ success: true, total: trending.length, data: trending });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// By category
app.get("/api/news/tech", async (req, res) => {
  try {
    const results = await Promise.allSettled(SOURCES.tech.map(fetchFeed));
    res.json({
      success: true,
      category: "Technology",
      data: mergeAndSort(results),
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

app.get("/api/news/geopolitics", async (req, res) => {
  try {
    const results = await Promise.allSettled(
      SOURCES.geopolitics.map(fetchFeed),
    );
    res.json({
      success: true,
      category: "Geopolitics",
      data: mergeAndSort(results),
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

app.get("/api/news/sports", async (req, res) => {
  try {
    const results = await Promise.allSettled(SOURCES.sports.map(fetchFeed));
    res.json({
      success: true,
      category: "Sports",
      data: mergeAndSort(results),
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

app.get("/api/news/business", async (req, res) => {
  try {
    const results = await Promise.allSettled(SOURCES.business.map(fetchFeed));
    res.json({
      success: true,
      category: "Business",
      data: mergeAndSort(results),
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

app.get("/api/news/science", async (req, res) => {
  try {
    const results = await Promise.allSettled(SOURCES.science.map(fetchFeed));
    res.json({
      success: true,
      category: "Science",
      data: mergeAndSort(results),
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

app.get("/api/news/india", async (req, res) => {
  try {
    const results = await Promise.allSettled(SOURCES.india.map(fetchFeed));
    res.json({ success: true, category: "India", data: mergeAndSort(results) });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// By region
app.get("/api/news/region/:country", async (req, res) => {
  const country = req.params.country.toLowerCase();
  const region = REGIONS[country];
  if (!region) {
    return res.status(400).json({
      success: false,
      message: `Unknown region "${country}". Valid: ${Object.keys(REGIONS).join(", ")}`,
    });
  }
  try {
    const results = await Promise.allSettled(region.feeds.map(fetchFeed));
    const merged = mergeAndSort(results);
    const articles = filterToRegion(merged, region);
    res.json({
      success: true,
      region: country,
      name: region.name,
      flag: region.flag,
      color: region.color,
      total: articles.length,
      data: articles,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

app.get("/api/news/regions", (req, res) => {
  res.json({
    success: true,
    regions: Object.entries(REGIONS).map(([key, r]) => ({
      id: key,
      name: r.name,
      flag: r.flag,
      color: r.color,
    })),
  });
});
const videoRoutes = require("./routes/videoRoutes");
app.use("/api/videos", videoRoutes); // 🔥 FIX
app.post("/api/ask-news", askNews);
app.get("/health", (req, res) => {
  res.json({ status: "Snappy backend running 🚀" });
});

app.listen(PORT, () => {
  console.log(`✓ Snappy backend running on http://localhost:${PORT}`);
  console.log(`  /api/news/all      → All news (Explore page)`);
  console.log(`  /api/news/trending → Trending stories`);
  console.log(`  /api/news/regions  → All regions`);
});
