import { Button } from "@/components/ui/button";
import React from "react";
import DetailItem from "../../Design/DetailItem.jsx";
import Section from "../../Design/Section.jsx";

export default function GynecologyInfoSection({
  patientGynecology,
  editedGynecology,
  editing,
  onToggleEdit,
  onSave,
  onInputChange,
}) {
  return (
    <Section title="Gynécologie" showCount={false} onEdit={onToggleEdit}>
      {editing ? (
        <div className="space-y-4">
          <DetailItem
            label="Règles"
            value={editedGynecology?.period}
            isEditing={editing}
            onChange={(value) => onInputChange("gynecology.period", value)}
            type="select"
            options={[
              { label: "Oui", value: "Oui" },
              { label: "Non", value: "Non" },
            ]}
          />
          <DetailItem
            label="Ménopause"
            value={editedGynecology?.menopause}
            isEditing={editing}
            onChange={(value) => onInputChange("gynecology.menopause", value)}
            type="select"
            options={[
              { label: "Oui", value: "Oui" },
              { label: "Non", value: "Non" },
            ]}
          />
          <DetailItem
            label="Contraception"
            value={editedGynecology?.contraception}
            isEditing={editing}
            onChange={(value) =>
              onInputChange("gynecology.contraception", value)
            }
          />
        </div>
      ) : (
        <div>
          <DetailItem
            label="Règles"
            value={patientGynecology?.period ? "Oui" : "Non"}
          />
          <DetailItem
            label="Ménopause"
            value={patientGynecology?.menopause ? "Oui" : "Non"}
          />
          <DetailItem
            label="Contraception"
            value={patientGynecology?.contraception}
          />
        </div>
      )}
      {editing && (
        <div className="flex gap-4 mt-4">
          <Button onClick={onSave}>Enregistrer</Button>
          <Button onClick={onToggleEdit} variant="secondary">
            Annuler
          </Button>
        </div>
      )}
    </Section>
  );
}
