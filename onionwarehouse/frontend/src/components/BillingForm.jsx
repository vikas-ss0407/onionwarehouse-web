import { useState } from "react";

export default function BillingForm({ boxes, shops, onAddBill }) {
  const [selectedBox, setSelectedBox] = useState("");
  const [sellingPrice, setSellingPrice] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedBox || !sellingPrice) {
      alert("Select box and enter selling price.");
      return;
    }

    onAddBill(Number(selectedBox), Number(sellingPrice));
    setSelectedBox("");
    setSellingPrice("");
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex gap-4 items-center mb-4">

        <select
          value={selectedBox}
          onChange={(e) => setSelectedBox(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="">-- Select Box --</option>
          {boxes.map((box) => (
            <option key={box.id} value={box.id}>
              {box.boxNumber} ({box.type}) - {shops.find(s => s.id === box.shopId)?.name || "No Shop"} - Qty: {box.quantity}kg - Cost: ₹{box.pricePerKg}/kg
            </option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Selling Price per kg"
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
            <th className="border p-2">Shop</th>
            <th className="border p-2">Quantity</th>
            <th className="border p-2">Cost Price</th>
            <th className="border p-2">Selling Price</th>
            <th className="border p-2">Total</th>
          </tr>
        </thead>
        <tbody>
          {boxes.map((box) => (
            <tr key={box.id}>
              <td className="border p-2">{box.boxNumber}</td>
              <td className="border p-2">{box.type}</td>
              <td className="border p-2">{shops.find(s => s.id === box.shopId)?.name || "No Shop"}</td>
              <td className="border p-2">{box.quantity}</td>
              <td className="border p-2">{box.pricePerKg}</td>
              <td className="border p-2">{sellingPrice}</td>
              <td className="border p-2">{box.quantity * sellingPrice}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
