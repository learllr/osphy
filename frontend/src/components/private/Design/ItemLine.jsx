import React from "react";
import { FaTrash } from "react-icons/fa";

export default function ItemLine({
  item,
  onChange,
  onDelete,
  isEditing,
  fieldOptions = {},
}) {
  const keys = Object.keys(item).filter((key) => key !== "id");
  const keysWithoutCategory = keys.filter((key) => key !== "category");

  return (
    <li className="flex items-center justify-between mb-2 space-x-2">
      {isEditing
        ? keys.map((key) =>
            fieldOptions[key] ? (
              <select
                key={`${item.id}-${key}`}
                value={item[key] || ""}
                onChange={(e) => onChange(item.id, key, e.target.value)}
                className="flex-1 border border-gray-300 rounded-md shadow-sm px-2 py-1"
              >
                {fieldOptions[key].map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            ) : (
              <input
                key={`${item.id}-${key}`}
                type="text"
                value={item[key] || ""}
                onChange={(e) => onChange(item.id, key, e.target.value)}
                className="flex-1 border border-gray-300 rounded-md shadow-sm px-2 py-1"
              />
            )
          )
        : keysWithoutCategory.map((key, index) => {
            const isFirst = index === 0;
            const isLast = index === keysWithoutCategory.length - 1;
            let displayValue = item[key];

            if (typeof displayValue === "boolean") {
              displayValue = displayValue ? "Oui" : "Non";
            }

            return (
              <span
                key={`${item.id}-${key}`}
                className={`flex-1 ${
                  isFirst
                    ? "font-bold"
                    : isLast
                    ? "text-gray-500"
                    : "text-gray-800"
                }`}
              >
                {displayValue || "-"}
              </span>
            );
          })}

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
