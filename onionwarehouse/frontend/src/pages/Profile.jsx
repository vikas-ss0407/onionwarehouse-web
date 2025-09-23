import { useState, useEffect } from "react";
import Cookies from "js-cookie";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const savedUser = Cookies.get("user") ? JSON.parse(Cookies.get("user")) : null;
    if (savedUser) setUser(savedUser);
  }, []);

  const handleSave = () => {
    Cookies.set("user", JSON.stringify(user), { expires: 1 }); 
    setEditMode(false);
    alert("Profile updated!");
  };

  if (!user) return <p className="p-6 text-red-500">No user found</p>;

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded shadow">
      <h2 className="text-3xl font-bold text-green-700 mb-4">Profile</h2>

      {editMode ? (
        <div className="flex flex-col gap-3">
          <input
            type="text"
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
            className="p-2 border rounded"
          />
          <input
            type="email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            className="p-2 border rounded"
          />
          <input
            type="text"
            value={user.phone}
            onChange={(e) => setUser({ ...user, phone: e.target.value })}
            className="p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Enter Address"
            value={user.address}
            onChange={(e) => setUser({ ...user, address: e.target.value })}
            className="p-2 border rounded"
          />
          <button
            onClick={handleSave}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Save
          </button>
        </div>
      ) : (
        <div className="space-y-2">
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Phone:</strong> {user.phone}</p>
          <p><strong>Address:</strong> {user.address || "Not Provided"}</p>
          <button
            onClick={() => setEditMode(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mt-4"
          >
            Edit Profile
          </button>
        </div>
      )}
    </div>
  );
}
