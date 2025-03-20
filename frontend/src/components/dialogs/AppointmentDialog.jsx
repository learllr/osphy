import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";
import { appointmentFields } from "../../../../shared/constants/fields.js";
import {
  formatDate,
  isEventInThePast,
} from "../../../../shared/utils/dateUtils.js";
import { useMessageDialog } from "../contexts/MessageDialogContext.jsx";
import ConfirmDialog from "../dialogs/ConfirmDialog.jsx";
import DetailItem from "../private/Design/DetailItem.jsx";

export default function AppointmentDialog({
  selectedEvent,
  setSelectedEvent,
  isEditing,
  setIsEditing,
  onEdit,
  onDelete,
}) {
  const [editableEvent, setEditableEvent] = useState(null);
  const { showMessage } = useMessageDialog();
  const [isVisible, setIsVisible] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  useEffect(() => {
    if (selectedEvent) {
      setEditableEvent({
        ...selectedEvent,
        date: selectedEvent.date ? formatDate(selectedEvent.date) : "",
        startTime: selectedEvent.startTime
          ? selectedEvent.startTime.slice(0, 5)
          : "",
        endTime: selectedEvent.endTime ? selectedEvent.endTime.slice(0, 5) : "",
      });

      setTimeout(() => setIsVisible(true), 10);
    } else {
      setIsVisible(false);
      setTimeout(() => setEditableEvent(null), 300);
    }
  }, [selectedEvent]);

  const handleChange = (field, value) => {
    setEditableEvent((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = async () => {
    if (!editableEvent || !editableEvent.id) return;

    const updatedEvent = {
      ...editableEvent,
      date: new Date(editableEvent.date).toISOString().split("T")[0],
      startTime: `${editableEvent.startTime}:00`,
      endTime: `${editableEvent.endTime}:00`,
    };

    onEdit(updatedEvent);
    setIsVisible(false);
    setTimeout(() => setSelectedEvent(null), 300);
    setIsEditing(false);
  };

  const confirmDelete = () => {
    if (onDelete && selectedEvent) {
      onDelete(selectedEvent.id);
      setIsVisible(false);
      setTimeout(() => setSelectedEvent(null), 300);
      setIsConfirmOpen(false);
    }
  };

  if (!editableEvent) return null;

  return (
    <>
      <div
        className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10 transition-opacity duration-300 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        onClick={() => {
          setIsVisible(false);
          setTimeout(() => setSelectedEvent(null), 300);
        }}
      >
        <div
          className={`bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative z-[60] transition-transform duration-300 transform ${
            isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <h2 className="text-xl font-bold mb-4">Détails du rendez-vous</h2>
          <p className="text-sm text-gray-600 mb-4">
            Voici les informations détaillées concernant le rendez-vous
            sélectionné.
          </p>
          <Separator />

          <div className="space-y-3 mt-5">
            {appointmentFields.map(
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

          <div className="flex space-x-4 mt-6">
            {isEditing ||
            !isEventInThePast(editableEvent.date, editableEvent.startTime) ? (
              <>
                {isEditing ? (
                  <Button onClick={handleSave}>Enregistrer</Button>
                ) : (
                  <Button onClick={() => setIsEditing(true)}>Modifier</Button>
                )}
                <Button
                  variant="destructive"
                  onClick={() => setIsConfirmOpen(true)}
                >
                  Supprimer
                </Button>
              </>
            ) : null}
            <Button
              variant="outline"
              onClick={() => {
                setIsVisible(false);
                setTimeout(() => setSelectedEvent(null), 300);
              }}
            >
              Fermer
            </Button>
          </div>
        </div>
      </div>

      <ConfirmDialog
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={confirmDelete}
        title="Supprimer le rendez-vous"
        message="Êtes-vous sûr de vouloir supprimer ce rendez-vous ? Cette action est irréversible."
        confirmText="Supprimer"
        cancelText="Annuler"
      />
    </>
  );
}
