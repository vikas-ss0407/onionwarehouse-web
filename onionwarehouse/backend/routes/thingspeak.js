const express = require("express");
const { getLatestData } = require("../controllers/thingSpeakController");

const router = express.Router();

router.get("/latest", getLatestData);

module.exports = router;
