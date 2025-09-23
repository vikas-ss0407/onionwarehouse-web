import { useEffect, useState } from "react";
import BoxList from "../components/BoxList";
import { getBoxes, updateBox } from "../api/boxes";

export default function UpdateBox() {
  const [boxes, setBoxes] = useState([]);

  useEffect(() => {
    const fetchBoxes = async () => {
      const data = await getBoxes();
      setBoxes(Array.isArray(data) ? data : []);
    };
    fetchBoxes();
  }, []);

  const handleUpdateBox = async (updatedBox) => {
    const savedBox = await updateBox(updatedBox._id, updatedBox);
    if (savedBox) {
      setBoxes(boxes.map((b) => (b._id === savedBox._id ? savedBox : b)));
      alert("Box updated successfully!");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Update Box</h2>
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
        hideShopColumn={true}
      />
    </div>
  );
}
