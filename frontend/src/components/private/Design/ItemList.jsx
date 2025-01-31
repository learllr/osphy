import React from "react";
import ItemLine from "./ItemLine.jsx";
import ItemActions from "./ItemActions.jsx";

export default function ItemList({
  items,
  fields,
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
              key={item.id}
              item={item}
              fields={fields}
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
