import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { FaTrash } from "react-icons/fa";
import Section from "../../Design/Section.jsx";

export default function ActivityInfoSection({ activities }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedActivities, setEditedActivities] = useState(activities || []);

  const handleToggleEdit = () => {
    setIsEditing((prev) => !prev);
    setEditedActivities(activities);
  };

  const handleInputChange = (id, field, value) => {
    setEditedActivities((prev) =>
      prev.map((activity) =>
        activity.id === id ? { ...activity, [field]: value } : activity
      )
    );
  };

  const handleSave = () => {
    console.log("Activités sauvegardées :", editedActivities);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedActivities(activities);
    setIsEditing(false);
  };

  const handleDelete = () => {
    console.log("supprimer");
  };

  return (
    <Section
      title="Activités"
      count={activities?.length || 0}
      onEdit={handleToggleEdit}
      hideEditButton={isEditing}
    >
      {isEditing ? (
        <div>
          <ul>
            {editedActivities.map((activity) => (
              <li key={activity.id} className="flex items-center mb-2">
                <input
                  type="text"
                  value={activity.activity}
                  onChange={(e) =>
                    handleInputChange(activity.id, "activity", e.target.value)
                  }
                  className="flex-1 mr-2 border border-gray-300 rounded-md shadow-sm px-2 py-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
                <input
                  type="text"
                  value={activity.temporalInfo}
                  onChange={(e) =>
                    handleInputChange(
                      activity.id,
                      "temporalInfo",
                      e.target.value
                    )
                  }
                  className="flex-1 border border-gray-300 rounded-md shadow-sm px-2 py-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
                <button
                  onClick={() => handleDelete(activity.id)}
                  className="ml-2 text-red-500 hover:text-red-700"
                  aria-label="Supprimer l'activité'"
                >
                  <FaTrash size={16} />
                </button>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex gap-2">
            <Button onClick={handleSave}>Enregistrer</Button>
            <Button variant="secondary" onClick={handleCancel}>
              Annuler
            </Button>
          </div>
        </div>
      ) : (
        <div>
          {activities && activities.length > 0 ? (
            <ul>
              {activities.map((activity) => (
                <li
                  key={activity.id}
                  className="flex items-center mb-2 space-x-2"
                >
                  <span className="font-medium text-gray-700">
                    {activity.activity}
                  </span>
                  <span className="text-gray-500 italic">
                    {activity.temporalInfo}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p>Aucune activité enregistrée.</p>
          )}
        </div>
      )}
    </Section>
  );
}
