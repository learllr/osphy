import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { useMutation } from "react-query";
import axios from "../../../../axiosConfig.js";
import Section from "../../Design/Section.jsx";

export default function ActivityInfoSection({ patientId, activities }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedActivities, setEditedActivities] = useState(activities || []);
  const [initialActivities, setInitialActivities] = useState(activities || []);
  const [deletedActivities, setDeletedActivities] = useState([]);

  useEffect(() => {
    setEditedActivities(activities);
    setInitialActivities(activities);
  }, [activities]);

  const updateActivityMutation = useMutation((activity) =>
    axios.put(`/patient/${patientId}/activity/${activity.id}`, activity)
  );

  const addActivityMutation = useMutation(
    (activity) => axios.post(`/patient/${patientId}/activity`, activity),
    {
      onSuccess: (response) => {
        const newActivity = response.data;
        setEditedActivities((prev) => [...prev, newActivity]);
      },
    }
  );

  const deleteActivityMutation = useMutation((id) =>
    axios.delete(`/patient/${patientId}/activity/${id}`)
  );

  const isLoading =
    updateActivityMutation.isLoading ||
    addActivityMutation.isLoading ||
    deleteActivityMutation.isLoading;

  const handleToggleEdit = () => {
    setIsEditing((prev) => !prev);
    if (!isEditing) {
      setInitialActivities([...editedActivities]);
      setDeletedActivities([]);
    }
  };

  const handleInputChange = (id, field, value) => {
    setEditedActivities((prev) =>
      prev.map((activity) =>
        activity.id === id ? { ...activity, [field]: value } : activity
      )
    );
  };

  const handleAddActivity = () => {
    setEditedActivities((prev) => [
      ...prev,
      { id: Date.now(), patientId, activity: "", temporalInfo: "" },
    ]);
  };

  const handleDelete = (id) => {
    if (!id) {
      setEditedActivities((prev) => prev.filter((a) => a.id !== id));
    } else {
      setDeletedActivities((prev) => [...prev, id]);
      setEditedActivities((prev) => prev.filter((a) => a.id !== id));
    }
  };

  const handleSave = () => {
    editedActivities.forEach((activity) => {
      if (activity.id && !deletedActivities.includes(activity.id)) {
        updateActivityMutation.mutate(activity);
      }
    });

    deletedActivities.forEach((id) => {
      deleteActivityMutation.mutate(id);
    });

    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedActivities([...initialActivities]);
    setDeletedActivities([]);
    setIsEditing(false);
  };

  return (
    <Section
      title="Activités"
      count={editedActivities.length}
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
                  className="flex-1 mr-2 border border-gray-300 rounded-md shadow-sm px-2 py-1"
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
                  className="flex-1 border border-gray-300 rounded-md shadow-sm px-2 py-1"
                />
                <button
                  onClick={() => handleDelete(activity.id)}
                  className="ml-2 text-red-500 hover:text-red-700"
                  aria-label="Supprimer l'activité"
                >
                  <FaTrash size={16} />
                </button>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex gap-2">
            <Button
              onClick={handleAddActivity}
              variant="outline"
              disabled={isLoading}
            >
              Ajouter une activité
            </Button>
          </div>
          <div className="mt-4 flex gap-2">
            <Button onClick={handleSave} disabled={isLoading}>
              {isLoading ? "Enregistrement..." : "Enregistrer"}
            </Button>
            <Button
              variant="secondary"
              onClick={handleCancel}
              disabled={isLoading}
            >
              Annuler
            </Button>
          </div>
        </div>
      ) : (
        <div>
          {editedActivities.length > 0 ? (
            <ul>
              {editedActivities.map((activity) => (
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
