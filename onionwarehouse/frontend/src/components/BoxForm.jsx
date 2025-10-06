import { useState, useEffect } from "react";
import BoxList from "./BoxList";
import { getBoxes } from "../api/boxes";

export default function BoxForm({ onAdd, showList = true }) {
  const [boxNumber, setBoxNumber] = useState("");
  const [type, setType] = useState("");
  const [quantity, setQuantity] = useState("");
  const [pricePerKg, setPricePerKg] = useState("");
  const [boxes, setBoxes] = useState([]);

  useEffect(() => {
    if (showList) {
      const fetchBoxes = async () => {
        try {
          const data = await getBoxes();
          setBoxes(Array.isArray(data) ? data : []);
        } catch (err) {
          console.error("Error fetching boxes:", err);
          setBoxes([]);
        }
      };
      fetchBoxes();
    }
  }, [showList]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!boxNumber || !type || !quantity || !pricePerKg) {
      alert("Fill all fields");
      return;
    }

    onAdd({
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
    <div>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 rounded shadow mb-4 space-y-2"
      >
        <div>
          <label>Box Number:</label>
          <input
            type="text"
            value={boxNumber}
            onChange={(e) => setBoxNumber(e.target.value)}
            className="p-1 border rounded w-full"
          />
        </div>
        <div>
          <label>Onion Type:</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="p-1 border rounded w-full"
          >
            <option value="">-- Select Onion Type --</option>
            <option value="Bulb Onion">Bulb Onion</option>
            <option value="Shallot Onion">Shallot Onion</option>
          </select>
        </div>
        <div>
          <label>Quantity (kg):</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="p-1 border rounded w-full"
          />
        </div>
        <div>
          <label>Cost per Kg (₹):</label>
          <input
            type="number"
            value={pricePerKg}
            onChange={(e) => setPricePerKg(e.target.value)}
            className="p-1 border rounded w-full"
          />
        </div>
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Add Box
        </button>
      </form>

      {/* Show BoxList only if showList is true */}
      {showList && <BoxList boxes={boxes} />}
    </div>
  );
}
