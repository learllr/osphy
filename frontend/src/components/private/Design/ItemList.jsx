import React from "react";
import ItemActions from "./ItemActions.jsx";
import ItemLine from "./ItemLine.jsx";

export default function ItemList({
  items,
  onChange,
  onDelete,
  onAdd,
  onSave,
  onCancel,
  isEditing,
  isLoading,
  categoryOptions,
}) {
  const hasCategory = items.some((item) => item.category);

  const groupedItems = hasCategory
    ? items.reduce((acc, item) => {
        const category = item.category || "Autres";
        if (!acc[category]) acc[category] = [];
        acc[category].push(item);
        return acc;
      }, {})
    : { Tous: items };

  return (
    <div>
      {Object.entries(groupedItems).map(([category, categoryItems]) => (
        <div key={category} className="mb-2">
          {!isEditing && hasCategory && (
            <h3 className="text-lg font-semibold mb-2">{category}</h3>
          )}
          <ul>
            {categoryItems.map((item) => (
              <ItemLine
                key={item.id || `temp-${Math.random()}`}
                item={item}
                onChange={onChange}
                onDelete={onDelete}
                isEditing={isEditing}
                categoryOptions={categoryOptions}
              />
            ))}
          </ul>
        </div>
      ))}

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
