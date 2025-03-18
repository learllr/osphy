import { Button } from "@/components/ui/button";
import React, { useEffect, useRef, useState } from "react";
import { useMutation } from "react-query";
import { consultationDetailsFields } from "../../../../../shared/constants/fields.js";
import {
  calculateAge,
  formatDateFR,
  isEventInThePast,
} from "../../../../../shared/utils/dateUtils.js";
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
    if (!consultation) return;

    let parsedDiagnosis = consultation.diagnosis;

    try {
      if (typeof parsedDiagnosis === "string") {
        parsedDiagnosis = JSON.parse(parsedDiagnosis);
      }

      if (typeof parsedDiagnosis === "string") {
        parsedDiagnosis = JSON.parse(parsedDiagnosis);
      }
    } catch (error) {
      console.error("Erreur lors du parsing JSON :", error);
      parsedDiagnosis = { exams: [] };
    }

    setEditableConsultation((prev) => ({
      ...prev,
      ...consultation,
      diagnosis: parsedDiagnosis || { exams: [] },
    }));
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

  const handleCheckboxChange = (index) => {
    const updatedDiagnosis = { ...editableConsultation.diagnosis };
    updatedDiagnosis.exams[index].checked =
      !updatedDiagnosis.exams[index].checked;

    setEditableConsultation((prev) => ({
      ...prev,
      diagnosis: updatedDiagnosis,
    }));

    axios
      .put(`/consultation/${editableConsultation.id}/diagnosis`, {
        diagnosis: updatedDiagnosis,
      })
      .catch((error) =>
        console.error("Erreur lors de la mise à jour du diagnostic :", error)
      );
  };

  const isPastConsultation = isEventInThePast(consultation.date);

  return (
    <div ref={sectionRef}>
      <Section
        title={`Détails de la consultation du ${formatDateFR(
          consultation.date
        )}`}
        onEdit={handleEditClick}
        showCount={false}
        hideEditButton={isPastConsultation}
      >
        <div className="space-y-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-4 text-center">
              Informations sur les symptômes
            </h3>
            <div className="space-y-4">
              {consultationDetailsFields.map(
                ({ label, field, type, options, min, max }) => (
                  <DetailItem
                    key={field}
                    label={label}
                    value={editableConsultation[field]}
                    isEditing={isEditing}
                    onChange={(value) => handleFieldChange(field, value)}
                    type={type}
                    options={options}
                    min={min}
                    max={max}
                  />
                )
              )}
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
                  {generateDiagnosisMutation.isLoading
                    ? "Chargement..."
                    : "Générer le diagnostic et l'examen clinique"}
                </Button>
              </div>
            )}
          </div>

          {!isEditing &&
            editableConsultation.diagnosis &&
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
                            editableConsultation.diagnosis
                              .differential_diagnosis,
                        }}
                      />
                    </p>
                  </div>
                )}

                {editableConsultation.diagnosis?.exams &&
                  Array.isArray(editableConsultation.diagnosis.exams) && (
                    <ul className="mt-2">
                      {editableConsultation.diagnosis.exams.map(
                        (exam, index) => (
                          <li
                            key={index}
                            className="flex items-center space-x-2 mt-3"
                          >
                            <input
                              type="checkbox"
                              checked={exam.checked}
                              onChange={() => handleCheckboxChange(index)}
                              className="form-checkbox h-4 w-4 text-primary flex-shrink-0"
                            />
                            <span className="text-gray-700">
                              <strong>{exam.name}</strong> - {exam.description}
                            </span>
                          </li>
                        )
                      )}
                    </ul>
                  )}
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
