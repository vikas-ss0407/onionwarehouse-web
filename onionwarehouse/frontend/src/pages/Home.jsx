import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/images/home1.jpg')" }}
    >
      <div className="bg-white bg-opacity-80 p-8 rounded-lg max-w-2xl w-full text-center transform -translate-y-8">
       
        <h1 className="text-4xl md:text-5xl font-bold text-red-700 mb-4">
          Onion Track
        </h1>

    
        <p className="text-gray-800 text-lg md:text-xl mb-6">
          Efficiently monitor, manage, and track all onion storage boxes.  
          Add, update, delete boxes and generate billing information easily.  
          Ensure freshness, quality, and smooth operations in your warehouse.
        </p>

      
        <div className="flex justify-center gap-4">
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
    </div>
  );
}
