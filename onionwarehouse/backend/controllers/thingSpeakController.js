const axios = require("axios");
const ThingSpeak = require("../models/ThingSpeak");

const CHANNEL_ID = process.env.THINGSPEAK_CHANNEL_ID;
const READ_API_KEY = process.env.THINGSPEAK_READ_API_KEY;

// Fetch latest from ThingSpeak AND save to MongoDB only if sensor is "on"
exports.fetchAndSaveLatest = async (req, res) => {
  const sensorId = req.params.sensorId || "sensor1";
  console.log(`\n[INFO] Fetching latest data for sensor: ${sensorId}`);

  try {
    const url = `https://api.thingspeak.com/channels/${CHANNEL_ID}/feeds.json?api_key=${READ_API_KEY}&results=1`;
    console.log(`[INFO] ThingSpeak URL: ${url}`);

    const response = await axios.get(url);
    const feed = response.data.feeds[0];
    console.log("[INFO] ThingSpeak feed received:", feed);

    if (!feed) {
      console.log("[WARN] No data returned from ThingSpeak.");
      return res.status(200).json({ isSensorOn: false, message: "No data available" });
    }

    // Convert readings to numbers
    const temperature = Number(feed.field1);
    const humidity = Number(feed.field2);
    const ldrValue = Number(feed.field3);
    const createdAt = new Date(feed.created_at);

    console.log(`[INFO] Parsed readings → Temperature: ${temperature}, Humidity: ${humidity}, LDR: ${ldrValue}, Timestamp: ${createdAt}`);

    // Sensor ON check: reading within last 5 minutes
    const now = new Date();
    const DIFF_MINUTES = 5;
    const diffMs = now - createdAt;
    const isSensorOn = diffMs <= DIFF_MINUTES * 60 * 1000;

    console.log(`[INFO] Sensor status check → now: ${now}, createdAt: ${createdAt}, diffMs: ${diffMs}, isSensorOn: ${isSensorOn}`);

    if (!isSensorOn) {
      console.log("[WARN] Sensor is OFF — not saving data.");
      return res.status(200).json({ isSensorOn: false, message: "Sensor is OFF — not saving data" });
    }

    // Check for duplicates by timestamp
    const existing = await ThingSpeak.findOne({ sensorId, createdAt });
    if (existing) {
      console.log("[WARN] Duplicate reading found — skipping save:", existing);
      return res.status(200).json({ isSensorOn: true, message: "Duplicate — not saved" });
    }

    // Save new data
    const newData = { sensorId, temperature, humidity, ldrValue, createdAt };
    console.log("[INFO] Saving new data to MongoDB:", newData);

    const saved = await ThingSpeak.create(newData);
    console.log("[SUCCESS] Data saved successfully:", saved);

    res.json({ isSensorOn: true, data: saved });
  } catch (err) {
    console.error("[ERROR] Error fetching ThingSpeak data:", err);
    res.status(500).json({ isSensorOn: false, message: "Error fetching data" });
  }
};

// Get all readings from MongoDB for a sensor
exports.getSensorData = async (req, res) => {
  const sensorId = req.params.sensorId || "sensor1";
  console.log(`\n[INFO] Fetching all readings from DB for sensor: ${sensorId}`);

  try {
    const data = await ThingSpeak.find({ sensorId }).sort({ createdAt: 1 });
    console.log(`[INFO] Total readings fetched from DB: ${data.length}`);
    res.json(data);
  } catch (err) {
    console.error("[ERROR] Error fetching sensor data from DB:", err);
    res.status(500).json({ message: "Error fetching sensor data" });
  }
};
