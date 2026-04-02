const express = require("express");
const { getImagesController } = require("../controllers/imageController");

const router = express.Router();

router.post("/", getImagesController);

module.exports = router;