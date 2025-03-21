import { Button } from "@/components/ui/button";
import React, { useEffect, useRef, useState } from "react";
import { consultationDetailsFields } from "../../../../../shared/constants/fields.js";
import { isEventInThePast } from "../../../../../shared/utils/dateUtils.js";
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
  };

  const handleCancel = () => {
    setEditableConsultation(backupConsultation);
    setIsEditing(false);
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

  return (
    <div ref={sectionRef}>
      <Section
        title={`Consultation du ${consultation.date}`}
        onEdit={handleEditClick}
        onDelete={() => handleDeleteConsultation(consultation.id)}
        showCount={false}
        hideEditButton={isPastConsultation ? true : isEditing}
        confirmDialogTitle="Êtes-vous sûr de vouloir supprimer cette consultation ? Cette action est irréversible."
      >
        <div className="space-y-8">
          <div>
            <div className="space-y-4">
              {consultationDetailsFields.map(
                ({ label, field, type, options, min, max }, index) => (
                  <>
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

                    {field === "eva" && (
                      <DiagnosisSection
                        isEditing={isEditing}
                        editableConsultation={editableConsultation}
                        patient={patient}
                        onDiagnosisGenerated={(diagnosis) => {
                          setEditableConsultation((prev) => ({
                            ...prev,
                            diagnosis,
                          }));
                          if (onConsultationUpdated) {
                            onConsultationUpdated({
                              ...editableConsultation,
                              diagnosis,
                            });
                          }
                        }}
                      />
                    )}
                  </>
                )
              )}
            </div>

            {isEditing && (
              <div className="flex gap-4 mt-4 justify-center">
                <Button onClick={handleSaveChanges}>Enregistrer</Button>
                <Button onClick={handleCancel} variant="secondary">
                  Annuler
                </Button>
              </div>
            )}
          </div>
        </div>
      </Section>
    </div>
  );
}
