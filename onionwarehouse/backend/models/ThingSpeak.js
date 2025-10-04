const mongoose = require("mongoose");

const thingSpeakSchema = new mongoose.Schema({
  sensorId: { type: String, required: true },
  temperature: String,
  humidity: String,
  ldrValue: String,
  createdAt: Date,
});

module.exports =
  mongoose.models.ThingSpeak || mongoose.model("ThingSpeak", thingSpeakSchema);
