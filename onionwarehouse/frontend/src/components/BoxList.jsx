import { useState } from "react";

export default function BoxList({ boxes, onRemove, onEdit, hideShopColumn }) {
  const [editId, setEditId] = useState(null);
  const [editBoxNumber, setEditBoxNumber] = useState("");
  const [editType, setEditType] = useState("");
  const [editQuantity, setEditQuantity] = useState("");

  const startEdit = (box) => {
    setEditId(box.id || box._id);
    setEditBoxNumber(box.boxNumber || box.name);
    setEditType(box.type || "");
    setEditQuantity(box.quantity || "");
  };

  const submitEdit = (id) => {
    if (!editBoxNumber || !editType || !editQuantity) {
      alert("Fill all fields");
      return;
    }
    onEdit({
      _id: id,
      boxNumber: editBoxNumber,
      type: editType,
      quantity: Number(editQuantity),
    });
    setEditId(null);
  };

  return (
    <div>
      {boxes.length === 0 ? (
        <p className="text-gray-600">No entries available</p>
      ) : (
        <table className="w-full border-collapse border mt-2">
          <thead>
            <tr className="bg-green-100">
              <th className="border p-2">ID</th>
              <th className="border p-2">Box Number / Name</th>
              <th className="border p-2">Onion Type</th>
              <th className="border p-2">Quantity (kg)</th>
              {!hideShopColumn && <th className="border p-2">Shop</th>}
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {boxes.map((box) => (
              <tr key={box.id || box._id}>
                <td className="border p-2">{box.id || box._id}</td>
                <td className="border p-2">
                  {editId === (box.id || box._id) ? (
                    <input
                      type="text"
                      value={editBoxNumber}
                      onChange={(e) => setEditBoxNumber(e.target.value)}
                      className="p-1 border rounded"
                    />
                  ) : (
                    box.boxNumber || box.name
                  )}
                </td>
                <td className="border p-2">
                  {editId === (box.id || box._id) ? (
                    <select
                      value={editType}
                      onChange={(e) => setEditType(e.target.value)}
                      className="p-1 border rounded"
                    >
                      <option value="">-- Select Onion Type --</option>
                      <option value="Bulb Onion">Bulb Onion</option>
                      <option value="Shallot Onion">Shallot Onion</option>
                    </select>
                  ) : (
                    box.type || "-"
                  )}
                </td>
                <td className="border p-2">
                  {editId === (box.id || box._id) ? (
                    <input
                      type="number"
                      value={editQuantity}
                      onChange={(e) => setEditQuantity(e.target.value)}
                      className="p-1 border rounded"
                    />
                  ) : (
                    box.quantity
                  )}
                </td>
                {!hideShopColumn && (
                  <td className="border p-2">{box.shopName || box.shop}</td>
                )}
                <td className="border p-2 flex gap-2">
                  {editId === (box.id || box._id) ? (
                    <button
                      onClick={() => submitEdit(box.id || box._id)}
                      className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      onClick={() => startEdit(box)}
                      className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                    >
                      Edit
                    </button>
                  )}
                  <button
                    onClick={() => onRemove(box.id || box._id)}
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
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
  );
}
