import React from "react";
import Section from "../../Design/Section.jsx";

export default function ActivityInfoSection({
  activities,
  editing,
  onToggleEdit,
}) {
  return (
    <Section
      title="Activités"
      count={activities?.length || 0}
      onEdit={onToggleEdit}
    >
      {activities && activities.length > 0 ? (
        <ul>
          {activities.map((activity) => (
            <li key={activity.id}>
              <strong>{activity.activity}</strong> ({activity.temporalInfo})
            </li>
          ))}
        </ul>
      ) : (
        <p>Aucune activité enregistrée.</p>
      )}
    </Section>
  );
}
