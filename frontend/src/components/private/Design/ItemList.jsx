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
}) {
  return (
    <div>
      {items.length > 0 ? (
        <ul>
          {items.map((item) => (
            <ItemLine
              key={item.id || `temp-${Math.random()}`}
              item={item}
              onChange={onChange}
              onDelete={onDelete}
              isEditing={isEditing}
            />
          ))}
        </ul>
      ) : (
        <p>Aucun élément enregistré.</p>
      )}

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
