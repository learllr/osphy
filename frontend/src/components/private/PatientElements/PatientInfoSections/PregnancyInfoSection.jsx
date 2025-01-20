import React from "react";
import DetailItem from "../../Design/DetailItem.jsx";
import Section from "../../Design/Section.jsx";

export default function PregnancyInfoSection({ pregnancies }) {
  return (
    <Section title="Grossesses" count={pregnancies?.length || 0}>
      {pregnancies && pregnancies.length > 0 ? (
        pregnancies.map((pregnancy) => (
          <div key={pregnancy.id} className="mb-4">
            <DetailItem label="Sexe de l'enfant" value={pregnancy.gender} />
            <DetailItem
              label="Méthode d'accouchement"
              value={pregnancy.deliveryMethod}
            />
            <DetailItem
              label="Péridurale"
              value={pregnancy.epidural ? "Oui" : "Non"}
            />
          </div>
        ))
      ) : (
        <p>Aucune grossesse enregistrée.</p>
      )}
    </Section>
  );
}
