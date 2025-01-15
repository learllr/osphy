import { Button } from "@/components/ui/button";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { useMutation } from "react-query";
import axios from "../../../axiosConfig.js";
import DetailItem from "../Design/DetailItem.jsx";
import Section from "../Design/Section.jsx";

export default function ConsultationDetails({
  consultation,
  patient,
  onConsultationUpdated,
}) {
  const [editableConsultation, setEditableConsultation] =
    useState(consultation);
  const [isEditing, setIsEditing] = useState(false);

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
      setIsEditing(false);
    } catch (error) {
      console.error(
        "Erreur lors de la mise à jour de la consultation :",
        error
      );
    }
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
    onSuccess: async (data) => {
      const updatedConsultation = {
        ...editableConsultation,
        diagnosis: data.diagnosis,
      };

      setEditableConsultation(updatedConsultation);

      if (onConsultationUpdated) {
        onConsultationUpdated(updatedConsultation);
      }
    },
    onError: (error) => {
      console.error("Erreur lors de la génération du diagnostic :", error);
    },
  });

  return (
    <div>
      <Section
        title={`Détails de la consultation du ${dayjs(consultation.date).format(
          "DD/MM/YYYY"
        )}`}
        onEdit={() => setIsEditing(!isEditing)}
        showCount={false}
      >
        <div className="space-y-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-4 text-center">
              Informations sur les symptômes
            </h3>
            <div className="space-y-4">
              <DetailItem
                label="Plainte"
                value={editableConsultation.patientComplaint}
                isEditing={isEditing}
                onChange={(value) =>
                  handleFieldChange("patientComplaint", value)
                }
              />
              <DetailItem
                label="Facteurs aggravants"
                value={editableConsultation.aggravatingFactors}
                isEditing={isEditing}
                onChange={(value) =>
                  handleFieldChange("aggravatingFactors", value)
                }
              />
              <DetailItem
                label="Facteurs soulageants"
                value={editableConsultation.relievingFactors}
                isEditing={isEditing}
                onChange={(value) =>
                  handleFieldChange("relievingFactors", value)
                }
              />
              <DetailItem
                label="Symptômes associés"
                value={editableConsultation.associatedSymptoms}
                isEditing={isEditing}
                onChange={(value) =>
                  handleFieldChange("associatedSymptoms", value)
                }
              />
              <DetailItem
                label="Type de douleur"
                value={editableConsultation.painType}
                isEditing={isEditing}
                options={[
                  "Neuropathique",
                  "Nociceptive mécanique (périphérique)",
                  "Nociceptive inflammatoire (périphérique)",
                  "Centralisée",
                ]}
                onChange={(value) => handleFieldChange("painType", value)}
              />
              <DetailItem
                label="Échelle EVA (0-10)"
                value={editableConsultation.eva}
                isEditing={isEditing}
                type="number"
                min={0}
                max={10}
                onChange={(value) => handleFieldChange("eva", value)}
              />
            </div>
          </div>

          {!isEditing && (
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

          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-4 text-center">
              Examen et traitement
            </h3>
            <div className="space-y-4">
              <DetailItem
                label="Examen clinique"
                value={editableConsultation.clinicalExamination}
                isEditing={isEditing}
                onChange={(value) =>
                  handleFieldChange("clinicalExamination", value)
                }
              />
              <DetailItem
                label="Tests d'ostéopathie"
                value={editableConsultation.osteopathyTesting}
                isEditing={isEditing}
                onChange={(value) =>
                  handleFieldChange("osteopathyTesting", value)
                }
              />
              <DetailItem
                label="Traitement"
                value={editableConsultation.treatment}
                isEditing={isEditing}
                onChange={(value) => handleFieldChange("treatment", value)}
              />
              <DetailItem
                label="Conseils"
                value={editableConsultation.advice}
                isEditing={isEditing}
                onChange={(value) => handleFieldChange("advice", value)}
              />
            </div>
          </div>

          {isEditing && (
            <div className="flex gap-4 mt-4 justify-center">
              <Button
                onClick={handleSaveChanges}
                className="bg-green-500 text-white"
              >
                Enregistrer
              </Button>
              <Button
                onClick={() => setIsEditing(false)}
                className="bg-gray-300 text-gray-700"
              >
                Annuler
              </Button>
            </div>
          )}
        </div>
      </Section>
    </div>
  );
}
