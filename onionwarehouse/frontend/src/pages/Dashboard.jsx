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
    </div>
  );
}
