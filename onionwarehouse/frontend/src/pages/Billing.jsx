import { useState, useEffect } from "react";
import { getBoxes } from "../api/boxes";
import { getShops } from "../api/shops";
import { createBill } from "../api/bills";
import { useNavigate } from "react-router-dom";

export default function Billing() {
  const [boxes, setBoxes] = useState([]);
  const [shops, setShops] = useState([]);
  const [bills, setBills] = useState([]);
  const [selectedBox, setSelectedBox] = useState("");
  const [selectedShop, setSelectedShop] = useState("");
  const [quantity, setQuantity] = useState("");
  const [sellingPrice, setSellingPrice] = useState("");

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedBox || !selectedShop || !quantity || !sellingPrice) {
      alert("Please fill all fields.");
      return;
    }

    const billData = {
      boxId: selectedBox,
      shopId: selectedShop,
      quantitySold: Number(quantity),
      sellingPrice: Number(sellingPrice),
    };

    const response = await createBill(billData);

    if (response) {
      const { bill, user } = response;

      // Generate a unique key fallback if _id is missing
      const key = bill._id || `${bill.boxNumber}-${Date.now()}`;

      setBills([...bills, { ...bill, _key: key, user }]); // Add bill with user info

      navigate("/print-bill", { state: { bill, user } });

      // Reset form
      setSelectedBox("");
      setSelectedShop("");
      setQuantity("");
      setSellingPrice("");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Generate Bill</h2>

      <form onSubmit={handleSubmit} className="space-y-3 mb-6">
        <select
          value={selectedBox}
          onChange={(e) => setSelectedBox(e.target.value)}
          className="border p-2 w-full"
        >
          <option value="">Select Box</option>
          {boxes.map((box) => (
            <option key={box._id} value={box._id}>
              {box.boxNumber} ({box.type}) - {box.quantity}kg
            </option>
          ))}
        </select>

        <select
          value={selectedShop}
          onChange={(e) => setSelectedShop(e.target.value)}
          className="border p-2 w-full"
        >
          <option value="">Select Shop</option>
          {shops.map((shop) => (
            <option key={shop._id} value={shop._id}>
              {shop.name}
            </option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Quantity Sold"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          className="border p-2 w-full"
        />

        <input
          type="number"
          placeholder="Selling Price per kg"
          value={sellingPrice}
          onChange={(e) => setSellingPrice(e.target.value)}
          className="border p-2 w-full"
        />

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Generate Bill
        </button>
      </form>

      <h3 className="text-xl font-bold mb-2">Generated Bills</h3>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-2 py-1">Box Number</th>
            <th className="border px-2 py-1">Type</th>
            <th className="border px-2 py-1">Quantity</th>
            <th className="border px-2 py-1">Selling Price</th>
            <th className="border px-2 py-1">Shop</th>
            <th className="border px-2 py-1">Total</th>
          </tr>
        </thead>
        <tbody>
          {bills.map((bill) => (
            <tr key={bill._key}>
              <td className="border px-2 py-1">{bill.boxNumber}</td>
              <td className="border px-2 py-1">{bill.type}</td>
              <td className="border px-2 py-1">{bill.quantity}</td>
              <td className="border px-2 py-1">₹{bill.sellingPrice}</td>
              <td className="border px-2 py-1">{bill.shopName}</td>
              <td className="border px-2 py-1">₹{bill.total}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
