import React, { useState } from "react";
import dayjs from "dayjs";
import axios from "../../axiosConfig.js";

export default function AddConsultationModal({
  patientId,
  onClose,
  onConsultationAdded,
}) {
  const [formData, setFormData] = useState({
    date: dayjs().format("YYYY-MM-DD"),
    patientComplaint: "",
    aggravatingFactors: "",
    relievingFactors: "",
    associatedSymptoms: "",
    clinicalExamination: "",
    osteopathyTesting: "",
    treatment: "",
    advice: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`/consultation`, {
        ...formData,
        patientId,
      });
      onConsultationAdded(response.data);
      onClose();
    } catch (error) {
      console.error("Erreur lors de l'ajout de la consultation :", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-2xl max-h-[80vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Nouvelle Consultation</h2>
        <form onSubmit={handleSubmit}>
          <label>Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full mb-4 p-2 border"
          />
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="text-gray-500 mr-4"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Ajouter
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
