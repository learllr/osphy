import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { gynecologyFields } from "../../../../../../shared/constants/fields.js";
import axios from "../../../../axiosConfig.js";
import DetailItem from "../../Design/DetailItem.jsx";
import Section from "../../Design/Section.jsx";

export default function GynecologyInfoSection({
  patientId,
  patientGynecology,
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

  const formatValue = (value) =>
    typeof value === "boolean" ? (value ? "Oui" : "Non") : value || "-";

  const parseValue = (field, value) => {
    if (field === "contraception") {
      return value;
    }
    return value === "Oui" ? true : value === "Non" ? false : null;
  };

  return (
    <Section
      title="Gynécologie"
      showCount={false}
      onEdit={handleEditClick}
      hideEditButton={isEditing}
    >
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
