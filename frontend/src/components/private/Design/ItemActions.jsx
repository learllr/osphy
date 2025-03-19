import { Button } from "@/components/ui/button";
import React from "react";

export default function ItemActions({
  onAdd,
  onSave,
  onCancel,
  isLoading,
  isEditing,
}) {
  return (
    isEditing && (
      <div className="mt-4 flex flex-col gap-2">
        <Button onClick={onAdd} variant="outline" disabled={isLoading}>
          Ajouter
        </Button>
        <div className="flex gap-2">
          <Button onClick={onSave} disabled={isLoading}>
            {isLoading ? "Enregistrement..." : "Enregistrer"}
          </Button>
          <Button variant="secondary" onClick={onCancel} disabled={isLoading}>
            Annuler
          </Button>
        </div>
      </div>
    )
  );
}
