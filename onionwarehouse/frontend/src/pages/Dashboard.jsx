import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlus, FaEdit, FaTrash, FaMoneyBill, FaStore } from "react-icons/fa";

import BoxForm from "../components/BoxForm";
import BoxList from "../components/BoxList";
import BillingForm from "../components/BillingForm";
import ShopForm from "../components/ShopForm";

export default function Dashboard() {
  const navigate = useNavigate();
  const [activeAction, setActiveAction] = useState("view");
  const [shops, setShops] = useState([]);
  const [boxes, setBoxes] = useState([]);
  const [bills, setBills] = useState([]);

  // ----- Shop operations -----
  const handleAddShop = (shop) => {
    setShops([...shops, shop]);
    setActiveAction("view");
  };

  // ----- Box operations -----
  const handleAddBox = (box) => {
    setBoxes([...boxes, box]);
    setActiveAction("view");
  };

  const handleRemoveBox = (id) => setBoxes(boxes.filter((b) => b.id !== id));

  const handleEditBox = (box) => {
    const newBoxNumber = prompt("Enter new Box Number:", box.boxNumber);
    const newType = prompt(
      "Enter new Onion Type (Bulb Onion / Shallot Onion):",
      box.type
    );
    const newQuantity = prompt("Enter new Quantity (kg):", box.quantity);
    const newPrice = prompt("Enter Cost Price per kg:", box.pricePerKg);

    if (newBoxNumber && newType && newQuantity && newPrice) {
      setBoxes(
        boxes.map((b) =>
          b.id === box.id
            ? {
                ...b,
                boxNumber: newBoxNumber,
                type: newType,
                quantity: Number(newQuantity),
                pricePerKg: Number(newPrice),
              }
            : b
        )
      );
    }
  };

  // ----- Billing operations -----
  const handleAddBill = (boxId, sellingPrice) => {
    const selectedBox = boxes.find((b) => b.id === boxId);
    if (!selectedBox) return;

    const total = selectedBox.quantity * sellingPrice;
    const bill = {
      id: Date.now(),
      boxNumber: selectedBox.boxNumber,
      type: selectedBox.type,
      shopName: shops.find((s) => s.id === selectedBox.shopId)?.name || "No Shop",
      quantity: selectedBox.quantity,
      costPrice: selectedBox.pricePerKg,
      sellingPrice,
      total,
    };

    setBills([...bills, bill]);
  };

  return (
    <div
      className="p-6 min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/images/home.jpg')" }}
    >
      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-4 bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
      >
        ← Back
      </button>

      <h2 className="text-3xl font-bold text-green-700 mb-4">Dashboard</h2>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-4 mb-6">
        <button
          onClick={() => setActiveAction("addShop")}
          className={`px-4 py-2 rounded flex items-center gap-2 ${
            activeAction === "addShop"
              ? "bg-green-700 text-white"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          <FaStore /> Add Shop
        </button>

        <button
          onClick={() => setActiveAction("addBox")}
          className={`px-4 py-2 rounded flex items-center gap-2 ${
            activeAction === "addBox"
              ? "bg-green-700 text-white"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          <FaPlus /> Add Box
        </button>

        <button
          onClick={() => setActiveAction("updateBox")}
          className={`px-4 py-2 rounded flex items-center gap-2 ${
            activeAction === "updateBox"
              ? "bg-blue-700 text-white"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          <FaEdit /> Update Box
        </button>

        <button
          onClick={() => setActiveAction("deleteBox")}
          className={`px-4 py-2 rounded flex items-center gap-2 ${
            activeAction === "deleteBox"
              ? "bg-red-700 text-white"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          <FaTrash /> Delete Box
        </button>

        <button
          onClick={() => setActiveAction("billing")}
          className={`px-4 py-2 rounded flex items-center gap-2 ${
            activeAction === "billing"
              ? "bg-yellow-500 text-white"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          <FaMoneyBill /> Billing
        </button>
      </div>

      {/* Render Sections Based on Active Action */}
      {activeAction === "addShop" && <ShopForm onAdd={handleAddShop} shops={shops} />}
      {activeAction === "addBox" && <BoxForm onAdd={handleAddBox} shops={shops} />}
      {activeAction === "updateBox" && (
        <BoxList boxes={boxes} onEdit={handleEditBox} onRemove={() => {}} />
      )}
      {activeAction === "deleteBox" && (
        <BoxList boxes={boxes} onRemove={handleRemoveBox} onEdit={() => {}} />
      )}
      {activeAction === "billing" && (
        <BillingForm boxes={boxes} shops={shops} onAddBill={handleAddBill} />
      )}
    </div>
  );
}
