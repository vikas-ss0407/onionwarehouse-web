import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

// --- Custom Animation Components ---
const DispImages = () => {
    const images = [
        "/images/bamboo.png",
        "/images/black mold.jpg",
        "/images/dis.jpg",
        "/images/darkroom.jpg",
        "/images/bamboo box.jpeg",
        "/images/noti.jpg"
    ];
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) =>
                (prevIndex + 1) % images.length
            );
        }, 4000);
        return () => clearInterval(interval);
    }, [images.length]);

    const flipVariants = {
        initial: { rotateY: -90, opacity: 0, scale: 0.8 },
        animate: { rotateY: 0, opacity: 1, scale: 1 },
        exit: { rotateY: 90, opacity: 0, scale: 0.8 },
    };

    const isAlertState = currentImageIndex < 3;
    const ringColorClass = isAlertState ? 'ring-red-500' : 'ring-green-500';

    return (
        <div className={`relative w-full max-w-[550px] h-[350px] flex items-center justify-center bg-white rounded-3xl shadow-2xl overflow-hidden ring-4 transition-all duration-700 ease-in-out ${ringColorClass}`}>
            <AnimatePresence mode="wait">
                <motion.img
                    key={currentImageIndex}
                    src={images[currentImageIndex]}
                    alt={`ShelfPro System Image ${currentImageIndex + 1}`}
                    variants={flipVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={{ duration: 0.7, ease: "easeInOut" }}
                    className="absolute inset-0 w-full h-full object-cover rounded-3xl"
                    style={{ transformStyle: "preserve-3d" }}
                />
            </AnimatePresence>
        </div>
    );
};

// Animations for features
const AirflowIndicator = () => (
    <div className="absolute bottom-4 left-4 p-1">
        <motion.div
            className="text-3xl text-green-500"
            animate={{
                x: [0, 100, 0],
                y: [0, -30, 0],
                opacity: [0, 1, 0.5, 0]
            }}
            transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear"
            }}
        >
        </motion.div>
    </div>
);

const LightAlert = () => (
    <div className="absolute top-1 right-1 p-1">
        <motion.div
            className="text-4xl"
            initial={{ scale: 0, opacity: 0 }}
            animate={{
                scale: [0, 1.2, 1],
                opacity: [0, 1, 0.5, 1],
                y: [0, -5, 0]
            }}
            transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatDelay: 2,
                ease: "easeInOut",
            }}
        >
            ⚠️
        </motion.div>
    </div>
);

const DashboardPulse = () => (
    <div className="absolute top-1 right-1 p-1">
        <motion.div
            className="w-8 h-8 bg-amber-500 rounded-full shadow-lg shadow-amber-300"
            animate={{
                scale: [1, 1.2, 1],
                opacity: [1, 0.5, 1],
            }}
            transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
            }}
        />
    </div>
);

// --- Home Component ---
export default function Home() {
    const navigate = useNavigate();

    // --- Flow Section (How ShelfPro Works) ---
    const flowSteps = [
        { 
            step: 1, 
            title: "User Login / Signup", 
            description: "Access the ShelfPro system securely by logging in or signing up for a new account." 
        },
        { 
            step: 2, 
            title: "Dashboard View", 
            description: "View real-time warehouse conditions, including temperature, humidity, and light readings." 
        },
        { 
            step: 3, 
            title: "Receive Alerts", 
            description: "Get notifications at 15, 30, and 60 days based on storage time to prevent spoilage." 
        },
        { 
            step: 4, 
            title: "Inventory & Billing", 
            description: "Track stock, generate bills, and manage warehouse operations efficiently." 
        },
    ];

    // --- Features Section (Main Features) ---
    const features = [
        { 
            title: "Bamboo Ventilated Crates", 
            description: "Crates designed for optimal airflow, keeping onions fresh longer.", 
            icon: "🪵",
            animation: "airflow" 
        },
        { 
            title: "Automatic Exhaust Fans", 
            description: "Fans turn on/off automatically to control temperature and humidity inside the storage.", 
            icon: "🌀",
            animation: "airflow" 
        },
        { 
            title: "Onion Age Alerts", 
            description: "Receive notifications at 15, 30, and 60 days based on storage time to prevent spoilage.", 
            icon: "⚠️", 
            animation: "notification" 
        }
    ];

    const scrollToSection = (id) => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <div className="font-sans relative overflow-x-hidden bg-white text-gray-900">
            {/* Navigation */}
            <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm z-50 shadow-2xl border-b border-gray-100">
                <div className="max-w-full mx-auto px-10 py-5 flex justify-between items-center">
                    <div
                        className="text-4xl font-black cursor-pointer tracking-wider text-indigo-700 hover:text-indigo-900 transition-colors duration-300"
                        onClick={() => scrollToSection("home")}
                    >
                        ShelfPro Systems
                    </div>
                    <div className="space-x-10 text-lg font-medium text-gray-700 hidden md:flex">
                        <button onClick={() => scrollToSection("home")} className="hover:text-indigo-600">Home</button>
                        <button onClick={() => scrollToSection("flow")} className="hover:text-indigo-600">Flow</button>
                        <button onClick={() => scrollToSection("features")} className="hover:text-indigo-600">Features</button>
                        <button onClick={() => scrollToSection("about")} className="hover:text-indigo-600">About</button>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section id="home" className="relative pt-40 pb-20 min-h-screen flex items-center bg-gray-50 overflow-hidden">
                <motion.div className="max-w-full mx-auto px-10 flex flex-col md:flex-row items-center justify-between w-full"
                    initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 1 }}
                >
                    <div className="z-10 text-center md:text-left md:w-1/2 mb-12 md:mb-0 md:pl-10">
                        <h1 className="text-7xl font-extrabold text-gray-900 mb-6 leading-tight tracking-tighter">
                            Smart Storage. <span className="text-indigo-600">Fresh Onions for Longer Time.</span>
                        </h1>
                        <p className="text-gray-600 text-2xl mb-10 font-light max-w-xl">
                            ShelfPro keeps onions fresh longer by controlling heat, airflow, and light in storage rooms.
                        </p>
                        <div className="flex justify-center md:justify-start gap-8 flex-wrap">
                            <button onClick={() => navigate("/login")} className="bg-indigo-700 hover:bg-indigo-800 text-white px-12 py-4 rounded-full text-xl font-bold shadow-2xl transition-all duration-300 transform hover:scale-105">
                                Access Dashboard
                            </button>
                            <button onClick={() => navigate("/signup")} className="bg-amber-500 hover:bg-amber-600 text-white px-12 py-4 rounded-full text-xl font-bold shadow-2xl transition-all duration-300 transform hover:scale-105">
                                Get Started
                            </button>
                        </div>
                    </div>
                    <div className="md:w-1/2 flex justify-center z-20 relative p-4">
                        <DispImages />
                    </div>
                </motion.div>
            </section>

            {/* Flow Section */}
            <section id="flow" className="py-24 bg-gray-50 px-6">
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-7xl mx-auto">
                    <h2 className="text-5xl font-extrabold text-gray-900 text-center mb-16">How ShelfPro Works</h2>
                    <div className="grid md:grid-cols-4 gap-8 text-center">
                        {flowSteps.map((step) => (
                            <motion.div key={step.step} whileHover={{ scale: 1.05 }} className="bg-white p-6 rounded-3xl shadow-2xl border-t-4 border-indigo-500">
                                <div className="text-4xl font-bold text-indigo-600 mb-4">{step.step}</div>
                                <h3 className="text-2xl font-bold mb-2">{step.title}</h3>
                                <p className="text-gray-600">{step.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-24 bg-white px-6 border-t border-b border-gray-100">
                <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-7xl mx-auto">
                    <h2 className="text-5xl font-extrabold text-gray-900 text-center mb-16">Main Features of ShelfPro</h2>
                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {features.map((feature, index) => (
                            <motion.div key={index} whileHover={{ scale: 1.05 }} className="relative flex flex-col items-center text-center p-8 bg-gray-50 rounded-3xl shadow-2xl ring-2 ring-indigo-50 hover:ring-indigo-200 transition-all duration-300">
                                <div className="text-5xl mb-6 p-5 bg-indigo-50 rounded-full shadow-lg">{feature.icon}</div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                                <p className="text-gray-600 text-lg">{feature.description}</p>
                                {feature.animation === 'airflow' && <AirflowIndicator />}
                                {feature.animation === 'notification' && <LightAlert />}
                                {feature.animation === 'dashboardPulse' && <DashboardPulse />}
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </section>

            {/* About Section */}
            <section id="about" className="py-24 bg-gray-50 text-center px-6 border-t border-gray-100">
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-3xl mx-auto">
                    <h2 className="text-5xl font-extrabold text-gray-900 mb-6">Our Vision: Longer Life for Every Onion</h2>
                    <p className="text-gray-700 text-xl leading-relaxed mb-10">
                        ShelfPro helps farmers and warehouses reduce onion waste by creating the right climate for storage — keeping onions strong, fresh, and ready for market anytime.
                    </p>
                    <button className="bg-indigo-700 hover:bg-indigo-800 text-white px-12 py-5 rounded-full text-xl font-bold shadow-2xl transition-all duration-300 transform hover:scale-105">
                        Request Setup
                    </button>
                </motion.div>
            </section>
        </div>
    );
}
