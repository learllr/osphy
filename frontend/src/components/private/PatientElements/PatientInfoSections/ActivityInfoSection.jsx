import React, { useState } from "react";
import AllItemsList from "../../Design/AllItemsList.jsx";
import Section from "../../Design/Section.jsx";

export default function ActivityInfoSection({ patientId, activities = [] }) {
  const [isEditing, setIsEditing] = useState(false);
  const [currentCount, setCurrentCount] = useState(activities.length);

  const handleToggleEdit = () => {
    setIsEditing((prev) => !prev);
  };

  return (
    <Section
      title="Activités"
      count={currentCount}
      onEdit={handleToggleEdit}
      hideEditButton={isEditing}
    >
      <AllItemsList
        patientId={patientId}
        initialItems={activities}
        apiBaseUrl={`/patient/${patientId}/activity`}
        isEditing={isEditing}
        onEdit={handleToggleEdit}
        updateCount={setCurrentCount}
      />
    </Section>
  );
}
