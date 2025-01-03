import React from "react";
import DetailItem from "../Design/DetailItem.jsx";
import Section from "../Design/Section.jsx";
import axios from "../../../axiosConfig.js";

export default function ConsultationDetails({ consultation, onEdit, patient }) {
  const handleGenerateDiagnosis = async () => {
    try {
      const response = await axios.post("/consultation/diagnosis", {
        gender: patient.gender,
        age:
          new Date().getFullYear() - new Date(patient.birthDate).getFullYear(),
        weight: patient.weight,
        height: patient.height,
        occupation: patient.occupation,
        antecedents: patient.antecedents?.map((a) => a.antecedent) || [],
        symptoms: {
          plaint: consultation.patientComplaint,
          aggravatingFactors: consultation.aggravatingFactors,
          relievingFactors: consultation.relievingFactors,
          associatedSymptoms: consultation.associatedSymptoms,
        },
        activities: patient.activities?.map((a) => a.activity) || [],
      });

      alert(`Diagnostic généré : ${response.data.diagnosis}`);
    } catch (error) {
      console.error("Erreur lors de la génération du diagnostic :", error);
      alert("Impossible de générer le diagnostic.");
    }
  };

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
              />
              <DetailItem
                label="Facteurs aggravants"
                value={consultation.aggravatingFactors}
              />
              <DetailItem
                label="Facteurs soulageants"
                value={consultation.relievingFactors}
              />
              <DetailItem
                label="Symptômes associés"
                value={consultation.associatedSymptoms}
              />
            </div>
          </div>

          <div className="text-center my-6">
            <button
              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
              onClick={handleGenerateDiagnosis}
            >
              Générer le diagnostic différentiel/examen clinique à adopter
            </button>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-4 text-center">
              Examen et traitement
            </h3>
            <div className="space-y-4">
              <DetailItem
                label="Examen clinique"
                value={consultation.clinicalExamination}
              />
              <DetailItem
                label="Tests d'ostéopathie"
                value={consultation.osteopathyTesting}
              />
              <DetailItem label="Traitement" value={consultation.treatment} />
              <DetailItem label="Conseils" value={consultation.advice} />
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}
