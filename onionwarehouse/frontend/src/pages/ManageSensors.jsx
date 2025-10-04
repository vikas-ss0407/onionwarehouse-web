import { useState } from "react";
import { fetchAndSaveLatest, getSensorData } from "../api/thingspeak";

export default function ManageSensors() {
  const [selectedSensor, setSelectedSensor] = useState(null);
  const [sensorData, setSensorData] = useState([]);
  const LDR_THRESHOLD = 2000;

  const handleSensorClick = async () => {
    const sensorId = "sensor1";
    setSelectedSensor(sensorId);

    try {
      // 1. Fetch latest (will store only if ON)
      await fetchAndSaveLatest(sensorId);

      // 2. Fetch all readings from DB
      const data = await getSensorData(sensorId);
      setSensorData(data);
    } catch (err) {
      console.error("Error fetching sensor data:", err);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Manage Sensors</h1>

      {/* Sensor button */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={handleSensorClick}
          className="px-4 py-2 rounded bg-green-600 text-white"
        >
          Sensor 1
        </button>
      </div>

      {/* Sensor Data Table */}
      {selectedSensor && (
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">{selectedSensor} Data</h2>
          <table className="w-full table-auto border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-2 py-1">Time</th>
                <th className="border border-gray-300 px-2 py-1">Temperature (°C)</th>
                <th className="border border-gray-300 px-2 py-1">Humidity (%)</th>
                <th className="border border-gray-300 px-2 py-1">LDR Value</th>
                <th className="border border-gray-300 px-2 py-1">Light/Dark</th>
              </tr>
            </thead>
            <tbody>
              {sensorData.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-2">
                    Loading data...
                  </td>
                </tr>
              ) : (
                sensorData.map((item, index) => (
                  <tr key={index} className="text-center">
                    <td className="border border-gray-300 px-2 py-1">
                      {new Date(item.createdAt).toLocaleString()}
                    </td>
                    <td className="border border-gray-300 px-2 py-1">{item.temperature}</td>
                    <td className="border border-gray-300 px-2 py-1">{item.humidity}</td>
                    <td className="border border-gray-300 px-2 py-1">{item.ldrValue}</td>
                    <td className="border border-gray-300 px-2 py-1">
                      {item.ldrValue < LDR_THRESHOLD ? "Light" : "Dark"}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
