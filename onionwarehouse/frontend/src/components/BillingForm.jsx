import { useState } from "react";

export default function BillingForm({ boxes, onAddBill }) {
  const [selectedBox, setSelectedBox] = useState("");
  const [price, setPrice] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedBox || !price) {
      alert("Please select a box and enter price per kg.");
      return;
    }
    onAddBill(Number(selectedBox), Number(price));
    setSelectedBox("");
    setPrice("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-4 items-center">
      <select
        value={selectedBox}
        onChange={(e) => setSelectedBox(e.target.value)}
        className="p-2 border rounded"
      >
        <option value="">-- Select Box --</option>
        {boxes.map((box) => (
          <option key={box.id} value={box.id}>
            {box.boxNumber} ({box.type})
          </option>
        ))}
      </select>
      <input
        type="number"
        placeholder="Price per kg"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
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
