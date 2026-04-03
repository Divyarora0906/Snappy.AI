const express = require("express");
const { getVideoController } = require("../controllers/videoController");
 
const router = express.Router();
 
/**
 * POST /api/videos
 * Generate portrait slideshow video from keywords
 * 
 * Body:
 * {
 *   "keywords": ["portrait", "person", "lifestyle"]  // optional, defaults to examples
 * }
 * 
 * Response:
 * {
 *   "success": true,
 *   "videoUrl": "https://res.cloudinary.com/...",
 *   "publicId": "portrait_slideshow_1234567890",
 *   "duration": 24,
 *   "width": 1080,
 *   "height": 1920
 * }
 */
router.post("/", getVideoController);
 
module.exports = router;
 