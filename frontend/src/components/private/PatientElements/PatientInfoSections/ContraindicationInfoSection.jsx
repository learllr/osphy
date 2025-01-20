import React from "react";
import Section from "../../Design/Section.jsx";

export default function ContraindicationInfoSection({ contraindications }) {
  return (
    <Section title="Contre-indications" count={contraindications?.length || 0}>
      {contraindications && contraindications.length > 0 ? (
        <ul>
          {contraindications.map((ci) => (
            <li key={ci.id}>
              <strong>{ci.contraindication}</strong> ({ci.temporalInfo})
            </li>
          ))}
        </ul>
      ) : (
        <p>Aucune contre-indication enregistrée.</p>
      )}
    </Section>
  );
}
