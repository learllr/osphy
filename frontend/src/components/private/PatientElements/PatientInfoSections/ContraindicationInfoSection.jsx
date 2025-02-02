import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import axios from "../../../../axiosConfig.js";
import Section from "../../Design/Section.jsx";
import ItemList from "../../Design/ItemList.jsx";

export default function ContraindicationInfoSection({
  patientId,
  contraindications = [],
}) {
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState(false);
  const [localData, setLocalData] = useState(
    contraindications.map((ci) => ({
      id: ci.id,
      value: ci.contraindication,
      temporalInfo: ci.temporalInfo,
    }))
  );

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      await axios.delete(`/patient/${patientId}/contraindication/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries([
        "patient",
        patientId,
        "contraindications",
      ]);
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (updatedData) => {
      await axios.put(
        `/patient/${patientId}/contraindication/${updatedData.id}`,
        updatedData
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries([
        "patient",
        patientId,
        "contraindications",
      ]);
      setIsEditing(false);
    },
  });

  const handleFieldChange = (id, key, value) => {
    setLocalData((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [key]: value } : item))
    );
  };

  const handleDelete = (id) => {
    deleteMutation.mutate(id);
    setLocalData((prev) => prev.filter((item) => item.id !== id));
  };

  const handleSaveChanges = () => {
    localData.forEach((item) => {
      if (item.id) {
        updateMutation.mutate(item);
      }
    });
  };

  return (
    <Section
      title="Contre-indications"
      count={localData.length}
      onEdit={() => setIsEditing(true)}
    >
      <ItemList
        items={localData}
        fields={[{ key: "value" }, { key: "temporalInfo" }]}
        onChange={handleFieldChange}
        onDelete={handleDelete}
        isEditing={isEditing}
        onSave={handleSaveChanges}
        onCancel={() => setIsEditing(false)}
        isLoading={updateMutation.isLoading || deleteMutation.isLoading}
      />
    </Section>
  );
}
