import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { patientInfosFields } from "../../../../../../shared/constants/fields.js";
import { formatDate } from "../../../../../../shared/utils/dateUtils.js";
import axios from "../../../../axiosConfig.js";
import DetailItem from "../../Design/DetailItem.jsx";
import Section from "../../Design/Section.jsx";

export default function GeneralInfoSection({ patient }) {
  const formatPatientData = (patientData) => ({
    ...patientData,
    birthDate: patientData?.birthDate ? formatDate(patientData.birthDate) : "",
  });

  const [editablePatient, setEditablePatient] = useState(
    formatPatientData(patient)
  );

  const [backupPatient, setBackupPatient] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const queryClient = useQueryClient();

  useEffect(() => {
    setEditablePatient(formatPatientData(patient));
  }, [patient]);

  const handleFieldChange = (field, value) => {
    setEditablePatient((prev) => ({
      ...prev,
      [field]:
        field === "birthDate" && !isNaN(Date.parse(value))
          ? formatDate(value)
          : value,
    }));
  };

  const updatePatientMutation = useMutation(
    async (updatedPatient) => {
      const response = await axios.put(
        `/patient/${updatedPatient.id}`,
        updatedPatient
      );
      return response.data;
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries("patients");
        setEditablePatient(formatPatientData(data));
        setIsEditing(false);
      },
    }
  );

  const handleSaveChanges = () => {
    updatePatientMutation.mutate(editablePatient);
  };

  const handleCancel = () => {
    setEditablePatient(backupPatient);
    setIsEditing(false);
  };

  const handleEditClick = () => {
    setBackupPatient(editablePatient);
    setIsEditing(true);
  };

  return (
    <Section
      title="Informations générales"
      showCount={false}
      onEdit={handleEditClick}
      hideEditButton={isEditing}
    >
      {patientInfosFields.map(({ label, field, type, options }) => {
        const value = editablePatient[field] ?? "-";

        return (
          <DetailItem
            key={field}
            label={label}
            value={value}
            isEditing={isEditing}
            onChange={(newValue) => handleFieldChange(field, newValue)}
            type={type}
            options={options}
            allowEmptyOption={false}
          />
        );
      })}

      {isEditing && (
        <div className="flex gap-4 mt-4">
          <Button
            onClick={handleSaveChanges}
            disabled={updatePatientMutation.isLoading}
          >
            {updatePatientMutation.isLoading
              ? "Enregistrement..."
              : "Enregistrer"}
          </Button>
          <Button onClick={handleCancel} variant="secondary">
            Annuler
          </Button>
        </div>
      )}
    </Section>
  );
}
