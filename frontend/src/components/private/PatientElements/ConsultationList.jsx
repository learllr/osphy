import React, { useState } from "react";
import AddConsultationModal from "../../modals/AddConsultationModal.jsx";
import axios from "../../../axiosConfig.js";
import { FaTrash } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";

export default function ConsultationList({
  consultations,
  onConsultationClick,
  patientId,
  onConsultationAdded,
  onConsultationDeleted,
}) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const openAddModal = () => setShowAddModal(true);
  const closeAddModal = () => setShowAddModal(false);

  const handleDelete = async (consultationId) => {
    try {
      await axios.delete(`/consultation/${consultationId}`);
      onConsultationDeleted(consultationId);
    } catch (error) {
      console.error("Erreur lors de la suppression:", error);
    }
  };

  const highlightText = (text, query) => {
    const parts = text.split(new RegExp(`(${query})`, "gi"));
    return (
      <>
        {parts.map((part, index) =>
          part.toLowerCase() === query.toLowerCase() ? (
            <span key={index} className="font-bold">
              {part}
            </span>
          ) : (
            part
          )
        )}
      </>
    );
  };

  const filteredConsultations = consultations.filter((consultation) =>
    new Date(consultation.date).toLocaleDateString().includes(searchQuery)
  );

  return (
    <>
      <h2 className="text-xl font-bold mb-4 text-center">Consultations</h2>
      <button
        onClick={openAddModal}
        className="flex items-center mb-4 bg-lime-600 text-white px-4 py-2 rounded w-full"
      >
        <FaPlus className="mr-2" /> Ajouter une consultation
      </button>
      <input
        type="text"
        placeholder="Rechercher une consultation..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full px-4 py-2 mb-4 rounded border text-sm"
      />
      <ul>
        {filteredConsultations.length > 0 ? (
          filteredConsultations.map((consultation) => (
            <li
              key={consultation.id}
              className="mb-4 cursor-pointer flex justify-between items-center border-b-2 border-stone-400"
            >
              <span
                onClick={() => onConsultationClick(consultation)}
                className="text-lime-600 hover:underline"
              >
                {highlightText(
                  new Date(consultation.date).toLocaleDateString(),
                  searchQuery
                )}
              </span>
              <button
                onClick={() => handleDelete(consultation.id)}
                className="text-red-500 px-2 py-1 rounded"
              >
                <FaTrash size={16} />
              </button>
            </li>
          ))
        ) : (
          <li>Aucune consultation enregistrée.</li>
        )}
      </ul>

      {showAddModal && (
        <AddConsultationModal
          patientId={patientId}
          onClose={closeAddModal}
          onConsultationAdded={onConsultationAdded}
        />
      )}
    </>
  );
}
