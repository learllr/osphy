import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import axios from "../../../../axiosConfig.js";
import DetailItem from "../../Design/DetailItem.jsx";
import Section from "../../Design/Section.jsx";

export default function GynecologyInfoSection({
  patientGynecology,
  patientId,
}) {
  const defaultGynecologyData = {
    period: null,
    menopause: null,
    contraception: null,
    followUp: null,
  };

  const [editableGynecology, setEditableGynecology] = useState(
    patientGynecology || defaultGynecologyData
  );
  const [backupGynecology, setBackupGynecology] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setEditableGynecology(patientGynecology || defaultGynecologyData);
  }, [patientGynecology]);

  const handleFieldChange = (field, value) => {
    setEditableGynecology((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSaveChanges = async () => {
    setLoading(true);
    try {
      await axios.put(`/patient/${patientId}/gynecology`, editableGynecology);
      setIsEditing(false);
    } catch (error) {
      console.error(
        "Erreur lors de la mise à jour des données gynécologiques :",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = () => {
    setBackupGynecology(editableGynecology);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setEditableGynecology(backupGynecology);
    setIsEditing(false);
  };

  const gynecologyFields = [
    { label: "Règles", field: "period" },
    { label: "Ménopause", field: "menopause" },
    {
      label: "Contraception",
      field: "contraception",
      options: [
        "Aucune",
        "Stérilet",
        "Stérilet cuivre",
        "Stérilet hormonal",
        "Pilule",
        "Pilule (PC ou COC)",
        "Pilule (PP)",
        "Ogino",
        "Implant",
        "Patch",
        "Anneau",
        "Préservatif",
        "Retrait",
        "Autre",
      ],
    },
    { label: "Suivi gynécologique", field: "followUp" },
  ];

  const formatValue = (value) =>
    typeof value === "boolean"
      ? value
        ? "Oui"
        : "Non"
      : value || "Non renseigné";

  const parseValue = (field, value) => {
    if (field === "contraception") {
      return value;
    }
    return value === "Oui" ? true : value === "Non" ? false : null;
  };

  return (
    <Section title="Gynécologie" showCount={false} onEdit={handleEditClick}>
      {gynecologyFields.map(({ label, field, options }) => (
        <DetailItem
          key={field}
          label={label}
          value={formatValue(editableGynecology[field])}
          isEditing={isEditing}
          onChange={(newValue) =>
            handleFieldChange(field, parseValue(field, newValue))
          }
          type="select"
          options={options || ["Oui", "Non"]}
        />
      ))}

      {isEditing && (
        <div className="flex gap-4 mt-4">
          <Button onClick={handleSaveChanges} disabled={loading}>
            {loading ? "Enregistrement..." : "Enregistrer"}
          </Button>
          <Button onClick={handleCancel} variant="secondary" disabled={loading}>
            Annuler
          </Button>
        </div>
      )}
    </Section>
  );
}
