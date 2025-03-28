import { Pencil, Trash2, X } from "lucide-react";
import React, { useState } from "react";
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
  onClose,
}) {
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const hasConsultation = title.toLowerCase().includes("consultation");

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-300 shadow-sm relative text-sm">
      <div className="flex justify-between items-center pb-3 border-b border-primary">
        <h2 className="text-lg font-semibold text-gray-800">
          {title}
          {showCount && count > 0 && (
            <span className="text-gray-500 ml-2">({count})</span>
          )}
        </h2>

        <div className="flex items-center gap-2">
          {!hideEditButton && (
            <button
              onClick={onEdit}
              className="flex items-center gap-1 px-2 py-1 text-sm font-medium border border-blue-600 text-blue-600 rounded-md hover:bg-blue-600 hover:text-white transition"
              aria-label={`Modifier ${title}`}
            >
              <Pencil size={16} /> Modifier
            </button>
          )}
          {onDelete && (
            <button
              onClick={() => setIsConfirmDialogOpen(true)}
              className="flex items-center gap-1 px-2 py-1 text-sm font-medium border border-red-500 text-red-600 rounded-md hover:bg-red-500 hover:text-white transition"
              aria-label={`Supprimer ${title}`}
            >
              <Trash2 size={16} /> Supprimer
            </button>
          )}
          {hasConsultation && (
            <button
              className="text-gray-600 ml-3"
              aria-label="Fermer"
              title="Fermer"
              onClick={() => onClose?.()}
            >
              <X size={18} />
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
