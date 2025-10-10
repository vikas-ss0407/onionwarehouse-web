import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

// --- Custom Animation Components ---

const DispImages = () => {
    const images = [
        "/images/5.jpg",
        "/images/dis.jpeg",
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
        initial: { 
            rotateY: -180, 
            opacity: 0, 
            scale: 0.7, 
            filter: 'brightness(0.5)', 
            boxShadow: '0px 0px 0px rgba(0,0,0,0)' 
        },
        animate: { 
            rotateY: 0, 
            opacity: 1, 
            scale: 1, 
            filter: 'brightness(1)', 
            boxShadow: '10px 10px 30px rgba(0,0,0,0.3)' 
        },
        exit: { 
            rotateY: 180, 
            opacity: 0, 
            scale: 0.7, 
            filter: 'brightness(0.5)', 
            boxShadow: '0px 0px 0px rgba(0,0,0,0)' 
        },
    };

    const isAlertState = currentImageIndex < 3; 
    const ringColorClass = isAlertState ? 'ring-red-500' : 'ring-green-500';

    return (
        <motion.div 
            className={`relative w-full max-w-[550px] h-[350px] flex items-center justify-center bg-white rounded-3xl shadow-2xl overflow-hidden ring-4 transition-all duration-700 ease-in-out ${ringColorClass}`}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
        >
            <AnimatePresence mode="wait">
                <motion.img
                    key={currentImageIndex}
                    src={images[currentImageIndex]}
                    alt={`ShelfPro System Image ${currentImageIndex + 1}`}
                    variants={flipVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={{ duration: 1.0, ease: "easeInOut" }} 
                    className="absolute inset-0 w-full h-full object-cover rounded-3xl"
                    style={{ transformStyle: "preserve-3d", backfaceVisibility: "hidden" }} 
                />
            </AnimatePresence>
        </motion.div>
    );
};

// Animations removed as requested, leaving the components as placeholders
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
            {/* Empty content */}
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
            {/* Empty content */}
        </motion.div>
    </div>
);

// --- Home Component ---
export default function Home() {
    const navigate = useNavigate();
    const [activeSection, setActiveSection] = useState('home'); 

    const sectionIds = ['home', 'about', 'features', 'contact'];

    // --- EFFECT HOOK FOR INTERSECTION OBSERVER ---
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            {
                root: null,
                rootMargin: '-30% 0px -60% 0px', 
                threshold: 0, 
            }
        );

        sectionIds.forEach(id => {
            const section = document.getElementById(id);
            if (section) {
                observer.observe(section);
            }
        });

        return () => {
            sectionIds.forEach(id => {
                const section = document.getElementById(id);
                if (section) {
                    observer.unobserve(section);
                }
            });
        };
    }, []); 

    const getNavClass = (sectionId) => {
        const baseClass = "transition-colors duration-300 font-medium text-lg";
        const inactiveClass = "text-gray-700 hover:text-indigo-600";
        const activeClass = "text-indigo-600 font-bold border-b-2 border-indigo-600 pb-1"; 

        return `${baseClass} ${activeSection === sectionId ? activeClass : inactiveClass}`;
    };

    const scrollToSection = (id) => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth" });
    };

    // --- Data Definitions (Unchanged) ---

    const workflowSteps = [
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

    // --- Animation Variants ---

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1, 
                delayChildren: 0.2,   
            },
        },
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0, scale: 0.95 },
        visible: {
            y: 0,
            opacity: 1,
            scale: 1,
            transition: { type: "spring", stiffness: 100, damping: 10 }
        },
    };

    const textVariants = {
        hidden: { y: 30, opacity: 0 },
        visible: { 
            y: 0, 
            opacity: 1, 
            transition: { type: "spring", stiffness: 100, damping: 10 } 
        },
    };

    const buttonVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { 
            y: 0, 
            opacity: 1, 
            transition: { type: "spring", stiffness: 100, damping: 10, delay: 0.8 } 
        },
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
                        <button onClick={() => scrollToSection("home")} className={getNavClass("home")}>Home</button>
                        <button onClick={() => scrollToSection("about")} className={getNavClass("about")}>About</button> 
                        <button onClick={() => scrollToSection("features")} className={getNavClass("features")}>Features</button>
                        <button onClick={() => scrollToSection("contact")} className={getNavClass("contact")}>Contact Us</button> 
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section id="home" className="relative pt-40 pb-20 min-h-screen flex items-center bg-gray-50 overflow-hidden">
                <motion.div 
                    className="max-w-full mx-auto px-10 flex flex-col md:flex-row items-center justify-between w-full"
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants} 
                >
                    <div className="z-10 text-center md:text-left md:w-1/2 mb-12 md:mb-0 md:pl-10">
                        <motion.h1 
                            className="text-7xl font-extrabold text-gray-900 mb-6 leading-tight tracking-tighter"
                            variants={textVariants} 
                        >
                            Smart Storage. <span className="text-indigo-600">Fresh Onions for Longer Time.</span>
                        </motion.h1>
                        <motion.p 
                            className="text-gray-600 text-2xl mb-10 font-light max-w-xl"
                            variants={textVariants} 
                            transition={{ delay: 0.2 }} 
                        >
                            ShelfPro keeps onions fresh longer by controlling heat, airflow, and light in storage rooms.
                        </motion.p>
                        <motion.div 
                            className="flex justify-center md:justify-start gap-8 flex-wrap"
                            variants={containerVariants} 
                        >
                            {/* UPDATED: "Get Started" navigates to /signup */}
                            <motion.button 
                                onClick={() => navigate("/signup")} 
                                className="bg-indigo-700 hover:bg-indigo-800 text-white px-12 py-4 rounded-full text-xl font-bold shadow-2xl transition-all duration-300 transform hover:scale-105"
                                variants={buttonVariants} 
                                transition={{ delay: 0.6 }}
                            >
                                Get Started
                            </motion.button>
                            
                            {/* NEW: Login Button */}
                            <motion.button 
                                onClick={() => navigate("/login")} 
                                className="bg-white hover:bg-gray-100 text-indigo-700 border-2 border-indigo-700 px-12 py-4 rounded-full text-xl font-bold shadow-2xl transition-all duration-300 transform hover:scale-105"
                                variants={buttonVariants} 
                                transition={{ delay: 0.7 }}
                            >
                                Login
                            </motion.button>

                            {/* UPDATED: "Learn More" scrolls to #features */}
                            <motion.button 
                                onClick={() => scrollToSection("features")} 
                                className="bg-amber-500 hover:bg-amber-600 text-white px-12 py-4 rounded-full text-xl font-bold shadow-2xl transition-all duration-300 transform hover:scale-105"
                                variants={buttonVariants} 
                                transition={{ delay: 0.8 }}
                            >
                                Learn More
                            </motion.button>
                        </motion.div>
                    </div>
                    <div className="md:w-1/2 flex justify-center z-20 relative p-4">
                        <DispImages />
                    </div>
                </motion.div>
            </section>

            {/* About ShelfPro & Workflow Section (Combined) */}
            <section id="about" className="py-24 bg-gray-50 px-6 border-t border-gray-100">
                <motion.div 
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }} 
                    variants={containerVariants}
                    className="max-w-7xl mx-auto"
                >
                    <motion.h2 variants={textVariants} className="text-5xl font-extrabold text-gray-900 text-center mb-6">About ShelfPro: Our Vision & Workflow</motion.h2>
                    <motion.p variants={textVariants} transition={{ delay: 0.1 }} className="text-gray-700 text-xl leading-relaxed text-center mb-16 max-w-4xl mx-auto">
                        ShelfPro helps farmers and warehouses reduce onion waste by creating the right climate for storage — keeping onions strong, fresh, and ready for market anytime. Our system integrates smart technology with practical storage solutions.
                    </motion.p>

                    <motion.h3 variants={textVariants} transition={{ delay: 0.2 }} className="text-4xl font-bold text-gray-800 text-center mb-10">System Workflow</motion.h3>
                    <motion.div variants={containerVariants} className="grid md:grid-cols-4 gap-8 text-center">
                        {workflowSteps.map((step) => (
                            <motion.div 
                                key={step.step} 
                                variants={itemVariants} 
                                whileHover={{ scale: 1.05, boxShadow: "0px 15px 30px rgba(0,0,0,0.1)", backgroundColor: 'rgba(238, 242, 255, 1)' }} 
                                className="bg-white p-6 rounded-3xl shadow-2xl border-t-4 border-indigo-500 transition-colors duration-300"
                            >
                                <div className="text-4xl font-bold text-indigo-600 mb-4">{step.step}</div>
                                <h4 className="text-2xl font-bold mb-2">{step.title}</h4>
                                <p className="text-gray-600">{step.description}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-24 bg-white px-6 border-t border-b border-gray-100">
                <motion.div 
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }} 
                    variants={containerVariants}
                    className="max-w-7xl mx-auto"
                >
                    <motion.h2 variants={textVariants} className="text-5xl font-extrabold text-gray-900 text-center mb-16">Main Features of ShelfPro</motion.h2>
                    <motion.div variants={containerVariants} className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {features.map((feature, index) => (
                            <motion.div 
                                key={index} 
                                variants={itemVariants} 
                                whileHover={{ 
                                    scale: 1.03, 
                                    boxShadow: "0px 10px 25px rgba(0,0,0,0.1)", 
                                    backgroundColor: 'rgba(240, 245, 255, 1)',
                                    // Direct control over ring style for clearer outline
                                    borderColor: 'rgba(129, 140, 248, 0.5)', 
                                    borderWidth: '2px' // Increased border for visibility
                                }} 
                                className="relative flex flex-col items-center text-center p-8 bg-gray-50 rounded-3xl shadow-2xl ring-2 ring-indigo-50 border-2 border-indigo-100 transition-all duration-300"
                            >
                                <motion.div 
                                    className="text-5xl mb-6 p-5 bg-indigo-50 rounded-full shadow-lg"
                                    whileHover={{ scale: 1.1, rotate: 5, transition: { type: "spring", stiffness: 300 } }} 
                                >
                                    {feature.icon}
                                </motion.div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                                <p className="text-gray-600 text-lg">{feature.description}</p>
                                {feature.animation === 'airflow' && <AirflowIndicator />}
                                {feature.animation === 'notification' && <LightAlert />}
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>
            </section>

            {/* Contact Us Section */}
            <section id="contact" className="py-24 bg-indigo-700 text-white text-center px-6">
                <motion.div 
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }} 
                    variants={containerVariants}
                    className="max-w-3xl mx-auto"
                >
                    <motion.h2 variants={textVariants} className="text-5xl font-extrabold mb-6">Ready to Optimize Your Storage?</motion.h2>
                    <motion.p variants={textVariants} transition={{ delay: 0.1 }} className="text-indigo-100 text-xl leading-relaxed mb-10">
                        Connect with us to discuss your warehouse needs, request a system demo, or get a personalized quote for implementing ShelfPro Systems.
                    </motion.p>
                    <motion.button 
                        className="bg-amber-400 hover:bg-amber-500 text-indigo-900 px-12 py-5 rounded-full text-xl font-bold shadow-2xl transition-all duration-300 transform hover:scale-105"
                        variants={buttonVariants}
                        transition={{ delay: 0.3 }}
                    >
                        Contact Sales Team
                    </motion.button>
                    <motion.div 
                        variants={containerVariants} 
                        className="mt-8 text-indigo-300 text-lg"
                        transition={{ staggerChildren: 0.1, delayChildren: 0.4 }}
                    >
                        <motion.p variants={textVariants}>📧 support@shelfpro.com</motion.p>
                        <motion.p variants={textVariants}>📞 +1 (555) ShelfPro</motion.p>
                    </motion.div>
                </motion.div>
            </section>
        </div>
    );
}