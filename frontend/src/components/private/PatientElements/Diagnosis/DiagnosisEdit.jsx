import { Button } from "@/components/ui/button";
import React, { useEffect, useRef, useState } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";

export default function DiagnosisEdit({ diagnosis, onSave, onCancel }) {
  const [editedDiagnosis, setEditedDiagnosis] = useState({
    differential_diagnosis: diagnosis.differential_diagnosis
      ? diagnosis.differential_diagnosis.replace(
          /<strong>(.*?)<\/strong>/g,
          "**$1**"
        )
      : "",
    exams: diagnosis.exams || [],
  });

  const differentialRef = useRef(null);

  useEffect(() => {
    if (differentialRef.current) {
      differentialRef.current.style.height = "auto";
      differentialRef.current.style.height =
        differentialRef.current.scrollHeight + "px";
    }
  }, [editedDiagnosis]);

  const handleAddExam = () => {
    setEditedDiagnosis((prev) => ({
      ...prev,
      exams: [...prev.exams, { name: "", description: "", checked: false }],
    }));
  };

  const handleExamChange = (index, field, value) => {
    const updatedExams = [...editedDiagnosis.exams];
    updatedExams[index][field] = value;
    setEditedDiagnosis({ ...editedDiagnosis, exams: updatedExams });
  };

  const handleRemoveExam = (index) => {
    setEditedDiagnosis((prev) => ({
      ...prev,
      exams: prev.exams.filter((_, i) => i !== index),
    }));
  };

  const handleSave = () => {
    onSave({
      differential_diagnosis: editedDiagnosis.differential_diagnosis.replace(
        /\*\*(.*?)\*\*/g,
        "<strong>$1</strong>"
      ),
      exams: editedDiagnosis.exams.filter(
        (exam) => exam.name.trim() && exam.description.trim()
      ),
    });
  };

  return (
    <div className="flex flex-col gap-4">
      <label className="font-medium text-gray-700">
        Diagnostic différentiel :
      </label>
      <textarea
        ref={differentialRef}
        className="w-full p-2 border border-gray-300 rounded-lg overflow-hidden resize-none"
        value={editedDiagnosis.differential_diagnosis}
        onChange={(e) =>
          setEditedDiagnosis({
            ...editedDiagnosis,
            differential_diagnosis: e.target.value,
          })
        }
      />

      <label className="font-medium text-gray-700 mt-4">
        Examens cliniques :
      </label>
      <div className="flex flex-col">
        {editedDiagnosis.exams.map((exam, index) => (
          <div
            key={index}
            className="flex flex-col gap-2 bg-gray-100 p-3 rounded-lg"
          >
            <input
              type="text"
              placeholder="Nom de l'examen"
              className="w-full p-2 border border-gray-300 rounded-lg"
              value={exam.name}
              onChange={(e) => handleExamChange(index, "name", e.target.value)}
            />
            <textarea
              placeholder="Description"
              className="w-full p-2 border border-gray-300 rounded-lg resize-none"
              value={exam.description}
              onChange={(e) =>
                handleExamChange(index, "description", e.target.value)
              }
            />
            <button
              className="text-red-500 flex items-center gap-2 text-sm self-end mt-1"
              onClick={() => handleRemoveExam(index)}
            >
              <FaTrash size={14} /> Supprimer
            </button>
          </div>
        ))}
      </div>

      <button
        onClick={handleAddExam}
        className="flex items-center gap-2 text-blue-500 font-medium text-sm"
      >
        <FaPlus size={14} /> Ajouter un examen clinique
      </button>

      <div className="flex gap-4 mt-4">
        <Button onClick={handleSave} variant="outline">
          Enregistrer
        </Button>
        <Button onClick={onCancel} variant="secondary">
          Annuler
        </Button>
      </div>
    </div>
  );
}
