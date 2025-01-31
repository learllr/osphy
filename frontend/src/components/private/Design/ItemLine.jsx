import React from "react";
import { FaTrash } from "react-icons/fa";

export default function ItemLine({
  item,
  fields,
  onChange,
  onDelete,
  isEditing,
}) {
  const values = Object.values(item);

  return (
    <li className="flex items-center mb-2 space-x-2">
      {isEditing ? (
        fields.map(({ key, type }, index) => (
          <input
            key={key}
            type={type}
            value={values[index + 1] || ""}
            onChange={(e) => onChange(item.id, key, e.target.value)}
            className="flex-1 border border-gray-300 rounded-md shadow-sm px-2 py-1"
          />
        ))
      ) : (
        <>
          <span className="font-bold text-gray-800">
            {values[1] || "Non renseigné"}
          </span>
          <span className="italic text-gray-500">
            {values[2] || "Non renseigné"}
          </span>
        </>
      )}

      {isEditing && (
        <button
          onClick={() => onDelete(item.id)}
          className="ml-2 text-red-500 hover:text-red-700"
          aria-label="Supprimer"
        >
          <FaTrash size={16} />
        </button>
      )}
    </li>
  );
}
