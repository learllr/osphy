import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useMutation } from "react-query";
import { calculateAge } from "../../../../../shared/utils/dateUtils.js";
import axios from "../../../axiosConfig.js";
import ConfirmDialog from "../../dialogs/ConfirmDialog.jsx";
import DiagnosisDisplay from "./Diagnosis/DiagnosisDisplay";
import DiagnosisEdit from "./Diagnosis/DiagnosisEdit";

export default function DiagnosisSection({
  isEditing,
  editableConsultation,
  patient,
  onDiagnosisGenerated,
}) {
  const [isEditingDiagnosis, setIsEditingDiagnosis] = useState(false);
  const [backupDiagnosis, setBackupDiagnosis] = useState(null);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);

  const updateDiagnosisMutation = useMutation({
    mutationFn: async (updatedDiagnosis) => {
      await axios.put(
        `/diagnosis/${editableConsultation.id}`,
        updatedDiagnosis
      );
    },
    onSuccess: () => {
      onDiagnosisGenerated(editedDiagnosis);
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
      onDiagnosisGenerated(data.diagnosis);
    },
  });

  const handleEditDiagnosis = () => {
    setBackupDiagnosis(editableConsultation.diagnosis);
    setIsEditingDiagnosis(true);
  };

  const handleCancelEdit = () => {
    setIsEditingDiagnosis(false);
  };

  const handleDeleteDiagnosis = () => {
    setIsConfirmDialogOpen(true);
  };

  const confirmDeleteDiagnosis = () => {
    deleteDiagnosisMutation.mutate();
    setIsConfirmDialogOpen(false);
  };

  if (isEditing) return null;

  return (
    <>
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

      {editableConsultation.diagnosis && (
        <div className="mt-4 p-4 bg-gray-100 border border-gray-300 rounded-lg relative">
          <h3 className="text-lg font-semibold text-gray-700 mb-4 flex justify-between">
            Diagnostics différentiels
            <div className="flex gap-3">
              <FaEdit
                className="text-blue-500 cursor-pointer"
                size={18}
                onClick={handleEditDiagnosis}
              />
              <FaTrash
                className="text-red-500 cursor-pointer"
                size={18}
                onClick={handleDeleteDiagnosis}
              />
            </div>
          </h3>

          {isEditingDiagnosis ? (
            <DiagnosisEdit
              diagnosis={editableConsultation.diagnosis}
              onSave={(updatedDiagnosis) =>
                updateDiagnosisMutation.mutate(updatedDiagnosis)
              }
              onCancel={handleCancelEdit}
            />
          ) : (
            <DiagnosisDisplay diagnosis={editableConsultation.diagnosis} />
          )}
        </div>
      )}

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
