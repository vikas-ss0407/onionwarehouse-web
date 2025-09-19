import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BoxForm from "../components/BoxForm";
import BoxList from "../components/BoxList";
import BillingForm from "../components/BillingForm";

export default function Dashboard() {
  const navigate = useNavigate();
  const [boxes, setBoxes] = useState([]);
  const [activeAction, setActiveAction] = useState("view"); 
  const [bills, setBills] = useState([]);

  // Box operations
  const handleAddBox = (box) => {
    setBoxes([...boxes, box]);
    setActiveAction("view");
  };
  const handleRemoveBox = (id) => setBoxes(boxes.filter((b) => b.id !== id));
  const handleEditBox = (box) => {
    const newBoxNumber = prompt("Enter new Box Number:", box.boxNumber);
    const newType = prompt("Enter new Onion Type (Bulb Onion / Shallot Onion):", box.type);
    const newQuantity = prompt("Enter new Quantity (kg):", box.quantity);
    if (newBoxNumber && newType && newQuantity) {
      setBoxes(
        boxes.map((b) =>
          b.id === box.id
            ? { ...b, boxNumber: newBoxNumber, type: newType, quantity: newQuantity }
            : b
        )
      );
    }
  };

  // Billing operations
  const handleAddBill = (boxId, pricePerKg) => {
    const selectedBox = boxes.find((b) => b.id === boxId);
    if (!selectedBox) return;
    const total = selectedBox.quantity * pricePerKg;
    const bill = {
      id: Date.now(),
      boxNumber: selectedBox.boxNumber,
      type: selectedBox.type,
      quantity: selectedBox.quantity,
      pricePerKg,
      total,
    };
    setBills([...bills, bill]);
  };

  return (
    <div className="p-6">
      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-4 bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
      >
        ← Back
      </button>

      <h2 className="text-3xl font-bold text-green-700 mb-4">Dashboard</h2>

      {/* Action Buttons */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setActiveAction("add")}
          className={`px-4 py-2 rounded ${activeAction === "add" ? "bg-green-700 text-white" : "bg-gray-200 hover:bg-gray-300"}`}
        >
          ➕ Add Box
        </button>
        <button
          onClick={() => setActiveAction("update")}
          className={`px-4 py-2 rounded ${activeAction === "update" ? "bg-blue-700 text-white" : "bg-gray-200 hover:bg-gray-300"}`}
        >
          ✏️ Update Box
        </button>
        <button
          onClick={() => setActiveAction("delete")}
          className={`px-4 py-2 rounded ${activeAction === "delete" ? "bg-red-700 text-white" : "bg-gray-200 hover:bg-gray-300"}`}
        >
          🗑️ Delete Box
        </button>
        <button
          onClick={() => setActiveAction("billing")}
          className={`px-4 py-2 rounded ${activeAction === "billing" ? "bg-yellow-500 text-white" : "bg-gray-200 hover:bg-gray-300"}`}
        >
          💰 Billing
        </button>
      </div>

      {/* Render Section Based on Active Action */}
      {activeAction === "add" && <BoxForm onAdd={handleAddBox} />}
      {(activeAction === "update" || activeAction === "delete") && (
        <BoxList
          boxes={boxes}
          onRemove={activeAction === "delete" ? handleRemoveBox : () => {}}
          onEdit={activeAction === "update" ? handleEditBox : () => {}}
        />
      )}
      {activeAction === "billing" && (
        <BillingForm boxes={boxes} onAddBill={handleAddBill} bills={bills} />
      )}
    </div>
  );
}
