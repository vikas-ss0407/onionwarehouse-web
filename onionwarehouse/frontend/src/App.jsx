import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Navbar from "./components/Navbar";

import ManageShops from "./pages/ManageShops";
import ManageBoxes from "./pages/ManageBoxes"; 
import Billing from "./pages/Billing";
import PrintBill from "./pages/PrintBill";

export default function App() {
  const location = useLocation();
  const showNavbar =
    location.pathname.startsWith("/dashboard") ||
    location.pathname.startsWith("/manage-shops") ||
    location.pathname.startsWith("/manage-boxes") || 
    location.pathname.startsWith("/billing") ||
    location.pathname.startsWith("/print-bill");

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
        <Route path="/billing" element={<Billing />} />
        <Route path="/print-bill" element={<PrintBill />} />
      </Routes>
    </div>
  );
}
