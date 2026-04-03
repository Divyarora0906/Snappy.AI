const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

/**
 * Fetch max 15 high-quality portrait images TOTAL using Openverse
 * Function name preserved as requested.
 * @param {string[]} keywords
 * @returns {Promise<string[]>}
 */
const getImagesFromPexels = async (keywords = []) => {
  try {
    if (!Array.isArray(keywords) || keywords.length === 0) {
      console.log("⚠️ No keywords provided, using default");
      keywords = ["global news"];
    }

    console.log("🔎 Fetching real-world images from Openverse for:", keywords);

    // We process the top 5 keywords to get diverse results
    const requests = keywords.slice(0, 5).map((keyword) =>
      fetch(
        `https://api.openverse.engineering/v1/images/?q=${encodeURIComponent(
          keyword
        )}&page_size=10&aspect_ratio=tall&extension=jpg`,
        {
          headers: {
            // Openverse appreciates a User-Agent to identify the app
            "User-Agent": "SnappyAI/1.0 (Contact: your-email@example.com)",
          },
        }
      ).then((res) => {
        if (!res.ok) {
          throw new Error(`Openverse API error: ${res.status}`);
        }
        return res.json();
      })
    );

    const responses = await Promise.all(requests);

    // ✅ Combine results from all keyword searches
    let allImages = responses.flatMap((data) => data.results || []);

    // ✅ Filter for quality and real URLs
    // Openverse provides 'url' (direct) and 'thumbnail'
    const finalImages = allImages
      .filter((img) => img.url && img.url.startsWith("http"))
      .map((img) => img.url)
      .filter((url, index, self) => self.indexOf(url) === index) // Remove duplicates
      .slice(0, 15); // ✅ 🔥 LIMIT TO 15 TOTAL ONLY

    console.log(`📸 Final images count: ${finalImages.length}`);

    // ⚠️ Fallback if empty (Searching for a generic news term)
    if (finalImages.length === 0) {
      console.log("⚠️ No results found, using broad fallback...");
      const fallbackRes = await fetch(
        `https://api.openverse.engineering/v1/images/?q=news&page_size=5&aspect_ratio=tall`
      );
      const fallbackData = await fallbackRes.json();
      return (fallbackData.results || []).map((img) => img.url);
    }

    return finalImages;
  } catch (error) {
    console.error("❌ Error fetching images:", error.message);
    return [];
  }
};

module.exports = { getImagesFromPexels };