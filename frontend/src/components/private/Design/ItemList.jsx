import { Button } from "@/components/ui/button";
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

  const fixedCategories = ["Traumatique", "Chirurgical", "Médical"];

  let groupedItems = { "": items };

  if (hasCategory) {
    groupedItems = {};

    for (const category of fixedCategories) {
      groupedItems[category] = [];
    }

    for (const item of items) {
      const category = item.category || "Autres";
      if (!groupedItems[category]) groupedItems[category] = [];
      groupedItems[category].push(item);
    }
  }

  const handleChange = (id, key, value) => {
    onChange(id, key, value);
  };

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
        {Object.entries(groupedItems)
          .filter(([_, items]) => isEditing || items.length > 0)
          .map(([category, categoryItems]) => (
            <tbody key={category} className="border-t border-gray-300">
              {hasCategory && category && (
                <tr className="relative">
                  <td
                    colSpan={columnKeys.length}
                    className="px-4 py-4 text-lg font-semibold text-primary bg-gray-50 text-center border-b relative"
                  >
                    {category}
                    {isEditing && (
                      <div className="absolute right-4 top-3">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onAdd(category)}
                          disabled={isLoading}
                        >
                          Ajouter
                        </Button>
                      </div>
                    )}
                  </td>
                </tr>
              )}
              {categoryItems.length === 0 && isEditing && (
                <tr>
                  <td
                    colSpan={columnKeys.length}
                    className="px-4 py-3 text-center text-gray-400 italic"
                  >
                    Aucun élément
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
                        typeof item[key] === "boolean" ? (
                          <select
                            value={item[key] === true ? "true" : "false"}
                            onChange={(e) =>
                              handleChange(
                                item.id,
                                key,
                                e.target.value === "true"
                              )
                            }
                            className="w-full px-2 py-1 border rounded"
                          >
                            <option value="true">Oui</option>
                            <option value="false">Non</option>
                          </select>
                        ) : (
                          <input
                            type="text"
                            value={item[key] ?? ""}
                            onChange={(e) =>
                              handleChange(item.id, key, e.target.value)
                            }
                            className="w-full px-2 py-1 border rounded"
                          />
                        )
                      ) : key !== "actions" ? (
                        typeof item[key] === "boolean" ? (
                          item[key] ? (
                            "Oui"
                          ) : (
                            "Non"
                          )
                        ) : (
                          item[key]
                        )
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
        addButtonVisible={!hasCategory}
      />
    </div>
  );
}
