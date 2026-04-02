const express = require("express");
const { askNews, fetchtechNews } = require("../controllers/newsController");
const { fetchTrendingTopics } = require("../service/FetchTrending");

const router = express.Router();

router.post('/ask-news', askNews);
router.get('/trending', fetchTrendingTopics);
router.get('/tech', fetchtechNews)



module.exports = router;
