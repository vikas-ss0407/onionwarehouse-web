import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getBoxes } from "../api/boxes";
import { getShops } from "../api/shops";
import { createBill } from "../api/bills";
import BillingForm from "../components/BillingForm";

export default function Billing() {
  const [boxes, setBoxes] = useState([]);
  const [shops, setShops] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBoxes();
    fetchShops();
  }, []);

  const fetchBoxes = async () => {
    const data = await getBoxes();
    setBoxes(data);
  };

  const fetchShops = async () => {
    const data = await getShops();
    setShops(data);
  };

  const handleAddBill = async (billData) => {
    const response = await createBill(billData);
    if (response) {
      const { bill, user } = response;
      navigate("/print-bill", { state: { bill, user } });
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 border-b pb-2">Generate Bill</h2>

      {/* Form Card */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h3 className="text-xl font-semibold mb-4 text-gray-700">Bill Details</h3>
        <BillingForm boxes={boxes} shops={shops} onAddBill={handleAddBill} />
      </div>

      {/* Preview Section */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4 text-gray-700">Preview</h3>
        {boxes.length === 0 || shops.length === 0 ? (
          <p className="text-gray-500">Select a box and a shop to preview the bill.</p>
        ) : (
          <table className="w-full border-collapse border text-left">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="border p-2">Box Number</th>
                <th className="border p-2">Type</th>
                <th className="border p-2">Quantity (kg)</th>
                <th className="border p-2">Cost per Kg (₹)</th>
                <th className="border p-2">Selling Price (₹)</th>
                <th className="border p-2">Shop</th>
                <th className="border p-2">Total (₹)</th>
              </tr>
            </thead>
            <tbody>
              {/* The BillingForm component will handle preview table dynamically */}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
