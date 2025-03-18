import React, { useState } from "react";
import AllItemsList from "../../Design/AllItemsList.jsx";
import Section from "../../Design/Section.jsx";

export default function ActivityInfoSection({ patientId, activities }) {
  const [isEditing, setIsEditing] = useState(false);

  const handleToggleEdit = () => {
    setIsEditing((prev) => !prev);
  };

  return (
    <Section
      title="Activités"
      count={activities.length}
      onEdit={handleToggleEdit}
      hideEditButton={isEditing}
    >
      <AllItemsList
        patientId={patientId}
        initialItems={activities}
        apiBaseUrl={`/patient/${patientId}/activity`}
        isEditing={isEditing}
        onEdit={handleToggleEdit}
      />
    </Section>
  );
}
