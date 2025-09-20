import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSignup = (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // Save user to localStorage (simple persistence)
    localStorage.setItem("user", JSON.stringify({ ...form, address: "" }));

    alert(`Signup successful: ${form.email}`);
    navigate("/dashboard");
  };

  return (
    <div
      className="flex justify-end items-center h-[100vh] pr-10 bg-cover bg-center"
      style={{ backgroundImage: "url('/images/signup-bg.png')" }}
    >
      <form
        className="bg-white bg-opacity-90 p-10 rounded-lg shadow-lg w-96 md:w-[28rem]"
        onSubmit={handleSignup}
      >
        <h2 className="text-3xl font-bold mb-6 text-green-700 text-center">
          Signup
        </h2>
        <input
          type="text"
          name="name"
          placeholder="Name"
          className="w-full p-3 mb-4 border rounded text-lg"
          value={form.name}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full p-3 mb-4 border rounded text-lg"
          value={form.email}
          onChange={handleChange}
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          className="w-full p-3 mb-4 border rounded text-lg"
          value={form.phone}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full p-3 mb-4 border rounded text-lg"
          value={form.password}
          onChange={handleChange}
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          className="w-full p-3 mb-4 border rounded text-lg"
          value={form.confirmPassword}
          onChange={handleChange}
        />
        <button
          type="submit"
          className="w-full bg-green-700 text-white p-3 rounded-lg hover:bg-green-800 mb-4 text-lg"
        >
          Signup
        </button>
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="w-full bg-gray-300 text-black p-3 rounded-lg hover:bg-gray-400 text-lg"
        >
          ← Back
        </button>
      </form>
    </div>
  );
}
