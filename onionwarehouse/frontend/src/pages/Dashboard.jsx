import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaTrash } from "react-icons/fa";

import BoxForm from "../components/BoxForm";
import BoxList from "../components/BoxList";
import BillingForm from "../components/BillingForm";
import ShopForm from "../components/ShopForm";

import { getShops, createShop, deleteShop } from "../api/shops";
import { getBoxes, createBox, deleteBox } from "../api/boxes";
import { getBills, createBill } from "../api/bills";

export default function Dashboard() {
  const navigate = useNavigate();
  const [shops, setShops] = useState([]);
  const [boxes, setBoxes] = useState([]);
  const [bills, setBills] = useState([]);

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
        setShops([]);
        setBoxes([]);
        setBills([]);
      }
    };
    fetchData();
  }, []);

  const handleAddShop = async (shop) => {
    const savedShop = await createShop(shop);
    if (savedShop) setShops([...shops, savedShop]);
  };

  const handleDeleteShop = async (id) => {
    const deleted = await deleteShop(id);
    if (deleted) setShops(shops.filter((s) => s._id !== id));
  };

  const handleAddBox = async (box) => {
    const savedBox = await createBox(box);
    if (savedBox) setBoxes([...boxes, savedBox]);
  };

  const handleDeleteBox = async (id) => {
    const deleted = await deleteBox(id);
    if (deleted) setBoxes(boxes.filter((b) => b._id !== id));
  };

  const handleAddBill = async (boxId, sellingPrice) => {
    const bill = await createBill({ boxId, sellingPrice });
    if (bill) setBills([...bills, bill]);
  };

  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold mb-4">Dashboard</h1>

      <div className="flex gap-10 flex-wrap">
        <div className="w-full md:w-1/3">
          <ShopForm onAddShop={handleAddShop} />
          <ul className="mt-4">
            {shops.length > 0 ? shops.map((shop) => (
              <li key={shop._id} className="flex justify-between p-2 border mb-2">
                {shop.name}
                <button onClick={() => handleDeleteShop(shop._id)} className="text-red-500">
                  <FaTrash />
                </button>
              </li>
            )) : <li>No shops found</li>}
          </ul>
        </div>

        <div className="w-full md:w-1/3">
          <BoxForm shops={shops} onAddBox={handleAddBox} />
          <BoxList boxes={boxes} onDeleteBox={handleDeleteBox} />
        </div>

        <div className="w-full md:w-1/3">
          <BillingForm boxes={boxes} onAddBill={handleAddBill} />
          <ul className="mt-4">
            {bills.length > 0 ? bills.map((bill) => (
              <li key={bill._id} className="flex justify-between p-2 border mb-2">
                Box: {bill.boxId} | Price: ₹{bill.sellingPrice}
              </li>
            )) : <li>No bills found</li>}
          </ul>
        </div>
      </div>
    </div>
  );
}
