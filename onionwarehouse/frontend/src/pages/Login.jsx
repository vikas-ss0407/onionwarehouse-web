import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api/auth";
import Cookies from "js-cookie";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password });
      if (res.user) {
        Cookies.set("user", JSON.stringify(res.user), { expires: 1 }); 
        alert("Logged in successfully ✅");
        navigate("/dashboard");
      } else {
        alert(res.message || "Login failed");
      }
    } catch (err) {
      alert("Server error, try again");
      console.error(err);
    }
  };

  return (
    <div
      className="flex justify-between items-center h-[100vh] px-10 bg-cover bg-center"
      style={{ backgroundImage: "url('/images/login2.jpeg')" }}
    >
      
      <div className="hidden md:block w-1/2 p-12 bg-gray-900 bg-opacity-40 rounded-xl text-gray-100">
        <h1 className="text-5xl font-bold mb-6">Welcome Back</h1>
        <p className="text-xl leading-relaxed">
          Log in to access your warehouse dashboard and manage inventory and sales billing efficiently.
        </p>
      </div>

      
      <form
        className="bg-white bg-opacity-90 p-10 rounded-lg shadow-lg w-96 md:w-[28rem]"
        onSubmit={handleLogin}
      >
        <h2 className="text-3xl font-bold mb-6 text-green-700 text-center">
          Login
        </h2>
        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 mb-4 border rounded text-lg"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 mb-4 border rounded text-lg"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="w-full bg-green-700 text-white p-3 rounded-lg hover:bg-green-800 mb-4 text-lg"
        >
          Login
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
