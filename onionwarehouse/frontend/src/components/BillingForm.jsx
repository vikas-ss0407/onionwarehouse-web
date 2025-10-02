import { useState, useEffect } from "react";

export default function BillingForm({ boxes, shops, onAddBill }) {
  const [selectedBox, setSelectedBox] = useState("");
  const [selectedShop, setSelectedShop] = useState("");
  const [quantity, setQuantity] = useState("");
  const [sellingPrice, setSellingPrice] = useState("");
  const [costPerKg, setCostPerKg] = useState("");

  useEffect(() => {
    if (selectedBox) {
      const box = boxes.find((b) => b._id === selectedBox);
      setCostPerKg(box?.pricePerKg || "");
      setQuantity(""); // Reset quantity for new box selection
    } else {
      setCostPerKg("");
      setQuantity("");
    }
  }, [selectedBox, boxes]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedBox || !selectedShop || !quantity || !sellingPrice) {
      alert("Please fill all fields.");
      return;
    }

    onAddBill({
      boxId: selectedBox,
      shopId: selectedShop,
      quantitySold: Number(quantity),
      sellingPrice: Number(sellingPrice),
    });

    setSelectedBox("");
    setSelectedShop("");
    setQuantity("");
    setSellingPrice("");
    setCostPerKg("");
  };

  const selectedBoxObj = boxes.find((b) => b._id === selectedBox);
  const selectedShopObj = shops.find((s) => s._id === selectedShop);

  return (
    <>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-700 font-medium mb-1">Select Box</label>
          <select
            value={selectedBox}
            onChange={(e) => setSelectedBox(e.target.value)}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">-- Select Box --</option>
            {boxes.map((b) => (
              <option key={b._id} value={b._id}>
                {b.boxNumber} ({b.type}) - {b.quantity}kg available
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Select Shop</label>
          <select
            value={selectedShop}
            onChange={(e) => setSelectedShop(e.target.value)}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">-- Select Shop --</option>
            {shops.map((s) => (
              <option key={s._id} value={s._id}>
                {s.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Quantity (kg)</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Selling Price per kg (₹)</label>
          <input
            type="number"
            value={sellingPrice}
            onChange={(e) => setSellingPrice(e.target.value)}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {selectedBoxObj && (
          <div className="md:col-span-2 bg-gray-50 p-4 rounded border">
            <p><strong>Type:</strong> {selectedBoxObj.type}</p>
            <p><strong>Available Quantity:</strong> {selectedBoxObj.quantity} kg</p>
            <p><strong>Cost per Kg:</strong> ₹{selectedBoxObj.pricePerKg}</p>
          </div>
        )}

        <div className="md:col-span-2">
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
          >
            Generate Bill
          </button>
        </div>
      </form>

      {selectedBox && selectedShop && quantity && sellingPrice && (
        <div className="mt-6 overflow-x-auto">
          <table className="w-full border-collapse border shadow-md">
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
              <tr className="text-gray-700">
                <td className="border p-2">{selectedBoxObj?.boxNumber}</td>
                <td className="border p-2">{selectedBoxObj?.type}</td>
                <td className="border p-2">{quantity}</td>
                <td className="border p-2">{costPerKg}</td>
                <td className="border p-2">{sellingPrice}</td>
                <td className="border p-2">{selectedShopObj?.name}</td>
                <td className="border p-2">{quantity * sellingPrice}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
