"use client"
import { X } from "lucide-react";

const Modal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="relative w-full max-w-md bg-white rounded-2xl shadow-xl p-6 text-center">
          {/* Close Icon */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
  
          {/* Modal Content */}
          <h2 className="text-2xl font-semibold text-gray-800">Coming Soon</h2>
          <p className="text-gray-500 mt-2">This feature is under development.</p>
  
          {/* Optional Button */}
          <button
            onClick={onClose}
            className="mt-6 px-6 py-2 bg-[#189BA3] text-white font-medium rounded-lg hover:bg-teal-700 transition"
          >
            Close
          </button>
        </div>
      </div>
    );
  };
  export default Modal;