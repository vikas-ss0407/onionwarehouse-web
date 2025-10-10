import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getBoxes, updateBox, deleteBox, createBox } from "../api/boxes";
import BoxList from "../components/BoxList";
import BoxForm from "../components/BoxForm";
import { motion, AnimatePresence } from "framer-motion";

// --- Modal Component (Kept Separately for Clarity) ---
const Modal = ({ isOpen, onClose, children, title }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-xl shadow-2xl w-full max-w-lg p-8 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold mb-4 text-indigo-700 border-b pb-2">{title}</h2>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-900 text-3xl font-light leading-none"
          aria-label="Close"
        >
          &times;
        </button>
        {children}
      </motion.div>
    </div>
  );
};

// --- Main ManageBoxes Component ---

export default function ManageBoxes() {
  const [boxes, setBoxes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBox, setEditingBox] = useState(null); 

  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // --- Notification Logic ---
  const triggerSuccessNotification = (message) => {
    setSuccessMessage(message);
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      setSuccessMessage("");
    }, 3000);
  };

  // --- Modal Handlers ---
  const openAddModal = () => {
    setEditingBox(null);
    setIsModalOpen(true);
  };

  const openEditModal = (box) => {
    setEditingBox(box);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingBox(null);
  };

  // Fetch all boxes on component mount
  useEffect(() => {
    const fetchBoxes = async () => {
      try {
        const boxesData = await getBoxes();
        setBoxes(Array.isArray(boxesData) ? boxesData : []);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBoxes();
  }, []);

  // --- Unified Save Handler (Add or Edit) ---
  const handleSaveBox = async (boxData) => {
    closeModal(); 

    if (editingBox && editingBox._id) {
      try {
        const updatedBox = await updateBox(editingBox._id, boxData);
        if (updatedBox) {
          setBoxes(boxes.map((b) => (b._id === updatedBox._id ? updatedBox : b)));
          triggerSuccessNotification(`Box ${updatedBox.boxNumber} updated successfully!`);
        } else {
          alert("Failed to update box.");
        }
      } catch (error) {
        alert("Error updating box. Check console.");
        console.error(error);
      }
    } else {
      try {
        const newBox = await createBox(boxData);
        if (newBox && !newBox.message) {
          setBoxes([...boxes, newBox]);
          triggerSuccessNotification(`Box ${newBox.boxNumber} added successfully!`);
        } else {
          alert(newBox.message || "Failed to add box.");
        }
      } catch (error) {
        alert(error?.response?.data?.message || "Failed to add box.");
        console.error(error);
      }
    }
  };


  // Handle removing a box
  const handleRemoveBox = async (id) => {
    if (window.confirm("Are you sure you want to delete this box?")) {
      try {
        const res = await deleteBox(id);
        if (res) {
          setBoxes(boxes.filter((b) => b._id !== id));
          triggerSuccessNotification("Box deleted successfully!"); 
        } else {
          alert("Failed to delete box.");
        }
      } catch (err) {
        console.error(err);
        alert("Error deleting box.");
      }
    }
  };

  // Handle updating alert status
  const handleUpdateAlert = async (boxId, alertDays, action) => {
    try {
      const res = await fetch(`/api/boxes/${boxId}/alert`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ alertDays, action }),
      });
      const updatedBox = await res.json();

      setBoxes((prevBoxes) =>
        prevBoxes.map((b) => {
          if (b._id === boxId) {
            const updatedAlerts = b.maintenanceAlerts.map((a) =>
              a.days === alertDays
                ? {
                  ...a,
                  status: action,
                  completedAt: action === "completed" ? new Date() : a.completedAt,
                  notifyDate: action === "remind" ? new Date(new Date().getTime() + 24 * 60 * 60 * 1000) : a.notifyDate
                }
                : a
            );
            triggerSuccessNotification(`Maintenance marked as ${action === "completed" ? "completed" : "set to remind"}!`);
            return { ...b, maintenanceAlerts: updatedAlerts };
          }
          return b;
        })
      );
    } catch (err) {
      console.error(err);
      alert("Failed to update alert");
    }
  };

  // --- Success Notification Component ---
  const SuccessNotification = () => (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.3 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
      className="fixed bottom-5 right-5 z-[101] flex items-center bg-green-500 text-white text-lg font-semibold px-6 py-3 rounded-lg shadow-2xl border-2 border-green-700"
    >
      ✅ {successMessage}
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10">
      
        {/*
            FIXED STICKY HEADER
            - sticky top-0 ensures it sticks flush to the top.
            - -mx-6 md:-mx-10 cancels out the parent's padding, allowing the background to span the full content width.
            - Removed pt-4 to close the transparent gap.
        */}
      <div className="
          sticky top-0 z-50 
          -mx-6 md:-mx-10 
          mb-4 
      ">
            <div className="
                bg-gray-50/90 backdrop-blur-sm 
                py-4 border-b-4 border-indigo-100/70 
                px-6 md:px-10
            ">
                {/* Content inside the sticky bar is limited to the max-w-7xl width and centered */}
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <h2 className="text-4xl font-extrabold text-gray-900">📦 Manage Inventory Boxes</h2>

                    {/* Add Box button */}
                    <button
                        onClick={openAddModal}
                        className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl text-lg font-semibold shadow-xl transition duration-300 transform hover:scale-[1.02]"
                    >
                        + Add New Box
                    </button>
                </div>
            </div>
        </div>

      {/* FIXED MAIN CONTENT CONTAINER
            - w-full ensures it fills the horizontal space left by the sticky bar, allowing BoxList to expand.
        */}
      <div className="w-full">
        
        {/* Loading State */}
        {isLoading ? (
          <div className="text-center py-20 text-indigo-600">
            <svg className="animate-spin h-8 w-8 mx-auto mb-3" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Loading inventory data...
          </div>
        ) : (
           <div className="bg-white p-6 rounded-xl shadow-2xl border border-gray-100">
            <BoxList
              boxes={boxes}
              onEdit={openEditModal}
              onRemove={handleRemoveBox}
              onUpdateAlert={handleUpdateAlert}
            />
          </div>
        )}
      </div>

      {/* MODAL FORM */}
      <AnimatePresence>
        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          title={editingBox ? 'Edit Box Details' : 'Add New Box'}
        >
          <BoxForm
            initialData={editingBox}
            onSave={handleSaveBox}
            onCancel={closeModal}
          />
        </Modal>
      </AnimatePresence>

      {/* SUCCESS NOTIFICATION */}
      <AnimatePresence>
        {showSuccess && <SuccessNotification />}
      </AnimatePresence>
    </div>
  );
}