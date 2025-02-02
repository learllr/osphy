import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import * as Dialog from "@radix-ui/react-dialog";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { isEventInThePast } from "../../../../shared/utils/dateUtils.js";
import DetailItem from "../private/Design/DetailItem.jsx";
import customParseFormat from "dayjs/plugin/customParseFormat.js";
import axios from "../../axiosConfig.js";

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
          ? dayjs(selectedEvent.date).isValid()
            ? dayjs(selectedEvent.date).format("YYYY-MM-DD")
            : "Date invalide"
          : "",
        startTime: selectedEvent.startTime
          ? dayjs(selectedEvent.startTime, "HH:mm:ss").isValid()
            ? dayjs(selectedEvent.startTime, "HH:mm").format("HH:mm")
            : "Heure invalide"
          : "",
        endTime: selectedEvent.endTime
          ? dayjs(selectedEvent.endTime, "HH:mm:ss").isValid()
            ? dayjs(selectedEvent.endTime, "HH:mm").format("HH:mm")
            : "Heure invalide"
          : "",
      });
    } else {
      setEditableEvent(null);
    }
  }, [selectedEvent]);

  const handleChange = (field, value) => {
    setEditableEvent((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        [field]: field === "date" ? dayjs(value).format("YYYY-MM-DD") : value,
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
    { label: "Nom du patient", field: "name" },
    {
      label: "Type",
      field: "type",
      options: [
        "Suivi",
        "Première consultation",
        "Urgence",
        "Bilan",
        "Pédiatrique",
        "Autre",
      ],
    },
    {
      label: "Statut",
      field: "status",
      options: ["Confirmé", "En attente", "Annulé"],
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
            {eventFields.map(({ label, field, type, options }) => (
              <DetailItem
                key={field}
                label={label}
                value={editableEvent[field] ?? ""}
                isEditing={isEditing}
                onChange={(value) => handleChange(field, value)}
                type={type}
                options={options}
                link={
                  field === "name" && editableEvent.patientId
                    ? `/patient/${editableEvent.patientId}`
                    : null
                }
              />
            ))}
          </div>
        )}
        <div className="flex space-x-4 mt-6">
          {editableEvent &&
            !isEventInThePast(editableEvent.date, editableEvent.startTime) && (
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
            )}
          <Dialog.Close asChild>
            <Button variant="outline">Fermer</Button>
          </Dialog.Close>
        </div>
      </Dialog.Content>
    </Dialog.Root>
  );
}
