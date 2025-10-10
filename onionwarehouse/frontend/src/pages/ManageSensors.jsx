import { useState } from "react";
import { fetchAndSaveLatest, getSensorData } from "../api/thingspeak";

export default function ManageSensors() {
  const [selectedSensor, setSelectedSensor] = useState(null);
  const [sensorData, setSensorData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const LDR_THRESHOLD = 2000;

  const handleSensorClick = async () => {
    const sensorId = "sensor1";
    setSelectedSensor(sensorId);
    setIsLoading(true);

    try {
      // 🚀 OPTIMIZATION: Use Promise.all to fetch and save data concurrently.
      // The historical data fetch (getSensorData) will start immediately, 
      // without waiting for the latest reading to be saved (fetchAndSaveLatest).
      const [_, historyData] = await Promise.all([
        fetchAndSaveLatest(sensorId),
        getSensorData(sensorId),
      ]);

      // 2. Data transformation: Convert string fields to numbers
      const formattedData = historyData.map(item => ({
        ...item,
        temperature: Number(item.temperature), 
        humidity: Number(item.humidity),       
        ldrValue: Number(item.ldrValue),         
      })).reverse(); // Reverse to show latest readings at the top

      setSensorData(formattedData);

    } catch (err) {
      console.error("Error fetching sensor data:", err);
      // Set error message for display
      setSensorData([{ error: "Failed to load data. Check console for details." }]); 
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  // Utility component to display a styled badge for Light/Dark status
  const LightStatusBadge = ({ ldrValue }) => {
    if (typeof ldrValue !== 'number' || isNaN(ldrValue)) return <span className="text-gray-500">---</span>;

    const isLight = ldrValue < LDR_THRESHOLD;
    const text = isLight ? "LIGHT" : "DARK";
    const color = isLight ? "bg-yellow-100 text-yellow-700" : "bg-gray-200 text-gray-700";

    return (
      <span className={`px-3 py-1 text-xs font-semibold rounded-full ${color} whitespace-nowrap`}>
        {text}
      </span>
    );
  };

  // Determine content for the table body based on state
  const tableBodyContent = () => {
    if (isLoading) {
      return (
        <tr className="bg-gray-50">
          <td colSpan={5} className="text-center py-4 text-indigo-600">
            <div className="flex justify-center items-center">
              <svg className="animate-spin h-5 w-5 mr-3 text-indigo-600" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Fetching data from database...
            </div>
          </td>
        </tr>
      );
    }

    if (sensorData.length > 0 && sensorData[0].error) {
      return (
        <tr className="bg-red-50">
          <td colSpan={5} className="text-center py-4 text-red-700 font-medium">
            Error: {sensorData[0].error}
          </td>
        </tr>
      );
    }
    
    if (sensorData.length === 0 && selectedSensor) {
      return (
        <tr className="bg-gray-50">
          <td colSpan={5} className="text-center py-4 text-gray-500">
            No readings found for {selectedSensor}.
          </td>
        </tr>
      );
    }
    
    // Actual data rows
    return sensorData.map((item, index) => (
      <tr key={index} className={index % 2 === 0 ? "bg-white hover:bg-indigo-50" : "bg-gray-50 hover:bg-indigo-50"}>
        <td className="border-r border-gray-200 px-4 py-2 text-sm text-gray-600">
          {new Date(item.createdAt).toLocaleString()}
        </td>
        <td className="border-r border-gray-200 px-4 py-2 text-center font-medium text-gray-800">
          {/* Safety check for rendering */}
          {typeof item.temperature === 'number' && !isNaN(item.temperature) ? item.temperature.toFixed(1) : '---'}
        </td>
        <td className="border-r border-gray-200 px-4 py-2 text-center font-medium text-gray-800">
          {/* Safety check for rendering */}
          {typeof item.humidity === 'number' && !isNaN(item.humidity) ? item.humidity.toFixed(0) : '---'}
        </td>
        <td className="border-r border-gray-200 px-4 py-2 text-center text-sm text-gray-600">
          {item.ldrValue}
        </td>
        <td className="px-4 py-2 text-center">
          <LightStatusBadge ldrValue={item.ldrValue} />
        </td>
      </tr>
    ));
  };


  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10">
      
      {/* UPDATED HEADER with sticky positioning */}
      <div className="text-center mb-8 sticky top-0 z-50 bg-gray-50/90 backdrop-blur-sm py-4 border-b-4 border-indigo-100/70">
        <h1 className="text-4xl font-extrabold text-gray-800">Sensor Management Console</h1>
        <p className="text-lg text-gray-500 mt-2">View real-time and historical data for connected sensors.</p>
      </div>

      {/* SENSOR BUTTONS */}
      <div className="flex justify-center gap-6 mb-12">
        <button
          onClick={handleSensorClick}
          className={`
            px-8 py-3 rounded-xl text-lg font-semibold shadow-lg transition duration-300 transform 
            ${selectedSensor === 'sensor1' 
              ? 'bg-indigo-600 text-white shadow-indigo-400/70 scale-105 ring-4 ring-indigo-300'
              : 'bg-indigo-400 text-white hover:bg-indigo-500 shadow-md'
            }
          `}
          disabled={isLoading}
        >
          {isLoading && selectedSensor === 'sensor1' ? (
              <span className="flex items-center">
                  <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Loading...
              </span>
          ) : (
              selectedSensor === 'sensor1' ? 'Sensor 1 (Active)' : 'Load Sensor 1 Data'
          )}
        </button>
        {/* Placeholder for more sensors */}
        <button
          disabled
          className="px-8 py-3 rounded-xl text-lg font-semibold shadow-md bg-gray-300 text-gray-600 cursor-not-allowed"
        >
          Sensor 2 (Coming Soon)
        </button>
      </div>

      {/* SENSOR DATA TABLE */}
      {selectedSensor && (
        <div className="bg-white p-6 rounded-xl shadow-2xl border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-700 mb-6 border-b pb-2">
            Historical Readings for {selectedSensor}
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-indigo-50 text-indigo-800 uppercase text-sm leading-normal shadow-sm">
                  <th className="px-4 py-3 text-left font-bold border-r border-indigo-200 rounded-tl-xl">Timestamp</th>
                  <th className="px-4 py-3 text-center font-bold border-r border-indigo-200">Temp. (°C)</th>
                  <th className="px-4 py-3 text-center font-bold border-r border-indigo-200">Humidity (%)</th>
                  <th className="px-4 py-3 text-center font-bold border-r border-indigo-200">LDR Value (Raw)</th>
                  <th className="px-4 py-3 text-center font-bold rounded-tr-xl">Light Status</th>
                </tr>
              </thead>
              <tbody className="text-gray-700 text-sm font-light">
                {tableBodyContent()}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}