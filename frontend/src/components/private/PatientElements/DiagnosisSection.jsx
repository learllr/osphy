import React, { useState } from "react";
import { useMutation } from "react-query";
import axios from "../../../axiosConfig.js";
import ConfirmDialog from "../../dialogs/ConfirmDialog.jsx";
import DiagnosisDisplay from "./Diagnosis/DiagnosisDisplay";
import DiagnosisEdit from "./Diagnosis/DiagnosisEdit";

export default function DiagnosisSection({
  isEditing,
  editableConsultation,
  onDiagnosisGenerated,
  isEditingDiagnosis,
  setIsEditingDiagnosis,
}) {
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);

  const updateDiagnosisMutation = useMutation({
    mutationFn: async (updatedDiagnosis) => {
      await axios.put(
        `/diagnosis/${editableConsultation.id}`,
        updatedDiagnosis
      );
      return updatedDiagnosis;
    },
    onSuccess: (data) => {
      onDiagnosisGenerated(data);
      setIsEditingDiagnosis(false);
    },
    onError: (error) => {
      console.error("Erreur lors de la mise à jour du diagnostic :", error);
    },
  });

  const deleteDiagnosisMutation = useMutation({
    mutationFn: async () => {
      await axios.delete(`/diagnosis/${editableConsultation.id}`);
    },
    onSuccess: () => {
      onDiagnosisGenerated(null);
    },
    onError: (error) => {
      console.error("Erreur lors de la suppression du diagnostic :", error);
    },
  });

  const handleCancelEdit = () => {
    setIsEditingDiagnosis(false);
  };

  const confirmDeleteDiagnosis = () => {
    deleteDiagnosisMutation.mutate();
    setIsConfirmDialogOpen(false);
  };

  if (isEditing) return null;

  const handleToggleExam = (index) => {
    const updatedExams = [...editableConsultation.diagnosis.exams];
    updatedExams[index].checked = !updatedExams[index].checked;

    const updatedDiagnosis = {
      ...editableConsultation.diagnosis,
      exams: updatedExams,
    };

    updateDiagnosisMutation.mutate(updatedDiagnosis);
  };

  return (
    <>
      <div className="mt-4 p-4 bg-gray-100 border border-gray-300 rounded-lg relative">
        {isEditingDiagnosis ? (
          <DiagnosisEdit
            diagnosis={editableConsultation.diagnosis}
            onSave={(updatedDiagnosis) =>
              updateDiagnosisMutation.mutate(updatedDiagnosis)
            }
            onCancel={handleCancelEdit}
          />
        ) : (
          <DiagnosisDisplay
            diagnosis={editableConsultation.diagnosis}
            onToggleExam={handleToggleExam}
          />
        )}
      </div>

      <ConfirmDialog
        isOpen={isConfirmDialogOpen}
        onClose={() => setIsConfirmDialogOpen(false)}
        onConfirm={confirmDeleteDiagnosis}
        title="Confirmer la suppression"
        message="Êtes-vous sûr de vouloir supprimer ce diagnostic ? Cette action est irréversible."
        confirmText="Supprimer"
        cancelText="Annuler"
      />
    </>
  );
}
