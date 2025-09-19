import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const images = [
    "/images/bamboo.png",
    "/images/box store.png",
    "/images/img.png",
  ];

  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col md:flex-row items-center justify-between min-h-[90vh] p-6 gap-6">
      
      {/* Left Side: Description */}
      <div className="md:w-1/2 text-center md:text-left">
        <h1 className="text-4xl md:text-5xl font-bold text-green-700 mb-4">
          Onion Warehouse Monitoring
        </h1>
        <p className="text-gray-600 text-lg md:text-xl mb-6">
          Efficiently monitor, manage, and track all onion storage boxes.  
          Add, update, delete boxes and generate billing information easily.  
          Ensure freshness, quality, and smooth operations in your warehouse.
        </p>

        {/* Login / Signup Buttons */}
        <div className="flex justify-center md:justify-start gap-4">
          <button
            onClick={() => navigate("/login")}
            className="bg-green-700 text-white px-6 py-2 rounded hover:bg-green-800"
          >
            Login
          </button>
          <button
            onClick={() => navigate("/signup")}
            className="bg-blue-700 text-white px-6 py-2 rounded hover:bg-blue-800"
          >
            Signup
          </button>
        </div>
      </div>

      {/* Right Side: Image Container */}
      <div className="md:w-1/2 flex justify-center">
        <div className="w-full h-96 md:h-[28rem] rounded overflow-hidden shadow-lg">
          <img
            src={images[currentImage]}
            alt="Onion Warehouse"
            className="w-full h-full object-cover transition-all duration-700"
          />
        </div>
      </div>

    </div>
  );
}
