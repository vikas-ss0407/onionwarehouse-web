import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchAndSaveLatest, getSensorData } from "../api/thingspeak";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Brush,
  ResponsiveContainer,
} from "recharts";

export default function Dashboard() {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [history, setHistory] = useState([]);
  const [sensorOn, setSensorOn] = useState(true); // new state for sensor status

  const LDR_THRESHOLD = 2000;
  const SENSOR_ID = "sensor1";
  const MAX_READINGS = 5;

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch latest reading from backend
        const latestData = await fetchAndSaveLatest(SENSOR_ID);

        // Use isSensorOn returned from backend
        setSensorOn(latestData?.isSensorOn ?? false);

        // Fetch all readings from DB
        const sensorData = await getSensorData(SENSOR_ID);

        if (sensorData && sensorData.length > 0) {
          const lastReadings = sensorData.slice(-MAX_READINGS);
          const latest = lastReadings[lastReadings.length - 1];

          const formatted = {
            createdAt: new Date(latest.createdAt).getTime(),
            temperature: Number(latest.temperature),
            humidity: Number(latest.humidity),
            ldrValue: Number(latest.ldrValue),
          };
          setData(formatted);

          const historyData = lastReadings.map((item) => ({
            createdAt: new Date(item.createdAt).getTime(),
            temperature: Number(item.temperature),
            humidity: Number(item.humidity),
            ldrValue: Number(item.ldrValue),
          }));
          setHistory(historyData);
        }
      } catch (err) {
        console.error("Error fetching sensor data:", err);
        setSensorOn(false); // fallback to OFF if fetch fails
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 20000); // every 20s
    return () => clearInterval(interval);
  }, []);

  const graphs = [
    { key: "temperature", label: "Temperature (°C)", color: "#8884d8" },
    { key: "humidity", label: "Humidity (%)", color: "#82ca9d" },
    { key: "ldrValue", label: "LDR Value", color: "#ff0000" },
  ];

  return (
    <div className="p-6">
      {/* Navigation Buttons */}
      <div className="flex flex-wrap gap-4 mb-6">
        <button onClick={() => navigate("/manage-sensors")} className="bg-green-600 text-white px-4 py-2 rounded">Manage Sensors</button>
        <button onClick={() => navigate("/manage-shops")} className="bg-indigo-600 text-white px-4 py-2 rounded">Manage Shops</button>
        <button onClick={() => navigate("/manage-boxes")} className="bg-blue-600 text-white px-4 py-2 rounded">Manage Boxes</button>
        <button onClick={() => navigate("/billing")} className="bg-purple-600 text-white px-4 py-2 rounded">Billing</button>
      </div>

      {/* Live readings */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <h2 className="text-2xl font-semibold mb-4">Live Sensor Readings</h2>
        {data ? (
          <div className="grid grid-cols-2 gap-4">
            <p><strong>Sensor Status:</strong> {sensorOn ? <span className="text-green-600 font-semibold">ON</span> : <span className="text-red-600 font-semibold">OFF</span>}</p>
            <p><strong>Temperature:</strong> {data.temperature < 0 ? "Sensor Error" : `${data.temperature} °C`}</p>
            <p><strong>Humidity:</strong> {data.humidity < 0 ? "Sensor Error" : `${data.humidity} %`}</p>
            <p>
              <strong>Light Status:</strong>{" "}
              {isNaN(data.ldrValue) ? "Sensor Error" : data.ldrValue < LDR_THRESHOLD ? "Light" : "Dark"} <br />
              {!isNaN(data.ldrValue) && <small className="text-gray-500">(Raw: {data.ldrValue})</small>}
            </p>
            <p>
              <strong>Fan Status:</strong>{" "}
              {data.temperature > 30 ? <span className="text-green-600 font-semibold">ON</span> : <span className="text-red-600 font-semibold">OFF</span>}
            </p>
            <p className="col-span-2 text-gray-500 text-sm">
              Last updated: {new Date(data.createdAt).toLocaleString()}
            </p>
          </div>
        ) : (
          <p>Loading sensor data...</p>
        )}
      </div>

      {/* Graphs */}
      <div className="space-y-6">
        {graphs.map(({ key, label, color }) => (
          <div key={key} className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-semibold mb-2">{label}</h2>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={history}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="createdAt"
                  tickFormatter={(time) => new Date(time).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: true })}
                  interval="preserveStart"
                  minTickGap={20}
                  angle={0}
                  height={40}
                  tick={{ fontSize: 12 }}
                />
                <YAxis domain={["auto", "auto"]} />
                <Tooltip labelFormatter={(time) => new Date(time).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: true })} />
                <Line type="monotone" dataKey={key} stroke={color} dot={false} isAnimationActive={false} />
                <Brush
                  dataKey="createdAt"
                  height={30}
                  stroke={color}
                  travellerWidth={10}
                  tickFormatter={(time) => new Date(time).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: true })}
                  startIndex={Math.max(history.length - 5, 0)}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        ))}
      </div>
    </div>
  );
}
