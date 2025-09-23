import { useEffect, useState } from "react";
import { getShops, createShop, deleteShop, updateShop } from "../api/shops";

export default function ManageShops() {
  const [shops, setShops] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getShops();
      setShops(Array.isArray(data) ? data : []);
    };
    fetchData();
  }, []);

  const handleAddShop = async () => {
    const name = prompt("Enter Shop Name:");
    const address = prompt("Enter Address:");
    const phone = prompt("Enter Phone:");
    const fssai = prompt("Enter FSSAI No:");
    if (name && address && phone && fssai) {
      const shop = await createShop({ name, address, phone, fssai });
      setShops([...shops, shop]);
    }
  };

  const handleUpdateShop = async (shop) => {
    const newName = prompt("Update Shop Name:", shop.name);
    const newAddress = prompt("Update Address:", shop.address);
    const newPhone = prompt("Update Phone:", shop.phone);
    const newFssai = prompt("Update FSSAI:", shop.fssai);
    if (newName && newAddress && newPhone && newFssai) {
      const updated = await updateShop(shop._id, {
        name: newName,
        address: newAddress,
        phone: newPhone,
        fssai: newFssai,
      });
      setShops(shops.map((s) => (s._id === shop._id ? updated : s)));
    }
  };

  const handleDeleteShop = async (id) => {
    const deleted = await deleteShop(id);
    if (deleted) {
      setShops(shops.filter((s) => s._id !== id));
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Shops</h2>
      <button
        onClick={handleAddShop}
        className="mb-4 bg-green-600 text-white px-4 py-2 rounded"
      >
        Add Shop
      </button>
      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Shop Name</th>
            <th className="border p-2">Address</th>
            <th className="border p-2">Phone</th>
            <th className="border p-2">FSSAI No</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {shops.map((shop) => (
            <tr key={shop._id}>
              <td className="border p-2">{shop.name}</td>
              <td className="border p-2">{shop.address}</td>
              <td className="border p-2">{shop.phone}</td>
              <td className="border p-2">{shop.fssai}</td>
              <td className="border p-2 space-x-2">
                <button
                  onClick={() => handleUpdateShop(shop)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteShop(shop._id)}
                  className="bg-red-600 text-white px-2 py-1 rounded"
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
