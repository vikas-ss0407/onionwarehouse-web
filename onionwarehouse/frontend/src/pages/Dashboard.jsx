import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold mb-6">Dashboard</h1>

      <div className="flex flex-wrap gap-4">
        <button
          onClick={() => navigate("/manage-shops")}
          className="bg-indigo-600 text-white px-4 py-2 rounded"
        >
          Manage Shops
        </button>
        <button
          onClick={() => navigate("/add-box")}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add Box
        </button>
        <button
          onClick={() => navigate("/update-box")}
          className="bg-yellow-600 text-white px-4 py-2 rounded"
        >
          Update Box
        </button>
        <button
          onClick={() => navigate("/billing")}
          className="bg-purple-600 text-white px-4 py-2 rounded"
        >
          Billing
        </button>
        <button
          onClick={() => navigate("/view-stocks")}
          className="bg-gray-600 text-white px-4 py-2 rounded"
        >
          View Stocks
        </button>
      </div>
    </div>
  );
}
