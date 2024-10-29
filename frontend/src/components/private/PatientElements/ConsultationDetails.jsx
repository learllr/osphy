import React from "react";

export default function ConsultationDetails({ consultation }) {
  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold mb-2">Détails de la consultation</h2>
      <p>
        <strong>Date:</strong>{" "}
        {new Date(consultation.date).toLocaleDateString()}
      </p>
      <p>
        <strong>Plainte:</strong> {consultation.patientComplaint}
      </p>
      <p>
        <strong>Symptômes aggravants:</strong>{" "}
        {consultation.aggravatingSymptoms}
      </p>
      <p>
        <strong>Symptômes soulageants:</strong> {consultation.relievingSymptoms}
      </p>
      <p>
        <strong>Symptômes associés:</strong> {consultation.associatedSymptoms}
      </p>
      <p>
        <strong>Examen clinique:</strong> {consultation.clinicalExamination}
      </p>
      <p>
        <strong>Tests d'ostéopathie:</strong> {consultation.osteopathyTesting}
      </p>
      <p>
        <strong>Traitement:</strong> {consultation.treatment}
      </p>
      <p>
        <strong>Conseils:</strong> {consultation.advice}
      </p>
    </div>
  );
}
