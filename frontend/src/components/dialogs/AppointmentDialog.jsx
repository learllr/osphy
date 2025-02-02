import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import * as Dialog from "@radix-ui/react-dialog";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat.js";
import { useEffect, useState } from "react";
import { isEventInThePast } from "../../../../shared/utils/dateUtils.js";
import axios from "../../axiosConfig.js";
import DetailItem from "../private/Design/DetailItem.jsx";

dayjs.extend(customParseFormat);

export default function AppointmentDialog({
  selectedEvent,
  setSelectedEvent,
  isEditing,
  setIsEditing,
  onEdit,
  onDelete,
}) {
  const [editableEvent, setEditableEvent] = useState(null);

  useEffect(() => {
    if (selectedEvent) {
      setEditableEvent({
        ...selectedEvent,
        date: selectedEvent.date
          ? dayjs(
              selectedEvent.date,
              ["DD/MM/YYYY", "YYYY-MM-DD"],
              true
            ).format("YYYY-MM-DD")
          : "",
        startTime: selectedEvent.startTime
          ? dayjs(selectedEvent.startTime, "HH:mm:ss").format("HH:mm")
          : "",
        endTime: selectedEvent.endTime
          ? dayjs(selectedEvent.endTime, "HH:mm:ss").format("HH:mm")
          : "",
      });
    } else {
      setEditableEvent(null);
    }
  }, [selectedEvent]);

  const handleChange = (field, value) => {
    setEditableEvent((prev) => {
      if (!prev) return prev;

      if (field === "date") {
        const parsedDate = dayjs(value, ["YYYY-MM-DD", "DD/MM/YYYY"], true);

        return {
          ...prev,
          date: parsedDate.isValid() ? parsedDate.format("YYYY-MM-DD") : value,
        };
      }

      return {
        ...prev,
        [field]: value,
      };
    });
  };

  const handleSave = async () => {
    if (!editableEvent || !editableEvent.id) return;

    const updatedEvent = {
      ...editableEvent,
      date: dayjs(
        editableEvent.date,
        ["DD/MM/YYYY", "YYYY-MM-DD"],
        true
      ).format("YYYY-MM-DD"),
      startTime: dayjs(editableEvent.startTime, "HH:mm", true).format(
        "HH:mm:ss"
      ),
      endTime: dayjs(editableEvent.endTime, "HH:mm", true).format("HH:mm:ss"),
    };

    try {
      await axios.put(`/appointment/${editableEvent.id}`, updatedEvent);
      if (onEdit) onEdit(updatedEvent);
      setSelectedEvent(null);
      setIsEditing(false);
    } catch (error) {
      console.error("Erreur lors de la mise à jour :", error);
      alert("Erreur lors de la mise à jour du rendez-vous.");
    }
  };

  const handleDelete = () => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce rendez-vous ?")) {
      if (onDelete && selectedEvent) {
        onDelete(selectedEvent.id);
        setSelectedEvent(null);
      }
    }
  };

  const eventFields = [
    { label: "Nom du patient", field: "name", editable: false },
    {
      label: "Type",
      field: "type",
      type: "select",
      options: [
        "Suivi",
        "Première consultation",
        "Urgence",
        "Bilan",
        "Pédiatrique",
        "Autre",
      ],
      allowEmptyOption: false,
    },
    {
      label: "Statut",
      field: "status",
      type: "select",
      options: ["Confirmé", "En attente", "Annulé"],
      allowEmptyOption: false,
    },
    { label: "Date", field: "date", type: "date" },
    { label: "Heure de début", field: "startTime", type: "time" },
    { label: "Heure de fin", field: "endTime", type: "time" },
  ];

  return (
    <Dialog.Root
      open={!!selectedEvent}
      onOpenChange={() => setSelectedEvent(null)}
    >
      <Dialog.Overlay className="fixed inset-0 bg-black/50 z-50" />
      <Dialog.Content className="fixed top-1/2 left-1/2 w-[90%] max-w-md p-6 bg-white rounded-lg shadow-lg transform -translate-x-1/2 -translate-y-1/2 z-50">
        <Dialog.Title className="text-xl font-bold mb-4">
          Détails du rendez-vous
        </Dialog.Title>
        <Dialog.Description className="text-sm text-gray-600 mb-4">
          Voici les informations détaillées concernant le rendez-vous
          sélectionné.
        </Dialog.Description>
        <Separator />
        {editableEvent && (
          <div className="space-y-1 mt-5">
            {eventFields.map(
              ({ label, field, type, options, editable, allowEmptyOption }) => (
                <DetailItem
                  key={field}
                  label={label}
                  value={editableEvent[field] ?? ""}
                  isEditing={isEditing}
                  onChange={(value) => handleChange(field, value)}
                  type={type}
                  options={options}
                  editable={editable}
                  allowEmptyOption={allowEmptyOption}
                  link={
                    field === "name" && editableEvent.patientId
                      ? `/patient/${editableEvent.patientId}`
                      : null
                  }
                />
              )
            )}
          </div>
        )}
        <div className="flex space-x-4 mt-6">
          {editableEvent && (
            <>
              {isEditing ||
              !isEventInThePast(editableEvent.date, editableEvent.startTime) ? (
                <>
                  {isEditing ? (
                    <Button onClick={handleSave}>Enregistrer</Button>
                  ) : (
                    <Button onClick={() => setIsEditing(true)}>Modifier</Button>
                  )}
                  <Button variant="destructive" onClick={handleDelete}>
                    Supprimer
                  </Button>
                </>
              ) : null}
            </>
          )}
          <Dialog.Close asChild>
            <Button variant="outline">Fermer</Button>
          </Dialog.Close>
        </div>
      </Dialog.Content>
    </Dialog.Root>
  );
}
