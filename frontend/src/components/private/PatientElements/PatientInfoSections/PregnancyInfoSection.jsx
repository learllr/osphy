import React, { useState } from "react";
import AllItemsList from "../../Design/AllItemsList.jsx";
import Section from "../../Design/Section.jsx";

export default function PregnancyInfoSection({ patientId, pregnancies = [] }) {
  const [isEditing, setIsEditing] = useState(false);
  const [currentCount, setCurrentCount] = useState(pregnancies.length);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  return (
    <Section
      title="Grossesses"
      count={currentCount}
      onEdit={handleEditClick}
      hideEditButton={isEditing}
    >
      <AllItemsList
        patientId={patientId}
        initialItems={pregnancies.map((pregnancy) => ({
          id: pregnancy.id,
          gender: pregnancy.gender,
          deliveryMethod: pregnancy.deliveryMethod,
          epidural: pregnancy.epidural,
        }))}
        apiBaseUrl={`/pregnancy/${patientId}`}
        onEdit={() => setIsEditing(false)}
        isEditing={isEditing}
        fieldOptions={{
          gender: ["Garçon", "Fille"],
          epidural: ["Oui", "Non"],
          deliveryMethod: ["Voie basse", "Césarienne"],
        }}
        columnLabels={{
          gender: "Sexe",
          deliveryMethod: "Mode d'accouchement",
          epidural: "Péridurale",
        }}
        updateCount={setCurrentCount}
      />
    </Section>
  );
}
