import React from "react";
import DetailItem from "../Design/DetailItem.jsx";
import Section from "../Design/Section.jsx";

export default function ConsultationDetails({ consultation, onEdit }) {
  return (
    <div className="bg-zinc-50 p-8 min-h-screen">
      <Section title="Détails de la consultation" onEdit={onEdit}>
        <div className="space-y-4">
          <DetailItem
            label="Date"
            value={new Date(consultation.date).toLocaleDateString()}
          />
          <DetailItem label="Plainte" value={consultation.patientComplaint} />
          <DetailItem
            label="Symptômes aggravants"
            value={consultation.aggravatingSymptoms}
          />
          <DetailItem
            label="Symptômes soulageants"
            value={consultation.relievingSymptoms}
          />
          <DetailItem
            label="Symptômes associés"
            value={consultation.associatedSymptoms}
          />
          <DetailItem
            label="Examen clinique"
            value={consultation.clinicalExamination}
          />
          <DetailItem
            label="Tests d'ostéopathie"
            value={consultation.osteopathyTesting}
          />
          <DetailItem label="Traitement" value={consultation.treatment} />
          <DetailItem label="Conseils" value={consultation.advice} />
        </div>
      </Section>
    </div>
  );
}
