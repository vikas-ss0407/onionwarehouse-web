import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Navbar from "./components/Navbar";

import ManageShops from "./pages/ManageShops";
import AddBox from "./pages/AddBox";
import UpdateBox from "./pages/UpdateBox";
import Billing from "./pages/Billing";
import PrintBill from "./pages/PrintBill";
import ViewStocks from "./pages/ViewStocks";

export default function App() {
  const location = useLocation();
  const showNavbar =
    location.pathname.startsWith("/dashboard") ||
    location.pathname.startsWith("/manage-shops") ||
    location.pathname.startsWith("/add-box") ||
    location.pathname.startsWith("/update-box") ||
    location.pathname.startsWith("/billing") ||
    location.pathname.startsWith("/view-stocks") ||
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
        <Route path="/add-box" element={<AddBox />} />
        <Route path="/update-box" element={<UpdateBox />} />
        <Route path="/billing" element={<Billing />} />
        <Route path="/print-bill" element={<PrintBill />} /> 
        <Route path="/view-stocks" element={<ViewStocks />} />
      </Routes>
    </div>
  );
}
