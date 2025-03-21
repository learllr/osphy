import React, { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import ConfirmDialog from "../../dialogs/ConfirmDialog.jsx";

export default function Section({
  title,
  children,
  onEdit,
  onDelete,
  showCount = true,
  count,
  hideEditButton = false,
  confirmDialogTitle,
}) {
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-300 shadow-sm relative text-sm">
      <div className="flex justify-between items-center pb-3 border-b border-primary">
        <h2 className="text-lg font-semibold text-gray-800">
          {title}{" "}
          {showCount && count > 0 && (
            <span className="text-gray-500">({count})</span>
          )}
        </h2>
        <div className="flex items-center space-x-2">
          {!hideEditButton && (
            <button
              onClick={onEdit}
              className="text-primary hover:text-primary/80 p-2 rounded-md transition-all duration-200 focus:ring focus:ring-primary/20"
              aria-label={`Modifier ${title}`}
            >
              <FaEdit size={16} />
            </button>
          )}
          {onDelete && (
            <button
              onClick={() => setIsConfirmDialogOpen(true)}
              className="text-red-600 hover:text-red-500 p-2 rounded-md transition-all duration-200 focus:ring focus:ring-red-200"
              aria-label={`Supprimer ${title}`}
            >
              <FaTrash size={16} />
            </button>
          )}
        </div>
      </div>

      <div className="mt-4">{children}</div>

      {onDelete && (
        <ConfirmDialog
          isOpen={isConfirmDialogOpen}
          onClose={() => setIsConfirmDialogOpen(false)}
          onConfirm={() => {
            onDelete();
            setIsConfirmDialogOpen(false);
          }}
          title="Confirmer la suppression"
          message={confirmDialogTitle}
          confirmText="Supprimer"
          cancelText="Annuler"
        />
      )}
    </div>
  );
}
