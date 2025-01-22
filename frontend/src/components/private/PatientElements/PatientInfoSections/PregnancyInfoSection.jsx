import React from "react";
import DetailItem from "../../Design/DetailItem.jsx";
import Section from "../../Design/Section.jsx";

export default function PregnancyInfoSection({ pregnancies }) {
  const pregnancyFields = [
    { label: "Sexe de l'enfant", field: "gender" },
    { label: "Méthode d'accouchement", field: "deliveryMethod" },
    {
      label: "Péridurale",
      field: "epidural",
      format: (value) => (value ? "Oui" : "Non"),
    },
  ];

  return (
    <Section title="Grossesses" count={pregnancies?.length || 0}>
      {pregnancies && pregnancies.length > 0 ? (
        pregnancies.map((pregnancy) => (
          <div key={pregnancy.id} className="mb-4">
            {pregnancyFields.map(({ label, field, format }) => (
              <DetailItem
                key={field}
                label={label}
                value={
                  format
                    ? format(pregnancy[field])
                    : pregnancy[field] || "Non renseigné"
                }
              />
            ))}
          </div>
        ))
      ) : (
        <p>Aucune grossesse enregistrée.</p>
      )}
    </Section>
  );
}
