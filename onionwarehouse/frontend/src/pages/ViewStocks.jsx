import { useEffect, useState } from "react";
import { getBoxes } from "../api/boxes";

export default function ViewStocks() {
  const [boxes, setBoxes] = useState([]);

  useEffect(() => {
    const fetchBoxes = async () => {
      const data = await getBoxes();
      setBoxes(Array.isArray(data) ? data : []);
    };
    fetchBoxes();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">View Stocks</h2>
      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Box Number</th>
            <th className="border p-2">Type</th>
            <th className="border p-2">Quantity (kg)</th>
            <th className="border p-2">Cost/kg (₹)</th>
          </tr>
        </thead>
        <tbody>
          {boxes.map((box) => (
            <tr key={box._id}>
              <td className="border p-2">{box.boxNumber}</td>
              <td className="border p-2">{box.type}</td>
              <td className="border p-2">{box.quantity}</td>
              <td className="border p-2">{box.pricePerKg}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
