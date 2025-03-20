import { Button } from "@/components/ui/button";
import React from "react";
import { useMutation } from "react-query";
import { calculateAge } from "../../../../../shared/utils/dateUtils.js";
import axios from "../../../axiosConfig.js";

export default function DiagnosisSection({
  isEditing,
  editableConsultation,
  patient,
  onDiagnosisGenerated,
}) {
  const generateDiagnosisMutation = useMutation({
    mutationFn: async () => {
      const age = calculateAge(patient.birthDate);

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
      if (onDiagnosisGenerated) {
        onDiagnosisGenerated(data.diagnosis);
      }
    },
    onError: (error) => {
      console.error("Erreur lors de la génération du diagnostic :", error);
    },
  });

  if (isEditing) return null;

  return (
    <>
      {/* Bouton pour générer le diagnostic */}
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
          {generateDiagnosisMutation.isLoading
            ? "Chargement..."
            : "Générer le diagnostic et l'examen clinique"}
        </Button>
      </div>

      {/* Affichage des résultats du diagnostic */}
      {editableConsultation.diagnosis &&
        editableConsultation.diagnosis.exams?.length > 0 && (
          <div className="mt-4 p-4 bg-gray-100 border border-gray-300 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              Diagnostics différentiels
            </h3>
            <p className="text-gray-700 mb-4">
              {editableConsultation.diagnosis.summary}
            </p>

            {editableConsultation.diagnosis?.differential_diagnosis && (
              <div className="mt-3 p-4 bg-gray-100 border border-gray-300 rounded-lg">
                <p className="text-gray-700">
                  <span
                    dangerouslySetInnerHTML={{
                      __html:
                        editableConsultation.diagnosis.differential_diagnosis,
                    }}
                  />
                </p>
              </div>
            )}

            {editableConsultation.diagnosis?.exams &&
              Array.isArray(editableConsultation.diagnosis.exams) && (
                <ul className="mt-2">
                  {editableConsultation.diagnosis.exams.map((exam, index) => (
                    <li
                      key={index}
                      className="flex items-center space-x-2 mt-3"
                    >
                      <input
                        type="checkbox"
                        checked={exam.checked}
                        onChange={() =>
                          onDiagnosisGenerated((prev) => {
                            const updatedDiagnosis = { ...prev };
                            updatedDiagnosis.exams[index].checked =
                              !updatedDiagnosis.exams[index].checked;
                            return updatedDiagnosis;
                          })
                        }
                        className="form-checkbox h-4 w-4 text-primary flex-shrink-0"
                      />
                      <span className="text-gray-700">
                        <strong>{exam.name}</strong> - {exam.description}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
          </div>
        )}
    </>
  );
}
