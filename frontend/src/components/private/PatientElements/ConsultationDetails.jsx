import React, { useState, useEffect } from "react";
import DetailItem from "../Design/DetailItem.jsx";
import Section from "../Design/Section.jsx";
import axios from "../../../axiosConfig.js";

export default function ConsultationDetails({ consultation, onEdit, patient }) {
  const [diagnosis, setDiagnosis] = useState(null);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const handleGenerateDiagnosis = async () => {
    try {
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

      const simulatedDiagnosis =
        "Diagnostic simulé : lombalgie chronique probable.";
      setDiagnosis(simulatedDiagnosis);

      setIsButtonDisabled(true);
    } catch (error) {
      console.error("Erreur lors de la génération du diagnostic :", error);
      alert("Impossible de générer le diagnostic.");
    }
  };

  const handleParameterChange = () => {
    setDiagnosis(null);
    setIsButtonDisabled(false);
  };

  // Réinitialise le diagnostic lorsque la consultation change
  useEffect(() => {
    setDiagnosis(null);
    setIsButtonDisabled(false);
  }, [consultation]);

  return (
    <div className="bg-zinc-50 p-8">
      <Section
        title="Détails de la consultation"
        onEdit={onEdit}
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
                value={consultation.patientComplaint}
                onChange={handleParameterChange}
              />
              <DetailItem
                label="Facteurs aggravants"
                value={consultation.aggravatingFactors}
                onChange={handleParameterChange}
              />
              <DetailItem
                label="Facteurs soulageants"
                value={consultation.relievingFactors}
                onChange={handleParameterChange}
              />
              <DetailItem
                label="Symptômes associés"
                value={consultation.associatedSymptoms}
                onChange={handleParameterChange}
              />
            </div>
          </div>

          <div className="text-center my-6">
            <button
              className={`${
                isButtonDisabled
                  ? "bg-gray-400"
                  : "bg-blue-500 hover:bg-blue-600"
              } text-white px-6 py-2 rounded-lg transition duration-200`}
              onClick={handleGenerateDiagnosis}
              disabled={isButtonDisabled}
            >
              Générer le diagnostic différentiel/examen clinique à adopter
            </button>
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
                value={consultation.clinicalExamination}
                onChange={handleParameterChange}
              />
              <DetailItem
                label="Tests d'ostéopathie"
                value={consultation.osteopathyTesting}
                onChange={handleParameterChange}
              />
              <DetailItem
                label="Traitement"
                value={consultation.treatment}
                onChange={handleParameterChange}
              />
              <DetailItem
                label="Conseils"
                value={consultation.advice}
                onChange={handleParameterChange}
              />
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}
