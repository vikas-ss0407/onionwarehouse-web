import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    alert(`Login attempt: ${email}`);
    navigate("/dashboard"); 
  };

  return (
    <div
      className="flex justify-end items-center h-[100vh] pr-10 bg-cover bg-center"
      style={{ backgroundImage: "url('/images/login.jpg')" }}
    >
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

        {/* Back Button */}
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
