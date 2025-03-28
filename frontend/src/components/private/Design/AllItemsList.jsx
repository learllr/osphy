import React, { useState } from "react";
import { useMutation } from "react-query";
import axios from "../../../axiosConfig.js";
import ItemList from "./ItemList.jsx";

export default function AllItemsList({
  initialItems,
  apiBaseUrl,
  isEditing,
  onEdit,
  fieldOptions = [],
  updateCount,
  columnLabels,
}) {
  const [items, setItems] = useState(initialItems || []);
  const [initialItemsState, setInitialItemsState] = useState(
    initialItems || []
  );
  const [addedItems, setAddedItems] = useState([]);
  const [updatedItems, setUpdatedItems] = useState([]);
  const [deletedItems, setDeletedItems] = useState([]);

  const updateItemMutation = useMutation((item) =>
    axios.put(`${apiBaseUrl}/${item.id}`, item)
  );

  const addItemMutation = useMutation((item) => axios.post(apiBaseUrl, item));

  const deleteItemMutation = useMutation((id) =>
    axios.delete(`${apiBaseUrl}/${id}`)
  );

  const isLoading =
    updateItemMutation.isLoading ||
    addItemMutation.isLoading ||
    deleteItemMutation.isLoading;

  const handleAddItem = (category = null) => {
    if (items.length === 0 && !columnLabels) return;

    const keys =
      items.length > 0 ? Object.keys(items[0]) : Object.keys(columnLabels);

    const newItem = keys.reduce((acc, key) => {
      if (key === "id") {
        acc[key] = `temp-${Date.now()}`;
      } else if (key === "category") {
        acc[key] = category;
      } else {
        acc[key] = "";
      }
      return acc;
    }, {});

    setItems((prev) => [...prev, newItem]);
    setAddedItems((prev) => [...prev, newItem]);
    if (updateCount) updateCount(items.length + 1);
  };

  const handleUpdateItem = (id, field, value) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );

    if (addedItems.some((item) => item.id === id)) {
      setAddedItems((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, [field]: value } : item
        )
      );
    } else {
      setUpdatedItems((prev) => {
        const existingIndex = prev.findIndex((item) => item.id === id);
        if (existingIndex !== -1) {
          const updatedList = [...prev];
          updatedList[existingIndex] = {
            ...updatedList[existingIndex],
            [field]: value,
          };
          return updatedList;
        } else {
          return String(id).startsWith("temp-")
            ? prev
            : [...prev, { id, [field]: value }];
        }
      });
    }
  };

  const handleDeleteItem = (id) => {
    if (addedItems.find((item) => item.id === id)) {
      setAddedItems((prev) => prev.filter((item) => item.id !== id));
      setItems((prev) => prev.filter((item) => item.id !== id));
    } else {
      setDeletedItems((prev) => [...prev, id]);
      setItems((prev) => prev.filter((item) => item.id !== id));
    }
    if (updateCount) updateCount(items.length - 1);
  };

  const handleSave = async () => {
    try {
      await Promise.all(
        addedItems.map(async (item) => {
          const response = await addItemMutation.mutateAsync(item);
          setItems((prev) =>
            prev.map((itm) => (itm.id === item.id ? response.data : itm))
          );
        })
      );

      await Promise.all(updatedItems.map(updateItemMutation.mutateAsync));
      await Promise.all(deletedItems.map(deleteItemMutation.mutateAsync));

      setAddedItems([]);
      setUpdatedItems([]);
      setDeletedItems([]);
      if (updateCount) updateCount(items.length);
      onEdit();
    } catch (error) {
      console.error("Erreur lors de l'enregistrement :", error);
    }
  };

  const handleCancel = () => {
    setItems([...initialItemsState]);
    setAddedItems([]);
    setUpdatedItems([]);
    setDeletedItems([]);
    if (updateCount) updateCount(initialItemsState.length);
    onEdit();
  };

  const columnKeys =
    items.length > 0
      ? Object.keys(items[0]).filter(
          (key) => key !== "id" && (isEditing || key !== "category")
        )
      : [];

  return (
    <div>
      <ItemList
        items={items}
        columnLabels={columnLabels}
        onChange={handleUpdateItem}
        onDelete={handleDeleteItem}
        onAdd={handleAddItem}
        onSave={handleSave}
        onCancel={handleCancel}
        isEditing={isEditing}
        isLoading={isLoading}
        fieldOptions={fieldOptions}
      />
    </div>
  );
}
