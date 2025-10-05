import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Navbar from "./components/Navbar";

import ManageShops from "./pages/ManageShops";
import ManageBoxes from "./pages/ManageBoxes"; 
import AddBox from "./pages/AddBox";          // ✅ import AddBox
import Billing from "./pages/Billing";
import PrintBill from "./pages/PrintBill";
import ManageSensors from "./pages/ManageSensors";

export default function App() {
  const location = useLocation();
  const showNavbar =
    location.pathname.startsWith("/dashboard") ||
    location.pathname.startsWith("/manage-shops") ||
    location.pathname.startsWith("/manage-boxes") || 
    location.pathname.startsWith("/addbox") ||       // ✅ show navbar on AddBox page
    location.pathname.startsWith("/billing") ||
    location.pathname.startsWith("/print-bill") ||
    location.pathname.startsWith("/manage-sensors");

  return (
    <div className="min-h-screen bg-gray-100">
      {showNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/manage-shops" element={<ManageShops />} />
        <Route path="/manage-boxes" element={<ManageBoxes />} />
        <Route path="/addbox" element={<AddBox />} />   {/* ✅ AddBox route */}
        <Route path="/billing" element={<Billing />} />
        <Route path="/print-bill" element={<PrintBill />} />
        <Route path="/manage-sensors" element={<ManageSensors />} />
      </Routes>
    </div>
  );
}
