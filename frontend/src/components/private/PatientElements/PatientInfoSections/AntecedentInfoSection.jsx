import React, { useState } from "react";
import AllItemsList from "../../Design/AllItemsList.jsx";
import Section from "../../Design/Section.jsx";

export default function AntecedentInfoSection({ patientId, antecedents = [] }) {
  const [isEditing, setIsEditing] = useState(false);
  const [currentCount, setCurrentCount] = useState(antecedents.length);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  return (
    <Section
      title="Antécédents"
      count={currentCount}
      onEdit={handleEditClick}
      hideEditButton={isEditing}
    >
      <AllItemsList
        patientId={patientId}
        initialItems={antecedents.map((ant) => ({
          id: ant.id,
          category: ant.category,
          year: ant.year,
          antecedent: ant.antecedent,
        }))}
        apiBaseUrl={`/patient/${patientId}/antecedent`}
        onEdit={() => setIsEditing(false)}
        isEditing={isEditing}
        categoryOptions={["Traumatique", "Médical", "Chirurgical"]}
        updateCount={setCurrentCount}
      />
    </Section>
  );
}
