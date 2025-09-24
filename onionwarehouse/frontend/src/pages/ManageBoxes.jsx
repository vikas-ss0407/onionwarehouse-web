import { useEffect, useState } from "react";
import BoxForm from "../components/BoxForm";
import BoxList from "../components/BoxList";
import { getBoxes, createBox, updateBox } from "../api/boxes";

export default function ManageBoxes() {
  const [boxes, setBoxes] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    const fetchBoxes = async () => {
      const boxesData = await getBoxes();
      setBoxes(Array.isArray(boxesData) ? boxesData : []);
    };
    fetchBoxes();
  }, []);

  // Add new box
  const handleAddBox = async (box) => {
    const savedBox = await createBox(box);
    if (savedBox) {
      setBoxes([...boxes, savedBox]);
      alert("Box added successfully!");
      setShowAddForm(false);
    }
  };

  // Update existing box
  const handleUpdateBox = async (updatedBox) => {
    const savedBox = await updateBox(updatedBox._id, updatedBox);
    if (savedBox) {
      setBoxes(boxes.map((b) => (b._id === savedBox._id ? savedBox : b)));
      alert("Box updated successfully!");
    }
  };

  // Remove box
  const handleRemoveBox = (id) => {
    setBoxes(boxes.filter((b) => b._id !== id));
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Boxes</h2>

      {/* Add Box button/form */}
      {!showAddForm ? (
        <button
          onClick={() => setShowAddForm(true)}
          className="mb-4 bg-green-600 text-white px-4 py-2 rounded"
        >
          Add Box
        </button>
      ) : (
        <BoxForm onAdd={handleAddBox} />
      )}

      {/* Inline editable box list */}
      <BoxList
        boxes={boxes}
        onRemove={handleRemoveBox}
        onEdit={handleUpdateBox} // inline edit handled inside BoxList
        hideShopColumn={true} // hide shop column
        hideIdColumn={true} // hide id column
      />
    </div>
  );
}
