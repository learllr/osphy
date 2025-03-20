import React, { useEffect, useState } from "react";
import { FaExclamationTriangle } from "react-icons/fa";

export default function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Confirmer",
  cancelText = "Annuler",
}) {
  const [visible, setVisible] = useState(false);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setVisible(true);
      setTimeout(() => setAnimate(true), 10);
    } else {
      setAnimate(false);
      setTimeout(() => setVisible(false), 300);
    }
  }, [isOpen]);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 transition-opacity duration-300 ${
        animate ? "opacity-100" : "opacity-0"
      }`}
      onClick={onClose}
    >
      <div
        className={`bg-white p-6 rounded-lg shadow-xl max-w-md w-full text-center relative transition-all duration-300 transform ${
          animate ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <FaExclamationTriangle className="text-red-500 text-4xl mx-auto mb-3" />
        <h2 className="text-lg font-semibold text-gray-800 mb-2">{title}</h2>
        <p className="text-gray-600 text-sm mb-6">{message}</p>

        <div className="flex justify-center space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 bg-gray-200 rounded-lg hover:bg-gray-100 transition"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className="px-6 py-2 text-white bg-red-600 rounded-lg hover:bg-red-500 transition transform hover:scale-105"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
