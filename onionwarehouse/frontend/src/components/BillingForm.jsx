import { useState } from "react";

export default function BillingForm({ boxes, shops, onAddBill }) {
  const [selectedBox, setSelectedBox] = useState("");
  const [selectedShop, setSelectedShop] = useState("");
  const [quantity, setQuantity] = useState("");
  const [sellingPrice, setSellingPrice] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedBox || !selectedShop || !quantity || !sellingPrice) {
      alert("Please fill all fields.");
      return;
    }

    onAddBill({
      boxId: selectedBox,
      shopId: selectedShop,
      quantity: Number(quantity),
      sellingPrice: Number(sellingPrice),
    });

    setSelectedBox("");
    setSelectedShop("");
    setQuantity("");
    setSellingPrice("");
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-wrap gap-4 items-center mb-4">
        <select
          value={selectedBox}
          onChange={(e) => setSelectedBox(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="">-- Select Box --</option>
          {boxes.map((box) => (
            <option key={box.id} value={box.id}>
              {box.boxNumber} ({box.type}) - Qty: {box.quantity}kg - Cost: ₹{box.pricePerKg}/kg
            </option>
          ))}
        </select>

        <select
          value={selectedShop}
          onChange={(e) => setSelectedShop(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="">-- Select Shop --</option>
          {shops.map((shop) => (
            <option key={shop._id} value={shop._id}>
              {shop.name}
            </option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          className="p-2 border rounded"
        />

        <input
          type="number"
          placeholder="Selling Price"
          value={sellingPrice}
          onChange={(e) => setSellingPrice(e.target.value)}
          className="p-2 border rounded"
        />

        <button
          type="submit"
          className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
        >
          Generate Bill
        </button>
      </form>

      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-yellow-100">
            <th className="border p-2">Box Number</th>
            <th className="border p-2">Type</th>
            <th className="border p-2">Quantity (kg)</th>
            <th className="border p-2">Cost Price (₹)</th>
            <th className="border p-2">Selling Price (₹)</th>
            <th className="border p-2">Shop</th>
            <th className="border p-2">Total (₹)</th>
          </tr>
        </thead>
        <tbody>
          {boxes.map((box) => (
            <tr key={box.id}>
              <td className="border p-2">{box.boxNumber}</td>
              <td className="border p-2">{box.type}</td>
              <td className="border p-2">{quantity}</td>
              <td className="border p-2">{box.pricePerKg}</td>
              <td className="border p-2">{sellingPrice}</td>
              <td className="border p-2">
                {shops.find((s) => s._id === selectedShop)?.name || ""}
              </td>
              <td className="border p-2">{quantity * sellingPrice}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
