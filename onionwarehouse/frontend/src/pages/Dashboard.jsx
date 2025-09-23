import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import BoxForm from "../components/BoxForm";
import BoxList from "../components/BoxList";
import BillingForm from "../components/BillingForm";
import ShopForm from "../components/ShopForm";

import { getShops, createShop, deleteShop } from "../api/shops";
import { getBoxes, createBox, updateBox } from "../api/boxes";
import { getBills, createBill } from "../api/bills";
import API_BASE_URL, { getAuthHeader } from "../api/config";

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

  const handleUpdateShop = async (updatedShop) => {
    try {
      const res = await fetch(`${API_BASE_URL}/shops/${updatedShop._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", ...getAuthHeader() },
        credentials: "include",
        body: JSON.stringify(updatedShop),
      });
      const savedShop = await res.json();
      if (savedShop) {
        setShops(shops.map((s) => (s._id === savedShop._id ? savedShop : s)));
      }
    } catch (err) {
      console.error("Failed to update shop:", err);
    }
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
  const handleAddBill = async (boxId, shopId, quantity, sellingPrice) => {
    const bill = await createBill({ boxId, shopId, quantity, sellingPrice });
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

        {/* Update Box */}
        {activePanel === "updateBox" && (
          <BoxList
            boxes={boxes}
            onRemove={() => {}}
            onEdit={(box) => {
              const newBoxNumber = prompt("Update Box Number:", box.boxNumber);
              const newType = prompt(
                "Update Type (Bulb Onion / Shallot Onion):",
                box.type
              );
              const newQuantity = prompt("Update Quantity (kg):", box.quantity);

              if (newBoxNumber && newType && newQuantity) {
                handleUpdateBox({
                  ...box,
                  boxNumber: newBoxNumber,
                  type: newType,
                  quantity: Number(newQuantity),
                });
              }
            }}
            hideShopColumn={true} // hide shop column
          />
        )}

        {/* Billing */}
        {activePanel === "billing" && (
          <BillingForm
            boxes={boxes}
            shops={shops}
            onAddBill={handleAddBill}
            billingMode
          />
        )}

        {/* View Stocks */}
        {activePanel === "viewStocks" && (
          <table className="w-full border-collapse border">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">Box Number</th>
                <th className="border p-2">Type</th>
                <th className="border p-2">Quantity (kg)</th>
                <th className="border p-2">Cost/kg (₹)</th>
              </tr>
            </thead>
            <tbody>
              {boxes.map((box) => (
                <tr key={box._id}>
                  <td className="border p-2">{box.boxNumber}</td>
                  <td className="border p-2">{box.type}</td>
                  <td className="border p-2">{box.quantity}</td>
                  <td className="border p-2">{box.pricePerKg}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* Manage Shops */}
        {activePanel === "manageShops" && (
          <table className="w-full border-collapse border">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">Shop Name</th>
                <th className="border p-2">Address</th>
                <th className="border p-2">Phone</th>
                <th className="border p-2">FSSAI License</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {shops.map((shop) => (
                <tr key={shop._id}>
                  <td className="border p-2">{shop.name}</td>
                  <td className="border p-2">{shop.address}</td>
                  <td className="border p-2">{shop.phone}</td>
                  <td className="border p-2">{shop.fssai}</td>
                  <td className="border p-2 flex gap-2">
                    <button
                      onClick={() => {
                        const newName = prompt("Update Shop Name:", shop.name);
                        const newAddress = prompt("Update Address:", shop.address);
                        const newPhone = prompt("Update Phone:", shop.phone);
                        const newFssai = prompt("Update FSSAI License:", shop.fssai);
                        if (newName && newAddress && newPhone && newFssai) {
                          handleUpdateShop({
                            ...shop,
                            name: newName,
                            address: newAddress,
                            phone: newPhone,
                            fssai: newFssai,
                          });
                        }
                      }}
                      className="bg-yellow-500 text-white px-2 py-1 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteShop(shop._id)}
                      className="bg-red-500 text-white px-2 py-1 rounded"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
