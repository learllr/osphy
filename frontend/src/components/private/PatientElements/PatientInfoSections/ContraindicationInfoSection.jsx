import React, { useState } from "react";
import AllItemsList from "../../Design/AllItemsList.jsx";
import Section from "../../Design/Section.jsx";

export default function ContraindicationInfoSection({
  patientId,
  contraindications = [],
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [currentCount, setCurrentCount] = useState(contraindications.length);

  const handleToggleEdit = () => {
    setIsEditing((prev) => !prev);
  };

  return (
    <Section
      title="Contre-indications"
      count={currentCount}
      onEdit={handleToggleEdit}
      hideEditButton={isEditing}
    >
      <AllItemsList
        patientId={patientId}
        initialItems={contraindications}
        apiBaseUrl={`/patient/${patientId}/contraindication`}
        isEditing={isEditing}
        onEdit={handleToggleEdit}
        updateCount={setCurrentCount}
        columnLabels={{
          contraindication: "Contre-indication",
          temporalInfo: "Date/Fréquence",
        }}
      />
    </Section>
  );
}
