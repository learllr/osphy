import React, { useState } from "react";
import AddConsultationModal from "../../modals/AddConsultationModal.jsx";

export default function ConsultationList({
  consultations,
  onConsultationClick,
  patientId,
  onConsultationAdded,
}) {
  const [showAddModal, setShowAddModal] = useState(false);

  const openAddModal = () => setShowAddModal(true);
  const closeAddModal = () => setShowAddModal(false);

  return (
    <>
      <h2 className="text-xl font-bold mb-4">Consultations</h2>
      <button
        onClick={openAddModal}
        className="mb-4 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Ajouter une consultation
      </button>
      <ul>
        {consultations.length > 0 ? (
          consultations.map((consultation) => (
            <li
              key={consultation.id}
              className="mb-4 cursor-pointer text-blue-600 hover:underline"
              onClick={() => onConsultationClick(consultation)}
            >
              {new Date(consultation.date).toLocaleDateString()}
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
