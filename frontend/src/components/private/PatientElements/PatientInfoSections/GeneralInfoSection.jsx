import { Button } from "@/components/ui/button";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import axios from "../../../../axiosConfig.js";
import DetailItem from "../../Design/DetailItem.jsx";
import Section from "../../Design/Section.jsx";

export default function GeneralInfoSection({ patient }) {
  const [editablePatient, setEditablePatient] = useState(patient);
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
      onSuccess: () => {
        queryClient.invalidateQueries("patients");
        setIsEditing(false);
      },
      onError: (error) => {
        console.error("Erreur lors de la mise à jour du patient:", error);
      },
    }
  );

  const handleSaveChanges = () => {
    updatePatientMutation.mutate(editablePatient);
  };

  return (
    <Section
      title="Informations générales"
      showCount={false}
      onEdit={() => setIsEditing(!isEditing)}
    >
      {[
        { label: "Nom", field: "lastName", type: "text" },
        { label: "Prénom", field: "firstName", type: "text" },
        {
          label: "Date de naissance",
          field: "birthDate",
          type: "date",
          format: (value) =>
            isEditing
              ? dayjs(value).format("YYYY-MM-DD")
              : dayjs(value).format("DD/MM/YYYY"),
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
      ].map(({ label, field, type, options, format }) => (
        <DetailItem
          key={field}
          label={label}
          value={
            isEditing
              ? editablePatient[field] ?? ""
              : format
              ? format(editablePatient[field])
              : editablePatient[field]
          }
          isEditing={isEditing}
          onChange={(value) => handleFieldChange(field, value)}
          type={type}
          options={options}
        />
      ))}

      {isEditing && (
        <div className="flex gap-4 mt-4">
          <Button
            onClick={handleSaveChanges}
            className="bg-green-500 text-white"
            disabled={updatePatientMutation.isLoading}
          >
            {updatePatientMutation.isLoading
              ? "Enregistrement..."
              : "Enregistrer"}
          </Button>
          <Button
            onClick={() => {
              setEditablePatient(patient);
              setIsEditing(false);
            }}
            className="bg-gray-300 text-gray-700"
          >
            Annuler
          </Button>
        </div>
      )}
    </Section>
  );
}
