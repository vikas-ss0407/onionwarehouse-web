import API_BASE_URL from "./config";

export const getLatestReadings = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/thingspeak/latest`, {
      credentials: "include",
    });
    return res.ok ? await res.json() : null;
  } catch (err) {
    console.error("Failed to fetch ThingSpeak data:", err);
    return null;
  }
};
