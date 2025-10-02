import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getLatestReadings } from "../api/thingspeak";
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

  const LDR_THRESHOLD = 2000;

  useEffect(() => {
    const fetchData = async () => {
      const latest = await getLatestReadings();
      if (latest) {
        const formatted = {
          createdAt: new Date(latest.createdAt).getTime(),
          temperature: Number(latest.temperature),
          humidity: Number(latest.humidity),
          ldrValue: Number(latest.ldrValue),
        };

        setData(formatted);

        setHistory((prev) => {
          const now = Date.now();
          const cutoff = now - 5 * 60 * 1000; // last 5 minutes
          const newHistory = [...prev, formatted].filter(
            (item) => item.createdAt >= cutoff
          );
          return newHistory;
        });
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 20000); // fetch every 20s
    return () => clearInterval(interval);
  }, []);

  const graphs = [
    { key: "temperature", label: "Temperature (°C)", color: "#8884d8" },
    { key: "humidity", label: "Humidity (%)", color: "#82ca9d" },
    { key: "ldrValue", label: "LDR Value", color: "#ff0000" },
  ];

  // Custom tick formatter for XAxis with AM/PM and seconds
  const formatXAxisTick = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
  };

  // Custom tooltip formatter
  const formatTooltipLabel = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
  };

  return (
    <div className="p-6">
      {/* Buttons */}
      <div className="flex flex-wrap gap-4 mb-6">
        <button
          onClick={() => navigate("/manage-shops")}
          className="bg-indigo-600 text-white px-4 py-2 rounded"
        >
          Manage Shops
        </button>
        <button
          onClick={() => navigate("/manage-boxes")}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Manage Boxes
        </button>
        <button
          onClick={() => navigate("/billing")}
          className="bg-purple-600 text-white px-4 py-2 rounded"
        >
          Billing
        </button>
      </div>

      {/* Live readings */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <h2 className="text-2xl font-semibold mb-4">Live Sensor Readings</h2>
        {data ? (
          <div className="grid grid-cols-2 gap-4">
            <p><strong>Temperature:</strong> {data.temperature} °C</p>
            <p><strong>Humidity:</strong> {data.humidity} %</p>
            <p>
              <strong>Light Status:</strong>{" "}
              {data.ldrValue < LDR_THRESHOLD ? "Light" : "Dark"} <br />
              <small className="text-gray-500">(Raw: {data.ldrValue})</small>
            </p>
            <p className="col-span-2 text-gray-500 text-sm">
              Last updated: {new Date(data.createdAt).toLocaleString()}
            </p>
          </div>
        ) : (
          <p>Loading sensor data...</p>
        )}
      </div>

      {/* Graphs - Removed the Past 5 Minutes Readings section */}
      <div className="space-y-6">
        {graphs.map(({ key, label, color }) => (
          <div key={key} className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-semibold mb-2">{label}</h2>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={history}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="createdAt"
                  type="number"
                  scale="time"
                  domain={["dataMin", "dataMax"]}
                  tickFormatter={formatXAxisTick}
                  interval="preserveStartEnd"
                  minTickGap={30}
                  angle={-45}
                  textAnchor="end"
                  height={60}
                  tick={{ fontSize: 12 }}
                />
                <YAxis domain={["auto", "auto"]} />
                <Tooltip
                  labelFormatter={formatTooltipLabel}
                />
                <Line
                  type="monotone"
                  dataKey={key}
                  stroke={color}
                  dot={false}
                  isAnimationActive={false}
                />
                <Brush
                  dataKey="createdAt"
                  height={30}
                  stroke={color}
                  travellerWidth={10}
                  tickFormatter={formatXAxisTick}
                  startIndex={Math.max(history.length - 15, 0)}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        ))}
      </div>
    </div>
  );
}