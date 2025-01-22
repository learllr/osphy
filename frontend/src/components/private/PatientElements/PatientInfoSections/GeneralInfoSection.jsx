import { Button } from "@/components/ui/button";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import axios from "../../../../axiosConfig.js";
import DetailItem from "../../Design/DetailItem.jsx";
import Section from "../../Design/Section.jsx";

export default function GeneralInfoSection({ patient }) {
  const [editablePatient, setEditablePatient] = useState(patient);
  const [backupPatient, setBackupPatient] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const queryClient = useQueryClient();

  useEffect(() => {
    setEditablePatient(patient);
  }, [patient]);

  const handleFieldChange = (field, value) => {
    setEditablePatient((prev) => ({
      ...prev,
      [field]: value,
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
        setEditablePatient(data);
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

  const patientFields = [
    { label: "Nom", field: "lastName", type: "text" },
    { label: "Prénom", field: "firstName", type: "text" },
    {
      label: "Date de naissance",
      field: "birthDate",
      type: "date",
      format: (value) =>
        value
          ? isEditing
            ? dayjs(value).format("YYYY-MM-DD")
            : dayjs(value).format("DD/MM/YYYY")
          : "",
    },
    {
      label: "Sexe",
      field: "gender",
      type: "select",
      options: ["Homme", "Femme"],
    },
    { label: "Adresse", field: "address", type: "text" },
    { label: "Téléphone", field: "mobilePhone", type: "text" },
    { label: "Email", field: "email", type: "email" },
    { label: "Profession", field: "occupation", type: "text" },
    { label: "Taille", field: "height", type: "number", min: 0, max: 300 },
    { label: "Poids", field: "weight", type: "number", min: 0, max: 300 },
    {
      label: "Latéralité",
      field: "handedness",
      type: "select",
      options: ["Droitier", "Gaucher", "Ambidextre"],
    },
    { label: "Autres informations", field: "additionalInfo", type: "text" },
  ];

  return (
    <Section
      title="Informations générales"
      showCount={false}
      onEdit={handleEditClick}
    >
      {patientFields.map(({ label, field, type, options, format }) => {
        const value = editablePatient[field] ?? "Non renseigné";
        return (
          <DetailItem
            key={field}
            label={label}
            value={
              isEditing
                ? format
                  ? format(value)
                  : value
                : format
                ? format(value)
                : value
            }
            isEditing={isEditing}
            onChange={(newValue) => handleFieldChange(field, newValue)}
            type={type}
            options={options}
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
