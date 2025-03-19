import React, { useState } from "react";
import { pregnancyFields } from "../../../../../../shared/constants/fields.js";
import DetailItem from "../../Design/DetailItem.jsx";
import Section from "../../Design/Section.jsx";

export default function PregnancyInfoSection({ pregnancies }) {
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  return (
    <Section
      title="Grossesses"
      count={pregnancies?.length || 0}
      onEdit={handleEditClick}
      hideEditButton={isEditing}
    >
      {pregnancies && pregnancies.length > 0 ? (
        pregnancies.map((pregnancy) => (
          <div key={pregnancy.id} className="mb-4">
            {pregnancyFields.map(({ label, field, format }) => (
              <DetailItem
                key={field}
                label={label}
                value={
                  format ? format(pregnancy[field]) : pregnancy[field] || "-"
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
