import React from "react";
import { FaEdit } from "react-icons/fa";

export default function Section({ title, children, onEdit }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md relative">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-700">{title}</h2>
        <button
          onClick={onEdit}
          className="text-lime-500 hover:text-lime-700 transition-colors"
          aria-label={`Modifier ${title}`}
        >
          <FaEdit size={20} />
        </button>
      </div>
      {children}
    </div>
  );
}
