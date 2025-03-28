import { Button } from "@/components/ui/button";
import React, { useEffect, useRef, useState } from "react";
import { useMutation } from "react-query";
import { consultationDetailsFields } from "../../../../../shared/constants/fields.js";
import {
  calculateAge,
  isEventInThePast,
} from "../../../../../shared/utils/dateUtils.js";
import axios from "../../../axiosConfig.js";
import { useMessageDialog } from "../../contexts/MessageDialogContext.jsx";
import { useOnClickOutside } from "../../hooks/useOnClickOutside.js";
import DetailItem from "../Design/DetailItem.jsx";
import Section from "../Design/Section.jsx";
import DiagnosisSection from "./DiagnosisSection.jsx";

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
  const { showMessage } = useMessageDialog();
  const [isEditingDiagnosis, setIsEditingDiagnosis] = useState(false);

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
      showMessage("success", "Consultation mise à jour avec succès !");
    } catch (error) {
      console.error(
        "Erreur lors de la mise à jour de la consultation :",
        error
      );
      showMessage("error", "Erreur lors de la mise à jour de la consultation.");
    }
  };

  const handleEditClick = () => {
    setBackupConsultation(editableConsultation);
    setIsEditing(true);
    setIsEditingDiagnosis(true);
  };

  const handleCancel = () => {
    setEditableConsultation(backupConsultation);
    setIsEditing(false);
    setIsEditingDiagnosis(false);
  };

  const handleCloseConsultation = () => {
    if (onConsultationUpdated) {
      onConsultationUpdated(null);
    }
  };

  const isPastConsultation = isEventInThePast(consultation.date);

  const handleDeleteConsultation = async (consultationId) => {
    try {
      await axios.delete(`/consultation/${consultationId}`);
      if (onConsultationUpdated) {
        onConsultationUpdated(null);
      }
      showMessage("success", "Consultation supprimée avec succès !");
    } catch (error) {
      console.error(
        "Erreur lors de la suppression de la consultation :",
        error
      );
      showMessage("error", "Erreur lors de la suppression de la consultation.");
    }
  };

  const generateDiagnosisMutation = useMutation({
    mutationFn: async () => {
      const age = calculateAge(patient.birthDate);
      const response = await axios.post("/diagnosis", {
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
  });

  return (
    <div ref={sectionRef}>
      <Section
        title={`Consultation du ${consultation.date}`}
        onEdit={handleEditClick}
        onDelete={() => handleDeleteConsultation(consultation.id)}
        onClose={handleCloseConsultation}
        showCount={false}
        hideEditButton={isPastConsultation ? true : isEditing}
        confirmDialogTitle="Êtes-vous sûr de vouloir supprimer cette consultation ? Cette action est irréversible."
      >
        <div className="flex gap-4">
          <div
            className={`${
              editableConsultation.diagnosis?.exams?.length > 0
                ? "w-1/2"
                : "w-full"
            }  space-y-4`}
          >
            {consultationDetailsFields.map(
              ({ label, field, type, options, min, max }) => (
                <React.Fragment key={field}>
                  <DetailItem
                    label={label}
                    value={editableConsultation[field]}
                    isEditing={isEditing}
                    onChange={(value) => handleFieldChange(field, value)}
                    type={type}
                    options={options}
                    min={min}
                    max={max}
                  />
                  {field === "eva" && (
                    <>
                      <div className="text-center">
                        <Button
                          onClick={() => generateDiagnosisMutation.mutate()}
                          className={`text-white px-6 py-2 rounded-lg w-full mt-2 ${
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
                    </>
                  )}
                </React.Fragment>
              )
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

          {editableConsultation.diagnosis.exams?.length > 0 && (
            <div className="w-1/2">
              <Section
                title="Diagnostics Différentiels"
                showCount={false}
                onEdit={() => setIsEditingDiagnosis(!isEditing)}
                hideEditButton={isEditingDiagnosis}
              >
                <DiagnosisSection
                  editableConsultation={editableConsultation}
                  patient={patient}
                  isEditingDiagnosis={isEditingDiagnosis}
                  setIsEditingDiagnosis={setIsEditingDiagnosis}
                  onDiagnosisGenerated={(newDiagnosis) =>
                    setEditableConsultation((prev) => ({
                      ...prev,
                      diagnosis: newDiagnosis,
                    }))
                  }
                />
              </Section>
            </div>
          )}
        </div>
      </Section>
    </div>
  );
}
