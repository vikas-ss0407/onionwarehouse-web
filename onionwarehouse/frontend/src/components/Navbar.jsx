import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";

export default function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [open, setOpen] = useState(false);

  if (!user) return null;

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <nav className="bg-green-700 text-white p-4 flex justify-end items-center shadow-md relative">
      <div className="relative">
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-2"
        >
          <FaUserCircle size={28} />
          <span>{user.name}</span>
        </button>

        {open && (
          <div className="absolute right-0 mt-2 bg-white text-black rounded shadow-md w-40 z-50">
            <button
              onClick={() => navigate("/profile")}
              className="w-full text-left px-4 py-2 hover:bg-gray-200"
            >
              Profile
            </button>

            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 hover:bg-gray-200"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
