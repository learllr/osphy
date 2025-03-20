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
    <div className="bg-white p-6 rounded-md border border-gray-200 relative text-sm">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-700 border-b">
          {title} {showCount && `(${count})`}
        </h2>
        <div className="flex items-center space-x-2">
          {!hideEditButton && (
            <button
              onClick={onEdit}
              className="text-primary bg-white hover:bg-white hover:text-primary/90"
              aria-label={`Modifier ${title}`}
            >
              <FaEdit size={16} />
            </button>
          )}
          {onDelete && (
            <button
              onClick={() => setIsConfirmDialogOpen(true)}
              className="text-red-600 bg-white hover:bg-white hover:text-red-500"
              aria-label={`Supprimer ${title}`}
            >
              <FaTrash size={16} />
            </button>
          )}
        </div>
      </div>
      {children}

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
