import { Button } from "@/components/ui/button";
import dayjs from "dayjs";
import React, { useEffect, useRef, useState } from "react";
import { useMutation } from "react-query";
import axios from "../../../axiosConfig.js";
import { useOnClickOutside } from "../../hooks/useOnClickOutside.js";
import DetailItem from "../Design/DetailItem.jsx";
import Section from "../Design/Section.jsx";

export default function ConsultationDetails({
  consultation,
  patient,
  onConsultationUpdated,
}) {
  const [editableConsultation, setEditableConsultation] =
    useState(consultation);
  const [backupConsultation, setBackupConsultation] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const sectionRef = useRef(null);

  useOnClickOutside(sectionRef, () => setIsEditing(false));

  useEffect(() => {
    setEditableConsultation(consultation);
  }, [consultation]);

  const handleFieldChange = (field, value) => {
    setEditableConsultation((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSaveChanges = async () => {
    try {
      await axios.put(
        `/consultation/${editableConsultation.id}`,
        editableConsultation
      );
      if (onConsultationUpdated) {
        onConsultationUpdated(editableConsultation);
      }
      setIsEditing(false);
    } catch (error) {
      console.error(
        "Erreur lors de la mise à jour de la consultation :",
        error
      );
    }
  };

  const handleEditClick = () => {
    setBackupConsultation(editableConsultation);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setEditableConsultation(backupConsultation);
    setIsEditing(false);
  };

  const generateDiagnosisMutation = useMutation({
    mutationFn: async () => {
      const age =
        new Date().getFullYear() - new Date(patient.birthDate).getFullYear();

      const response = await axios.post("/consultation/diagnosis", {
        id: editableConsultation.id,
        gender: patient.gender,
        age,
        weight: patient.weight,
        height: patient.height,
        occupation: patient.occupation,
        antecedents: patient.antecedents?.map((a) => a.antecedent) || [],
        symptoms: {
          plaint: editableConsultation.patientComplaint,
          aggravatingFactors: editableConsultation.aggravatingFactors,
          relievingFactors: editableConsultation.relievingFactors,
          associatedSymptoms: editableConsultation.associatedSymptoms,
        },
        activities: patient.activities?.map((a) => a.activity) || [],
      });

      return response.data;
    },
    onSuccess: (data) => {
      setEditableConsultation((prev) => ({
        ...prev,
        diagnosis: data.diagnosis,
      }));
      if (onConsultationUpdated) {
        onConsultationUpdated({
          ...editableConsultation,
          diagnosis: data.diagnosis,
        });
      }
    },
    onError: (error) => {
      console.error("Erreur lors de la génération du diagnostic :", error);
    },
  });

  const fields = [
    { label: "Plainte", field: "patientComplaint", type: "text" },
    { label: "Facteurs aggravants", field: "aggravatingFactors", type: "text" },
    { label: "Facteurs soulageants", field: "relievingFactors", type: "text" },
    { label: "Symptômes associés", field: "associatedSymptoms", type: "text" },
    {
      label: "Type de douleur",
      field: "painType",
      type: "select",
      options: [
        "Neuropathique",
        "Nociceptive mécanique (périphérique)",
        "Nociceptive inflammatoire (périphérique)",
        "Centralisée",
      ],
    },
    {
      label: "Échelle EVA (0-10)",
      field: "eva",
      type: "number",
      min: 0,
      max: 10,
    },
    { label: "Examen clinique", field: "clinicalExamination", type: "text" },
    { label: "Tests d'ostéopathie", field: "osteopathyTesting", type: "text" },
    { label: "Traitement", field: "treatment", type: "text" },
    { label: "Conseils", field: "advice", type: "text" },
  ];

  return (
    <div ref={sectionRef}>
      <Section
        title={`Détails de la consultation du ${dayjs(consultation.date).format(
          "DD/MM/YYYY"
        )}`}
        onEdit={handleEditClick}
        showCount={false}
      >
        <div className="space-y-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-4 text-center">
              Informations sur les symptômes
            </h3>
            <div className="space-y-4">
              {fields.map(({ label, field, type, options, min, max }) => (
                <React.Fragment key={field}>
                  <DetailItem
                    label={label}
                    value={editableConsultation[field] || "Non renseigné"}
                    isEditing={isEditing}
                    onChange={(value) => handleFieldChange(field, value)}
                    type={type}
                    options={options}
                    min={min}
                    max={max}
                  />
                  {field === "eva" && !isEditing && (
                    <div className="text-center my-6">
                      <Button
                        onClick={() => generateDiagnosisMutation.mutate()}
                        className={`text-white px-6 py-2 rounded-lg w-full ${
                          generateDiagnosisMutation.isLoading
                            ? "bg-gray-400 cursor-not-allowed"
                            : ""
                        }`}
                        disabled={generateDiagnosisMutation.isLoading}
                      >
                        {generateDiagnosisMutation.isLoading ? (
                          <span className="flex items-center justify-center">
                            <svg
                              className="animate-spin h-5 w-5 mr-2 text-white"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8v8H4z"
                              ></path>
                            </svg>
                            Chargement...
                          </span>
                        ) : (
                          "Générer le diagnostic différentiel/examen clinique à adopter"
                        )}
                      </Button>
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {editableConsultation.diagnosis && (
            <div className="mt-4 p-4 bg-gray-100 border border-gray-300 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">
                Diagnostic
              </h3>
              {editableConsultation.diagnosis.split("\n").map((line, index) => (
                <p key={index} className="text-gray-700">
                  {line}
                </p>
              ))}
            </div>
          )}

          {isEditing && (
            <div className="flex gap-4 mt-4 justify-center">
              <Button onClick={handleSaveChanges}>Enregistrer</Button>
              <Button onClick={handleCancel} variant="secondary">
                Annuler
              </Button>
            </div>
          )}
        </div>
      </Section>
    </div>
  );
}
