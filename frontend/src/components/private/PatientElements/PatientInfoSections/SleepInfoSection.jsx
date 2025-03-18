import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { sleepFields } from "../../../../../../shared/constants/fields.js";
import axios from "../../../../axiosConfig.js";
import DetailItem from "../../Design/DetailItem.jsx";
import Section from "../../Design/Section.jsx";

export default function SleepInfoSection({ patientSleep, patientId }) {
  const defaultSleepData = {
    sleepQuality: null,
    sleepDuration: null,
    restorativeSleep: null,
  };

  const [editableSleep, setEditableSleep] = useState(
    patientSleep || defaultSleepData
  );
  const [backupSleep, setBackupSleep] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const queryClient = useQueryClient();

  const updateSleepMutation = useMutation({
    mutationFn: async (updatedSleep) => {
      const response = await axios.put(
        `/patient/${patientId}/sleep`,
        updatedSleep
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["patient", patientId, "sleep"]);
      setIsEditing(false);
    },
    onError: () => {
      alert("Échec de la mise à jour des données du sommeil.");
    },
  });

  useEffect(() => {
    setEditableSleep(patientSleep || defaultSleepData);
  }, [patientSleep]);

  const handleFieldChange = (field, value) => {
    setEditableSleep((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSaveChanges = () => {
    updateSleepMutation.mutate(editableSleep);
  };

  const handleEditClick = () => {
    setBackupSleep(editableSleep);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setEditableSleep(backupSleep);
    setIsEditing(false);
  };

  return (
    <Section title="Sommeil" showCount={false} onEdit={handleEditClick}>
      {sleepFields.map(({ label, field, type, options, format, parse }) => (
        <DetailItem
          key={field}
          label={label}
          value={format(editableSleep[field])}
          isEditing={isEditing}
          onChange={(newValue) =>
            handleFieldChange(field, parse ? parse(newValue) : newValue)
          }
          type={type}
          options={options}
        />
      ))}

      {isEditing && (
        <div className="flex gap-4 mt-4">
          <Button
            onClick={handleSaveChanges}
            disabled={updateSleepMutation.isLoading}
          >
            {updateSleepMutation.isLoading
              ? "Enregistrement..."
              : "Enregistrer"}
          </Button>
          <Button
            onClick={handleCancel}
            variant="secondary"
            disabled={updateSleepMutation.isLoading}
          >
            Annuler
          </Button>
        </div>
      )}
    </Section>
  );
}
