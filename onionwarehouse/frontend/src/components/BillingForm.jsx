import { useState } from "react";

export default function BillingForm({ boxes, onAddBill, shops }) {
  const [selectedBox, setSelectedBox] = useState("");
  const [sellingPrice, setSellingPrice] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedBox || !sellingPrice) {
      alert("Please select a box and enter selling price per kg.");
      return;
    }
    onAddBill(Number(selectedBox), Number(sellingPrice));
    setSelectedBox("");
    setSellingPrice("");
  };

  const selectedBoxObj = boxes.find((b) => b.id === Number(selectedBox));

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <select
        value={selectedBox}
        onChange={(e) => setSelectedBox(e.target.value)}
        className="p-2 border rounded"
      >
        <option value="">-- Select Box --</option>
        {boxes.map((box) => {
          const shop = shops.find((s) => s.id === box.shopId);
          return (
            <option key={box.id} value={box.id}>
              {box.boxNumber} ({box.type}) - {shop?.name || "No Shop"}
            </option>
          );
        })}
      </select>

      {selectedBoxObj && (
        <div className="flex flex-col gap-2">
          <p>Type: {selectedBoxObj.type}</p>
          <p>Quantity: {selectedBoxObj.quantity} kg</p>
          <p>Original Price: ₹{selectedBoxObj.pricePerKg}/kg</p>
        </div>
      )}

      <input
        type="number"
        placeholder="Selling Price per kg (₹)"
        value={sellingPrice}
        onChange={(e) => setSellingPrice(e.target.value)}
        className="p-2 border rounded"
      />

      <button
        type="submit"
        className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700"
      >
        Generate Bill
      </button>
    </form>
  );
}
