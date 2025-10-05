import { useState } from "react";

export default function BoxList({ boxes, onRemove, onEdit, onUpdateAlert }) {
  const [editId, setEditId] = useState(null);
  const [editBoxNumber, setEditBoxNumber] = useState("");
  const [editType, setEditType] = useState("");
  const [editQuantity, setEditQuantity] = useState("");
  const [editPricePerKg, setEditPricePerKg] = useState("");
  const [activeAlertBox, setActiveAlertBox] = useState(null); // popup state

  const startEdit = (box) => {
    setEditId(box._id);
    setEditBoxNumber(box.boxNumber);
    setEditType(box.type);
    setEditQuantity(box.quantity);
    setEditPricePerKg(box.pricePerKg || "");
  };

  const submitEdit = (id) => {
    if (!editBoxNumber || !editType || !editQuantity || !editPricePerKg) {
      alert("Fill all fields");
      return;
    }
    onEdit({
      _id: id,
      boxNumber: editBoxNumber,
      type: editType,
      quantity: Number(editQuantity),
      pricePerKg: Number(editPricePerKg),
    });
    setEditId(null);
  };

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  const today = new Date();

  if (!boxes || boxes.length === 0) {
    return <p className="text-gray-600">No boxes available</p>;
  }

  return (
    <div className="flex flex-wrap justify-center gap-6">
      {boxes.map((box) => {
        const imageSrc =
          box.type === "Bulb Onion"
            ? "/images/bulb onion.jpg"
            : "/images/shallot onion.jpg";

        // Check if any alert needs notification
        const alertToNotify = box.maintenanceAlerts?.find(
          (a) =>
            a.status !== "completed" &&
            new Date(a.notifyDate) <= today
        );

        return (
          <div
            key={box._id}
            className="bg-white rounded shadow-md w-80 transition transform hover:scale-105 relative"
          >
            {/* Notification Symbol */}
            {alertToNotify && (
              <div
                onClick={() => setActiveAlertBox(box)}
                className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white flex items-center justify-center rounded-full cursor-pointer"
                title="Maintenance Alert"
              >
                !
              </div>
            )}

            {/* Image container */}
            <div className="aspect-square w-full overflow-hidden rounded-t">
              <img
                src={imageSrc}
                alt={box.type}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Box info */}
            <div className="p-3 border-t space-y-2">
              <p className="font-semibold text-lg">
                Box Number: {box.boxNumber}
              </p>
              <p>
                <strong>Type:</strong>{" "}
                {editId === box._id ? (
                  <select
                    value={editType}
                    onChange={(e) => setEditType(e.target.value)}
                    className="p-1 border rounded w-full"
                  >
                    <option value="">-- Select Onion Type --</option>
                    <option value="Bulb Onion">Bulb Onion</option>
                    <option value="Shallot Onion">Shallot Onion</option>
                  </select>
                ) : (
                  box.type
                )}
              </p>
              <p>
                <strong>Quantity (kg):</strong>{" "}
                {editId === box._id ? (
                  <input
                    type="number"
                    value={editQuantity}
                    onChange={(e) => setEditQuantity(e.target.value)}
                    className="p-1 border rounded w-full"
                  />
                ) : (
                  box.quantity
                )}
              </p>
              <p>
                <strong>Price per kg:</strong> ₹ {box.pricePerKg}
              </p>
              <p>
                <strong>Created At:</strong> {formatDateTime(box.createdAt)}
              </p>

              {/* Buttons */}
              <div className="flex gap-2 mt-2">
                {editId === box._id ? (
                  <button
                    onClick={() => submitEdit(box._id)}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-sm"
                  >
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() => startEdit(box)}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-sm"
                  >
                    Edit
                  </button>
                )}

                <button
                  onClick={() => onRemove(box._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
                >
                  Remove
                </button>
              </div>
            </div>

            {/* Alert Popup */}
            {activeAlertBox && activeAlertBox._id === box._id && alertToNotify && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white p-6 rounded shadow-lg w-96">
                  <h3 className="text-lg font-bold mb-4">Maintenance Alert</h3>
                  <p>
                    Box <strong>{box.boxNumber}</strong> needs maintenance for{" "}
                    {alertToNotify.days}-day schedule.
                  </p>
                  <div className="flex gap-4 mt-4 justify-end">
                    <button
                      onClick={() => {
                        onUpdateAlert(box._id, alertToNotify.days, "completed");
                        setActiveAlertBox(null);
                      }}
                      className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                    >
                      Completed
                    </button>
                    <button
                      onClick={() => {
                        onUpdateAlert(box._id, alertToNotify.days, "remind");
                        setActiveAlertBox(null);
                      }}
                      className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
                    >
                      Remind me in 1 day
                    </button>
                    <button
                      onClick={() => setActiveAlertBox(null)}
                      className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
