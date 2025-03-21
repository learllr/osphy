import { Trash2 } from "lucide-react";
import React from "react";
import ItemActions from "./ItemActions.jsx";

export default function ItemList({
  items,
  columnLabels,
  onChange,
  onDelete,
  onAdd,
  onSave,
  onCancel,
  isEditing,
  isLoading,
}) {
  const hasCategory = items.some((item) => item.category);

  const columnKeys = hasCategory
    ? Object.keys(columnLabels).filter((key) => key !== "category")
    : Object.keys(columnLabels);

  if (isEditing) {
    columnKeys.push("actions");
  }

  const groupedItems = hasCategory
    ? items.reduce((acc, item) => {
        const category = item.category || "Autres";
        if (!acc[category]) acc[category] = [];
        acc[category].push(item);
        return acc;
      }, {})
    : { "": items };

  return (
    <div className="overflow-x-auto w-full">
      <table className="w-full text-sm text-gray-700 border-collapse">
        <thead className="bg-gray-100 text-gray-600 uppercase text-xs font-semibold tracking-wider">
          <tr>
            {columnKeys.map((key) => (
              <th
                key={key}
                className="px-4 py-3 text-left border-b border-gray-300"
              >
                {columnLabels[key] || "Actions"}
              </th>
            ))}
          </tr>
        </thead>
        {Object.entries(groupedItems).map(([category, categoryItems]) => (
          <tbody key={category} className="border-t border-gray-300">
            {hasCategory && category && (
              <tr>
                <td
                  colSpan={columnKeys.length}
                  className="px-4 py-3 text-lg font-semibold text-primary bg-gray-50 text-center"
                >
                  {category}
                </td>
              </tr>
            )}
            {categoryItems.map((item, index) => (
              <tr key={item.id || `temp-${index}`} className="bg-white">
                {columnKeys.map((key) => (
                  <td
                    key={key}
                    className="px-4 py-3 border-b border-gray-200 text-left"
                  >
                    {isEditing && key !== "actions" ? (
                      <input
                        type="text"
                        value={item[key] || ""}
                        onChange={(e) => onChange(item.id, key, e.target.value)}
                        className="w-full px-2 py-1 border rounded"
                      />
                    ) : key !== "actions" ? (
                      item[key]
                    ) : (
                      <button
                        onClick={() => onDelete(item.id)}
                        className="text-red-500 hover:bg-red-50 bg-gray-50 rounded-full p-2"
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        ))}
      </table>
      <ItemActions
        onAdd={onAdd}
        onSave={onSave}
        onCancel={onCancel}
        isLoading={isLoading}
        isEditing={isEditing}
      />
    </div>
  );
}
