import { Button } from "@/components/ui/button";
import React from "react";
import DetailItem from "../../Design/DetailItem.jsx";
import Section from "../../Design/Section.jsx";

export default function SleepInfoSection({
  patientSleep,
  editedSleep,
  editing,
  onToggleEdit,
  onSave,
  onInputChange,
}) {
  return (
    <Section title="Sommeil" showCount={false} onEdit={onToggleEdit}>
      {editing ? (
        <>
          <DetailItem
            label="Qualité du sommeil"
            value={editedSleep?.sleepQuality}
            isEditing={editing}
            type="select"
            options={[
              { value: "Bon", label: "Bon" },
              { value: "Moyen", label: "Moyen" },
              { value: "Mauvais", label: "Mauvais" },
            ]}
            onChange={(value) => onInputChange("sleep.sleepQuality", value)}
          />
          <DetailItem
            label="Durée du sommeil"
            value={editedSleep?.sleepDuration}
            isEditing={editing}
            type="select"
            options={[
              { value: "<5h", label: "<5h" },
              { value: "5-6h", label: "5-6h" },
              { value: "7-8h", label: "7-8h" },
              { value: ">8h", label: ">8h" },
            ]}
            onChange={(value) => onInputChange("sleep.sleepDuration", value)}
          />
          <DetailItem
            label="Sommeil réparateur"
            value={
              editedSleep?.restorativeSleep === true
                ? "Oui"
                : editedSleep?.restorativeSleep === false
                ? "Non"
                : ""
            }
            isEditing={editing}
            type="select"
            options={[
              { value: true, label: "Oui" },
              { value: false, label: "Non" },
            ]}
            onChange={(value) =>
              onInputChange(
                "sleep.restorativeSleep",
                value === "true" ? true : false
              )
            }
          />
          <div className="flex gap-4 mt-4">
            <Button onClick={onSave}>Enregistrer</Button>
            <Button onClick={onToggleEdit} variant="secondary">
              Annuler
            </Button>
          </div>
        </>
      ) : (
        <>
          <DetailItem
            label="Qualité du sommeil"
            value={patientSleep?.sleepQuality || "Non renseigné"}
          />
          <DetailItem
            label="Durée du sommeil"
            value={patientSleep?.sleepDuration || "Non renseigné"}
          />
          <DetailItem
            label="Sommeil réparateur"
            value={
              patientSleep?.restorativeSleep === true
                ? "Oui"
                : patientSleep?.restorativeSleep === false
                ? "Non"
                : "Non renseigné"
            }
          />
        </>
      )}
    </Section>
  );
}
