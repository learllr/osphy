import React, { useEffect, useState } from "react";
import { useMutation } from "react-query";
import axios from "../../../../axiosConfig.js";
import Section from "../../Design/Section.jsx";
import ItemList from "../../Design/ItemList.jsx";

export default function ActivityInfoSection({ patientId, activities }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedActivities, setEditedActivities] = useState(activities || []);
  const [initialActivities, setInitialActivities] = useState(activities || []);
  const [deletedActivities, setDeletedActivities] = useState([]);

  const updateActivityMutation = useMutation((activity) =>
    axios.put(`/patient/${patientId}/activity/${activity.id}`, activity)
  );

  const addActivityMutation = useMutation(
    (activity) => axios.post(`/patient/${patientId}/activity`, activity),
    {
      onSuccess: (response, newActivity) => {
        setEditedActivities((prev) =>
          prev.map((act) => (act.id === newActivity.id ? response.data : act))
        );
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
      { id: Date.now(), activity: "", temporalInfo: "", patientId },
    ]);
  };

  const handleDelete = (id) => {
    setDeletedActivities((prev) => [...prev, id]);
    setEditedActivities((prev) => prev.filter((a) => a.id !== id));
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
      <ItemList
        items={editedActivities}
        fields={[
          { key: "activity", type: "text" },
          { key: "temporalInfo", type: "text" },
        ]}
        onChange={handleInputChange}
        onDelete={handleDelete}
        onAdd={handleAddActivity}
        onSave={handleSave}
        onCancel={handleCancel}
        isEditing={isEditing}
        isLoading={isLoading}
      />
    </Section>
  );
}
