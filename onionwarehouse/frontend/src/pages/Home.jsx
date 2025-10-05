import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div
      className="relative flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/images/home1.jpg')" }}
    >
      {/* Overlay for better text contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40" />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 bg-white/80 backdrop-blur-md p-10 rounded-2xl shadow-2xl max-w-3xl w-[90%] text-center"
      >
        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-5xl md:text-6xl font-extrabold text-red-700 mb-4 tracking-wide"
        >
          Onion Track
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-gray-800 text-lg md:text-xl leading-relaxed mb-8"
        >
          Smart IoT-based monitoring for onion warehouses track temperature, humidity, and light exposure in real-time.  
          Manage boxes, control ventilation automatically, and ensure maximum shelf life and quality.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex justify-center gap-6 flex-wrap"
        >
          <button
            onClick={() => navigate("/login")}
            className="bg-green-700 hover:bg-green-800 text-white px-8 py-3 rounded-xl text-lg font-medium shadow-lg hover:scale-105 transition-transform duration-300"
          >
            Login
          </button>
          <button
            onClick={() => navigate("/signup")}
            className="bg-blue-700 hover:bg-blue-800 text-white px-8 py-3 rounded-xl text-lg font-medium shadow-lg hover:scale-105 transition-transform duration-300"
          >
            Signup
          </button>
        </motion.div>

        {/* Small footer line */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-8 text-sm text-gray-600"
        >
          {/* © {new Date().getFullYear()} Onion Track Smart Warehouse Automation */}
        </motion.p>
      </motion.div>
    </div>
  );
}
