const { getImagesFromPexels } = require("../service/imageService");

const getImagesController = async (req, res) => {
  try {
    const { keywords } = req.body;

    if (!keywords || !Array.isArray(keywords) || keywords.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Keywords array is required",
      });
    }

    const images = await getImagesFromPexels(keywords);

    res.status(200).json({
      success: true,
      count: images.length,
      images, // ✅ already URLs
    });

  } catch (error) {
    console.error("Controller Error:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to fetch images",
    });
  }
};

module.exports = {getImagesController}