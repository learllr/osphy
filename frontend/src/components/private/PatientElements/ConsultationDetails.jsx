import { Button } from "@/components/ui/button";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import axios from "../../../axiosConfig.js";
import DetailItem from "../Design/DetailItem.jsx";
import Section from "../Design/Section.jsx";

export default function ConsultationDetails({ consultation }) {
  const [editableConsultation, setEditableConsultation] =
    useState(consultation);
  const [diagnosis, setDiagnosis] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setEditableConsultation(consultation);
    setDiagnosis(null);
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

  const handleGenerateDiagnosis = async () => {
    try {
      // Simulation d'appel à l'API pour générer un diagnostic
      // const response = await axios.post("/consultation/diagnosis", {
      //   gender: patient.gender,
      //   age:
      //     new Date().getFullYear() - new Date(patient.birthDate).getFullYear(),
      //   weight: patient.weight,
      //   height: patient.height,
      //   occupation: patient.occupation,
      //   antecedents: patient.antecedents?.map((a) => a.antecedent) || [],
      //   symptoms: {
      //     plaint: consultation.patientComplaint,
      //     aggravatingFactors: consultation.aggravatingFactors,
      //     relievingFactors: consultation.relievingFactors,
      //     associatedSymptoms: consultation.associatedSymptoms,
      //   },
      //   activities: patient.activities?.map((a) => a.activity) || [],
      // });

      // setDiagnosis(response.data.diagnosis);

      // Simulation de réponse de diagnostic
      const simulatedDiagnosis =
        "Diagnostic simulé : lombalgie chronique probable.";
      setDiagnosis(simulatedDiagnosis);
    } catch (error) {
      console.error("Erreur lors de la génération du diagnostic :", error);
      alert("Impossible de générer le diagnostic.");
    }
  };

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
            </div>
          </div>

          <div className="text-center my-6">
            <Button
              onClick={handleGenerateDiagnosis}
              className="text-white px-6 py-2 rounded-lg w-full"
            >
              Générer le diagnostic différentiel/examen clinique à adopter
            </Button>
          </div>

          {diagnosis && (
            <div className="mt-4 p-4 bg-gray-100 border border-gray-300 rounded-lg">
              {diagnosis.split("\n").map((line, index) => (
                <p key={index} className="text-gray-700 font-semibold">
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
