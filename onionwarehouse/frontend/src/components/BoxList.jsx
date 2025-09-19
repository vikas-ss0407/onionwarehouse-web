export default function BoxList({ boxes, onRemove, onEdit }) {
  return (
    <div>
      {boxes.length === 0 ? (
        <p className="text-gray-600">No boxes available</p>
      ) : (
        <table className="w-full border-collapse border mt-2">
          <thead>
            <tr className="bg-green-100">
              <th className="border p-2">ID</th>
              <th className="border p-2">Box Number</th>
              <th className="border p-2">Onion Type</th>
              <th className="border p-2">Quantity (kg)</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {boxes.map((box, idx) => (
              <tr key={idx}>
                <td className="border p-2">{box.id}</td>
                <td className="border p-2">{box.boxNumber}</td>
                <td className="border p-2">{box.type}</td>
                <td className="border p-2">{box.quantity}</td>
                <td className="border p-2 flex gap-2">
                  <button
                    onClick={() => onEdit(box)}
                    className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onRemove(box.id)}
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
