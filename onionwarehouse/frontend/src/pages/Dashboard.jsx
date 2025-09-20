import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlus, FaEdit, FaTrash, FaCashRegister, FaStore } from "react-icons/fa";
import BoxForm from "../components/BoxForm";
import BoxList from "../components/BoxList";
import BillingForm from "../components/BillingForm";
import ShopForm from "../components/ShopForm";

export default function Dashboard() {
  const navigate = useNavigate();
  const [boxes, setBoxes] = useState([]);
  const [shops, setShops] = useState([]);
  const [bills, setBills] = useState([]);
  const [activeAction, setActiveAction] = useState("view");

  // Shop operations
  const handleAddShop = (shop) => setShops([...shops, shop]);

  // Box operations
  const handleAddBox = (box) => setBoxes([...boxes, box]);
  const handleRemoveBox = (id) => setBoxes(boxes.filter((b) => b.id !== id));
  const handleEditBox = (box) => {
    const newBoxNumber = prompt("Box Number:", box.boxNumber);
    const newType = prompt("Type:", box.type);
    const newQuantity = prompt("Quantity:", box.quantity);
    const newPrice = prompt("Price per kg:", box.pricePerKg);
    if (newBoxNumber && newType && newQuantity && newPrice) {
      setBoxes(
        boxes.map((b) =>
          b.id === box.id
            ? { ...b, boxNumber: newBoxNumber, type: newType, quantity: newQuantity, pricePerKg: newPrice }
            : b
        )
      );
    }
  };

  // Billing operations
  const handleAddBill = (boxId, sellingPrice) => {
    const box = boxes.find((b) => b.id === boxId);
    if (!box) return;
    const total = box.quantity * sellingPrice;
    setBills([...bills, { ...box, sellingPrice, total, id: Date.now() }]);
  };

  return (
    <div className="p-6">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
      >
        ← Back
      </button>
      <h2 className="text-3xl font-bold text-green-700 mb-4">Dashboard</h2>

      {/* Action Buttons */}
      <div className="flex gap-4 mb-6 flex-wrap">
        <button
          onClick={() => setActiveAction("addBox")}
          className={`flex items-center gap-2 px-4 py-2 rounded ${activeAction === "addBox" ? "bg-green-700 text-white" : "bg-gray-200 hover:bg-gray-300"}`}
        >
          <FaPlus /> Add Box
        </button>

        <button
          onClick={() => setActiveAction("updateBox")}
          className={`flex items-center gap-2 px-4 py-2 rounded ${activeAction === "updateBox" ? "bg-blue-700 text-white" : "bg-gray-200 hover:bg-gray-300"}`}
        >
          <FaEdit /> Update Box
        </button>

        <button
          onClick={() => setActiveAction("deleteBox")}
          className={`flex items-center gap-2 px-4 py-2 rounded ${activeAction === "deleteBox" ? "bg-red-700 text-white" : "bg-gray-200 hover:bg-gray-300"}`}
        >
          <FaTrash /> Delete Box
        </button>

        <button
          onClick={() => setActiveAction("billing")}
          className={`flex items-center gap-2 px-4 py-2 rounded ${activeAction === "billing" ? "bg-yellow-500 text-white" : "bg-gray-200 hover:bg-gray-300"}`}
        >
          <FaCashRegister /> Billing
        </button>

        <button
          onClick={() => setActiveAction("shop")}
          className={`flex items-center gap-2 px-4 py-2 rounded ${activeAction === "shop" ? "bg-purple-700 text-white" : "bg-gray-200 hover:bg-gray-300"}`}
        >
          <FaStore /> Shops
        </button>
      </div>

      {/* Render sections based on action */}
      {activeAction === "shop" && <ShopForm onAdd={handleAddShop} />}
      {activeAction === "addBox" && <BoxForm onAdd={handleAddBox} shops={shops} />}
      {(activeAction === "updateBox" || activeAction === "deleteBox") && (
        <BoxList
          boxes={boxes}
          onRemove={activeAction === "deleteBox" ? handleRemoveBox : undefined}
          onEdit={activeAction === "updateBox" ? handleEditBox : undefined}
        />
      )}
      {activeAction === "billing" && <BillingForm boxes={boxes} onAddBill={handleAddBill} shops={shops} />}
    </div>
  );
}
