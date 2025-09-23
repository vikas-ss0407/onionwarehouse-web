import { useState } from "react";

export default function ShopForm({ onAdd }) {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [fssai, setFssai] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !address || !fssai || !phone) {
      alert("Please fill all shop details.");
      return;
    }

    onAdd({
      id: Date.now(),
      name,
      address,
      fssai,
      phone,
    });

    setName("");
    setAddress("");
    setFssai("");
    setPhone("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-4 p-4 border rounded bg-gray-50 max-w-md"
    >
      <h2 className="text-2xl font-bold mb-4 text-green-700">
        Add Shop
      </h2>

      <div className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Shop Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="p-2 border rounded"
        />

        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="p-2 border rounded"
        />

        <input
          type="text"
          placeholder="FSSAI License Number"
          value={fssai}
          onChange={(e) => setFssai(e.target.value)}
          className="p-2 border rounded"
        />

        <input
          type="text"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="p-2 border rounded"
        />

        <button
          type="submit"
          className="bg-green-500 text-white p-2 rounded hover:bg-green-600"
        >
          Add Shop
        </button>
      </div>
    </form>
  );
}
