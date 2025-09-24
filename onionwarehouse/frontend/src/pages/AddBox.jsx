import { useState } from "react";
import BoxForm from "../components/BoxForm";
import { createBox } from "../api/boxes";

export default function AddBox() {
  const handleAddBox = async (box) => {
    const savedBox = await createBox(box);
    if (savedBox) {
      alert("Box added successfully!");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Add Box</h2>
      <BoxForm onAdd={handleAddBox} hideShopSelect={true} />
    </div>
  );
}
