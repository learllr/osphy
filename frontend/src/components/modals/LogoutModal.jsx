import React from "react";

export default function LogoutModal({ isVisible, onClose, onConfirm }) {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-[450px]">
        <p className="text-lg font-semibold mb-4 text-zinc-800">Êtes-vous sûr ?</p>
        <div className="border-t border-gray-300 mb-6"></div>
        <p className="text-black mb-8">
          Vous devrez vous reconnecter pour accéder à votre compte.
        </p>
        <div className="flex justify-end space-x-3 text-sm">
          <button
            className="px-4 py-2 border border-gray-300 text-black rounded-3xl hover:bg-gray-100"
            onClick={onClose}
          >
            Annuler
          </button>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded-3xl hover:bg-red-600"
            onClick={onConfirm}
          >
            Se déconnecter
          </button>
        </div>
      </div>
    </div>
  );
}