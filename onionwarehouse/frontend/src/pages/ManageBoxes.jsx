import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BoxList from "../components/BoxList";
import { getBoxes, updateBox, deleteBox } from "../api/boxes";

export default function ManageBoxes() {
  const [boxes, setBoxes] = useState([]);
  const navigate = useNavigate();

  // Fetch all boxes on component mount
  useEffect(() => {
    const fetchBoxes = async () => {
      const boxesData = await getBoxes();
      setBoxes(Array.isArray(boxesData) ? boxesData : []);
    };
    fetchBoxes();
  }, []);

  // Handle updating a box
  const handleUpdateBox = async (updatedBox) => {
    const savedBox = await updateBox(updatedBox._id, updatedBox);
    if (savedBox) {
      setBoxes(boxes.map((b) => (b._id === savedBox._id ? savedBox : b)));
      alert("Box updated successfully!");
    } else {
      alert("Failed to update box.");
    }
  };

  // Handle removing a box
  const handleRemoveBox = async (id) => {
    if (window.confirm("Are you sure you want to delete this box?")) {
      try {
        const res = await deleteBox(id);
        if (res) {
          setBoxes(boxes.filter((b) => b._id !== id));
          alert("Box deleted successfully!");
        } else {
          alert("Failed to delete box.");
        }
      } catch (err) {
        console.error(err);
        alert("Error deleting box.");
      }
    }
  };

  // Handle updating alert status
  const handleUpdateAlert = async (boxId, alertDays, action) => {
    try {
      const res = await fetch(`/api/boxes/${boxId}/alert`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ alertDays, action }),
      });
      const updatedBox = await res.json();

      // Update local state to reflect alert change immediately
      setBoxes((prevBoxes) =>
        prevBoxes.map((b) => {
          if (b._id === boxId) {
            const updatedAlerts = b.maintenanceAlerts.map((a) =>
              a.days === alertDays
                ? {
                    ...a,
                    status: action,
                    completedAt: action === "completed" ? new Date() : a.completedAt,
                    notifyDate: action === "remind" ? new Date(new Date().getTime() + 24*60*60*1000) : a.notifyDate
                  }
                : a
            );
            return { ...b, maintenanceAlerts: updatedAlerts };
          }
          return b;
        })
      );
    } catch (err) {
      console.error(err);
      alert("Failed to update alert");
    }
  };

  // Navigate to AddBox page
  const goToAddBoxPage = () => navigate("/addbox");

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Boxes</h2>
      <button
        onClick={goToAddBoxPage}
        className="mb-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        + Add Box
      </button>
      <BoxList
        boxes={boxes}
        onEdit={handleUpdateBox}
        onRemove={handleRemoveBox}
        onUpdateAlert={handleUpdateAlert}
      />
    </div>
  );
}
