import { useLocation } from "react-router-dom";

export default function PrintBill() {
  const { state } = useLocation();
  const { bill, user } = state || {};

  if (!bill || !user) return <p>No bill to display.</p>;

  const handlePrint = () => window.print();

  return (
    <div
      className="p-6 max-w-[800px] mx-auto border border-gray-300"
      style={{ width: "210mm" }} 
    >
     
      <div className="flex justify-between mb-6">
        <div className="text-left">
          <h2 className="text-lg font-bold">{user.name}</h2>
          <p>{user.address}</p>
        </div>
        <div className="text-right">
          <h2 className="text-lg font-bold">{bill.shopName}</h2>
          <p>{bill.shopAddress}</p>
          <p>FSSAI: {bill.fssaiNumber}</p>
        </div>
      </div>

      <p><strong>Date:</strong> {new Date(bill.createdAt).toLocaleString()}</p>

     
      <table className="w-full border-collapse border border-gray-400 mb-4">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-2 py-1">Box Number</th>
            <th className="border px-2 py-1">Type</th>
            <th className="border px-2 py-1">Quantity</th>
            <th className="border px-2 py-1">Selling Price</th>
            <th className="border px-2 py-1">Total</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border px-2 py-1">{bill.boxNumber}</td>
            <td className="border px-2 py-1">{bill.type}</td>
            <td className="border px-2 py-1">{bill.quantity}</td>
            <td className="border px-2 py-1">₹{bill.sellingPrice}</td>
            <td className="border px-2 py-1">₹{bill.total}</td>
          </tr>
        </tbody>
      </table>

      <button
        onClick={handlePrint}
        className="mt-4 bg-green-500 text-white px-4 py-2 rounded w-full"
      >
        Print Bill
      </button>
    </div>
  );
}
