import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import BoxForm from "../components/BoxForm";
import BoxList from "../components/BoxList";
import BillingForm from "../components/BillingForm";
import ShopForm from "../components/ShopForm";

import { getShops, createShop, deleteShop } from "../api/shops";
import { getBoxes, createBox, updateBox } from "../api/boxes";
import { getBills, createBill } from "../api/bills";

export default function Dashboard() {
  const navigate = useNavigate();
  const [shops, setShops] = useState([]);
  const [boxes, setBoxes] = useState([]);
  const [bills, setBills] = useState([]);
  const [activePanel, setActivePanel] = useState(""); // track which function is active

  // Fetch initial data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const shopsData = await getShops();
        const boxesData = await getBoxes();
        const billsData = await getBills();
        setShops(Array.isArray(shopsData) ? shopsData : []);
        setBoxes(Array.isArray(boxesData) ? boxesData : []);
        setBills(Array.isArray(billsData) ? billsData : []);
      } catch (err) {
        console.error("Failed to fetch dashboard data:", err);
      }
    };
    fetchData();
  }, []);

  // Shop functions
  const handleAddShop = async (shop) => {
    const savedShop = await createShop(shop);
    if (savedShop) setShops([...shops, savedShop]);
  };
  const handleDeleteShop = async (id) => {
    const deleted = await deleteShop(id);
    if (deleted) setShops(shops.filter((s) => s._id !== id));
  };

  // Box functions
  const handleAddBox = async (box) => {
    const savedBox = await createBox(box);
    if (savedBox) setBoxes([...boxes, savedBox]);
  };
  const handleUpdateBox = async (updatedBox) => {
    const savedBox = await updateBox(updatedBox._id, updatedBox);
    if (savedBox) {
      setBoxes(boxes.map((b) => (b._id === savedBox._id ? savedBox : b)));
    }
  };

  // Billing functions
  const handleAddBill = async (boxId, sellingPrice) => {
    const bill = await createBill({ boxId, sellingPrice });
    if (bill) setBills([...bills, bill]);
  };

  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold mb-6">Dashboard</h1>

      {/* Function Buttons */}
      <div className="flex flex-wrap gap-4 mb-6">
        <button
          onClick={() => setActivePanel("addShop")}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Add Shop
        </button>
        <button
          onClick={() => setActivePanel("addBox")}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add Box
        </button>
        <button
          onClick={() => setActivePanel("updateBox")}
          className="bg-yellow-600 text-white px-4 py-2 rounded"
        >
          Update Box
        </button>
        <button
          onClick={() => setActivePanel("billing")}
          className="bg-purple-600 text-white px-4 py-2 rounded"
        >
          Billing
        </button>
        <button
          onClick={() => setActivePanel("viewStocks")}
          className="bg-gray-600 text-white px-4 py-2 rounded"
        >
          View Stocks
        </button>
        <button
          onClick={() => setActivePanel("manageShops")}
          className="bg-indigo-600 text-white px-4 py-2 rounded"
        >
          Manage Shops
        </button>
      </div>

      {/* Panels */}
      <div>
        {activePanel === "addShop" && <ShopForm onAdd={handleAddShop} />}
        {activePanel === "addBox" && <BoxForm shops={shops} onAdd={handleAddBox} />}
        
        {activePanel === "updateBox" && (
          <BoxList
            boxes={boxes}
            onRemove={() => {}} // delete removed
            onEdit={(box) => {
              const newBoxNumber = prompt("Update Box Number:", box.boxNumber);
              const newType = prompt("Update Type:", box.type);
              const newQuantity = prompt("Update Quantity (kg):", box.quantity);

              if (newBoxNumber && newType && newQuantity) {
                handleUpdateBox({
                  ...box,
                  boxNumber: newBoxNumber,
                  type: newType,
                  quantity: Number(newQuantity)
                });
              }
            }}
          />
        )}

        {activePanel === "billing" && (
          <BillingForm boxes={boxes} shops={shops} onAddBill={handleAddBill} />
        )}

        {activePanel === "viewStocks" && (
          <table className="w-full border-collapse border">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">Box Number</th>
                <th className="border p-2">Type</th>
                <th className="border p-2">Shop</th>
                <th className="border p-2">Quantity (kg)</th>
                <th className="border p-2">Cost/kg</th>
              </tr>
            </thead>
            <tbody>
              {boxes.map((box) => (
                <tr key={box._id}>
                  <td className="border p-2">{box.boxNumber}</td>
                  <td className="border p-2">{box.type}</td>
                  <td className="border p-2">{shops.find(s => s._id === box.shopId)?.name || "No Shop"}</td>
                  <td className="border p-2">{box.quantity}</td>
                  <td className="border p-2">{box.pricePerKg}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {activePanel === "manageShops" && (
          <BoxList // reusing BoxList style but for shops
            boxes={shops}
            onRemove={handleDeleteShop}
            onEdit={(shop) => {
              const newName = prompt("Update Shop Name:", shop.name);
              const newAddress = prompt("Update Address:", shop.address);
              const newFssai = prompt("Update FSSAI:", shop.fssai);
              if (newName && newAddress && newFssai) {
                handleAddShop({
                  ...shop,
                  name: newName,
                  address: newAddress,
                  fssai: newFssai
                });
              }
            }}
          />
        )}
      </div>
    </div>
  );
}
