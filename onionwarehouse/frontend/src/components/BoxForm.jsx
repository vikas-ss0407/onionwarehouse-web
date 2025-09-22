import { useState } from "react";

export default function BoxForm({ onAdd }) {
  const [boxNumber, setBoxNumber] = useState("");
  const [type, setType] = useState("");
  const [quantity, setQuantity] = useState("");
  const [pricePerKg, setPricePerKg] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!boxNumber || !type || !quantity || !pricePerKg) {
      alert("Please fill all fields.");
      return;
    }

    onAdd({
      id: Date.now(),
      boxNumber,
      type,
      quantity: Number(quantity),
      pricePerKg: Number(pricePerKg),
    });

    setBoxNumber("");
    setType("");
    setQuantity("");
    setPricePerKg("");
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 p-4 border rounded bg-gray-50">
      <div className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Box Number"
          value={boxNumber}
          onChange={(e) => setBoxNumber(e.target.value)}
          className="p-2 border rounded"
        />

        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="">-- Select Onion Type --</option>
          <option value="Bulb Onion">Bulb Onion</option>
          <option value="Shallot Onion">Shallot Onion</option>
        </select>

        <input
          type="number"
          placeholder="Quantity (kg)"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          className="p-2 border rounded"
        />

        <input
          type="number"
          placeholder="Cost Price per kg"
          value={pricePerKg}
          onChange={(e) => setPricePerKg(e.target.value)}
          className="p-2 border rounded"
        />

        <button
          type="submit"
          className="bg-green-500 text-white p-2 rounded hover:bg-green-600 flex items-center gap-2"
        >
          Add Box
        </button>
      </div>
    </form>
  );
}
