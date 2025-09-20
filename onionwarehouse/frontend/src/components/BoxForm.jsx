import { useState } from "react";

export default function BoxForm({ onAdd, shops }) {
  const [boxNumber, setBoxNumber] = useState("");
  const [type, setType] = useState("");
  const [quantity, setQuantity] = useState("");
  const [pricePerKg, setPricePerKg] = useState("");
  const [shopId, setShopId] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!boxNumber || !type || !quantity || !pricePerKg || !shopId) {
      alert("Please fill all fields.");
      return;
    }
    onAdd({
      id: Date.now(),
      boxNumber,
      type,
      quantity,
      pricePerKg,
      shopId,
    });
    setBoxNumber("");
    setType("");
    setQuantity("");
    setPricePerKg("");
    setShopId("");
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
          <option value="">-- Select Type of Onion --</option>
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
          placeholder="Price per kg (₹)"
          value={pricePerKg}
          onChange={(e) => setPricePerKg(e.target.value)}
          className="p-2 border rounded"
        />
        <select
          value={shopId}
          onChange={(e) => setShopId(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="">-- Select Shop --</option>
          {shops.map((shop) => (
            <option key={shop.id} value={shop.id}>
              {shop.name}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="bg-green-500 text-white p-2 rounded hover:bg-green-600"
        >
          Add Box
        </button>
      </div>
    </form>
  );
}
