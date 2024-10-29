import React from "react";

export default function ConsultationList({
  consultations,
  onConsultationClick,
}) {
  return (
    <>
      <h2 className="text-xl font-bold mb-4">Consultations</h2>
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
    </>
  );
}
