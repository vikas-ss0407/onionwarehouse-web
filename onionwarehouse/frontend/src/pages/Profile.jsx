import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { updateProfile, getProfile } from "../api/auth";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [completion, setCompletion] = useState(0);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getProfile();
        if (res.user) setUser(res.user);
        calculateCompletion(res.user);
      } catch (err) {
        console.error(err);
        alert("Failed to fetch user");
      }
    };
    fetchUser();
  }, []);

  const calculateCompletion = (userData) => {
    const fields = ["name", "email", "phone", "address"];
    let filled = fields.filter((f) => userData[f] && userData[f].trim() !== "").length;
    setCompletion(Math.round((filled / fields.length) * 100));
  };

  const handleSave = async () => {
    try {
      const res = await updateProfile({
        name: user.name,
        phone: user.phone,
        address: user.address,
      });

      if (res.user) {
        setUser(res.user);
        setEditMode(false);
        calculateCompletion(res.user);
        alert("Profile updated successfully!");
      } else {
        alert(res.message || "Failed to update profile.");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to update profile.");
    }
  };

  if (!user)
    return (
      <div className="p-6 max-w-lg mx-auto">
        <p className="text-red-500 text-center font-semibold">No user found</p>
      </div>
    );

  // Circle settings
  const radius = 70;
  const stroke = 8;
  const normalizedRadius = radius - stroke / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (completion / 100) * circumference;

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-start pt-12">
      <div className="bg-white shadow-lg rounded-xl w-full max-w-md p-8">
        {/* Header */}
        <div className="flex flex-col items-center mb-6">
          <div className="relative w-36 h-36 mb-3">
            <svg height={radius * 2} width={radius * 2}>
              <circle stroke="#e5e7eb" fill="transparent" strokeWidth={stroke} r={normalizedRadius} cx={radius} cy={radius} />
              <circle stroke="#22c55e" fill="transparent" strokeWidth={stroke} strokeLinecap="round" r={normalizedRadius} cx={radius} cy={radius} strokeDasharray={circumference} strokeDashoffset={strokeDashoffset} transform={`rotate(-90 ${radius} ${radius})`} />
            </svg>
            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center text-2xl font-bold text-gray-700 leading-none">
              {completion}%
            </div>
          </div>
          <h2 className="text-3xl font-bold text-green-700">User Profile</h2>
          <p className="text-gray-500 mt-1">{completion === 100 ? "Profile Complete" : "Profile Incomplete"}</p>
        </div>

        {/* Profile Form */}
        {editMode ? (
          <div className="space-y-4">
            {["name","email","phone","address"].map((field) => (
              <div key={field}>
                <label className="block text-gray-700 font-medium mb-1">{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                <input
                  type={field === "email" ? "email" : "text"}
                  value={user[field] || ""}
                  onChange={(e) => setUser({ ...user, [field]: e.target.value })}
                  readOnly={field === "email"}
                  placeholder={field === "address" ? "Enter Address" : ""}
                  className={`w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 ${field === "email" ? "bg-gray-100" : "focus:ring-green-500"}`}
                />
              </div>
            ))}
            <div className="flex justify-between items-center mt-6">
              <button onClick={() => setEditMode(false)} className="px-5 py-3 bg-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-400 transition">Cancel</button>
              <button onClick={handleSave} className="px-5 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition">Save Changes</button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {["name","email","phone","address"].map((field) => (
              <div key={field} className="flex justify-between border-b pb-2">
                <span className="font-medium text-gray-700">{field.charAt(0).toUpperCase() + field.slice(1)}:</span>
                <span>{user[field] || (field === "email" ? "" : "Not Provided")}</span>
              </div>
            ))}
            <div className="text-center mt-6">
              <button onClick={() => setEditMode(true)} className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition">Edit Profile</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
