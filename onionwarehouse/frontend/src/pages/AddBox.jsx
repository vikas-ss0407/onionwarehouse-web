import { useEffect, useState } from "react";
import BoxForm from "../components/BoxForm";
import { getShops } from "../api/shops";
import { createBox } from "../api/boxes";

export default function AddBox() {
  const [shops, setShops] = useState([]);

  useEffect(() => {
    const fetchShops = async () => {
      const data = await getShops();
      setShops(Array.isArray(data) ? data : []);
    };
    fetchShops();
  }, []);

  const handleAddBox = async (box) => {
    const savedBox = await createBox(box);
    if (savedBox) {
      alert("Box added successfully!");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Add Box</h2>
      <BoxForm shops={shops} onAdd={handleAddBox} />
    </div>
  );
}
