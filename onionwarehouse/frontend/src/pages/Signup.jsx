import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "../api/auth";

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

  const validatePassword = (password) => {
    const regex =
      /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{5,}$/;
    return regex.test(password);
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    if (!validatePassword(form.password)) {
      alert(
        "Password must contain:\n- At least 1 uppercase letter\n- At least 1 number\n- At least 1 special character\n- Minimum length 5"
      );
      return;
    }

    try {
      const res = await signup({
        name: form.name,
        email: form.email,
        phone: form.phone,
        password: form.password,
      });

      if (res.message === "User already exists") {
        alert("Email already exists ❌");
        return;
      }

      if (res.user) {
        alert("Account created successfully ✅");
        navigate("/"); 
      } else {
        alert(res.message || "Signup failed");
      }
    } catch (err) {
      alert("Server error, try again");
      console.error(err);
    }
  };

  return (
    <div
      className="flex justify-between items-center h-[100vh] px-10 bg-cover bg-center"
      style={{ backgroundImage: "url('/images/signup2.jpeg')" }}
    >
      
      <div className="hidden md:block w-1/2 p-10 bg-gray-800 bg-opacity-40 rounded-lg text-gray-100">
        <h1 className="text-4xl font-bold mb-6">Create Your Account</h1>
        <p className="mb-4 text-lg text-gray-200">
          Join to efficiently manage your warehouse by monitoring environmental conditions and managing inventory and billing. Please follow the
          guidelines below:
        </p>
        <ul className="space-y-3 text-base">
          <li>✔ Use a valid email (must be unique)</li>
          <li>✔ Provide your real phone number</li>
          <li>✔ Password must include:</li>
          <ul className="ml-5 list-disc space-y-1">
            <li>At least 1 uppercase letter</li>
            <li>At least 1 number</li>
            <li>At least 1 special character (!@#$%^&*)</li>
            <li>Minimum length of 5 characters</li>
          </ul>
        </ul>
      </div>

      
      <form
        className="bg-white bg-opacity-90 p-10 rounded-lg shadow-lg w-96 md:w-[28rem]"
        onSubmit={handleSignup}
      >
        <h2 className="text-3xl font-bold mb-6 text-blue-700 text-center">
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
          className="w-full bg-blue-700 text-white p-3 rounded-lg hover:bg-blue-800 mb-4 text-lg"
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
