const axios = require("axios");

const CHANNEL_ID = process.env.THINGSPEAK_CHANNEL_ID;
const READ_API_KEY = process.env.THINGSPEAK_READ_API_KEY;

exports.getLatestData = async (req, res) => {
  try {
    const url = `https://api.thingspeak.com/channels/${CHANNEL_ID}/feeds.json?api_key=${READ_API_KEY}&results=1`;
    const response = await axios.get(url);

    const feed = response.data.feeds[0];
    if (!feed) {
      return res.status(404).json({ message: "No data available" });
    }

    // Correct field mapping for ONION WAREHOUSE MONITORING channel
    res.json({
      temperature: feed.field1,  // TEMPERATURE
      humidity: feed.field2,     // HUMIDITY
      ldrValue: feed.field3,     // LDR
      createdAt: feed.created_at,
    });
  } catch (err) {
    console.error("ThingSpeak fetch error:", err.message);
    res.status(500).json({ message: "Error fetching data" });
  }
};
