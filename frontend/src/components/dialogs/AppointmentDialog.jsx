import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import * as Dialog from "@radix-ui/react-dialog";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { isEventInThePast } from "../../../../shared/utils/dateUtils.js";
import DetailItem from "../private/Design/DetailItem.jsx";

dayjs.extend(customParseFormat);

export default function AppointmentDialog({
  selectedEvent,
  setSelectedEvent,
  editableEvent,
  setEditableEvent,
  isEditing,
  setIsEditing,
  onEdit,
  onDelete,
}) {
  const handleChange = (field, value) => {
    setEditableEvent((prev) => {
      let formattedValue = value;

      if (field === "date") {
        formattedValue = dayjs(value, "YYYY-MM-DD").format("DD/MM/YYYY");
      } else if (field === "startTime" || field === "endTime") {
        formattedValue = dayjs(value, "HH:mm:ss").format("HH:mm");
      }

      return { ...prev, [field]: formattedValue };
    });
  };

  const handleSave = () => {
    if (!editableEvent) return;

    const updatedEvent = {
      ...editableEvent,
      date: dayjs(editableEvent.date, "DD/MM/YYYY").format("YYYY-MM-DD"),
      startTime: dayjs(editableEvent.startTime, "HH:mm").format("HH:mm:ss"),
      endTime: dayjs(editableEvent.endTime, "HH:mm").format("HH:mm:ss"),
    };

    onEdit(updatedEvent);
    setIsEditing(false);
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
      type: "select",
      options: [
        { label: "Suivi", value: "Suivi" },
        { label: "Première consultation", value: "Première consultation" },
        { label: "Urgence", value: "Urgence" },
        { label: "Bilan", value: "Bilan" },
        { label: "Pédiatrique", value: "Pédiatrique" },
        { label: "Autre", value: "Autre" },
      ],
    },
    {
      label: "Statut",
      field: "status",
      type: "select",
      options: [
        { label: "Confirmé", value: "Confirmé" },
        { label: "En attente", value: "En attente" },
        { label: "Annulé", value: "Annulé" },
      ],
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
                value={editableEvent[field]}
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
