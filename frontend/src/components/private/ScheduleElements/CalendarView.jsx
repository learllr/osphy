import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import frLocale from "@fullcalendar/core/locales/fr";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import * as Dialog from "@radix-ui/react-dialog";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import React, { useState } from "react";
import DetailItem from "../../private/Design/DetailItem.jsx";

dayjs.extend(utc);

export default function CalendarView({ events, onDelete, onEdit }) {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editableEvent, setEditableEvent] = useState(null);

  const eventsWithLocalTime = events.map((event) => ({
    ...event,
    start: dayjs.utc(event.start).local().format(),
    end: dayjs.utc(event.end).local().format(),
    backgroundColor: event.extendedProps.backgroundColor,
    textColor: "#ffffff",
  }));

  const renderEventContent = (eventInfo) => {
    return (
      <div
        className="flex items-center p-1 rounded"
        style={{
          backgroundColor: eventInfo.event.extendedProps.backgroundColor,
          color: eventInfo.event.extendedProps.textColor || "#ffffff",
        }}
      >
        {eventInfo.event.extendedProps.icon}
        <span className="ml-1">{eventInfo.event.extendedProps.name}</span>
      </div>
    );
  };

  const onEventClick = (event) => {
    const { name, status, type, start, end, id } = event.extendedProps;
    setSelectedEvent({
      id,
      name: name || "Non spécifié",
      status: status || "Non spécifié",
      type: type || "Non spécifié",
      start: dayjs(start).format("DD/MM/YYYY HH:mm"),
      end: dayjs(end).format("DD/MM/YYYY HH:mm"),
    });
    setEditableEvent({
      id,
      name: name || "",
      status: status || "",
      type: type || "",
      start: dayjs(start).format("YYYY-MM-DDTHH:mm"),
      end: dayjs(end).format("YYYY-MM-DDTHH:mm"),
    });
    setIsEditing(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    if (onEdit && editableEvent) {
      onEdit(editableEvent);
    }
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (onDelete && selectedEvent) {
      onDelete(selectedEvent.id);
      setSelectedEvent(null);
    }
  };

  const handleChange = (field, value) => {
    setEditableEvent({ ...editableEvent, [field]: value });
  };

  return (
    <div className="text-sm">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="timeGridWeek"
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "timeGridWeek,dayGridMonth,timeGridDay",
        }}
        views={{
          dayGridMonth: { buttonText: "Mois" },
          timeGridWeek: { buttonText: "Semaine" },
          timeGridDay: { buttonText: "Jour" },
        }}
        events={eventsWithLocalTime}
        eventContent={renderEventContent}
        selectable={true}
        locale={frLocale}
        timeZone="Europe/Paris"
        height={"90vh"}
        eventClick={(info) => onEventClick(info.event)}
      />

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
              <DetailItem
                label="Nom du patient"
                value={editableEvent.name}
                isEditing={isEditing}
                onChange={(value) => handleChange("name", value)}
              />
              <DetailItem
                label="Type"
                value={editableEvent.type}
                isEditing={isEditing}
                onChange={(value) => handleChange("type", value)}
                type="select"
                options={[
                  { label: "Suivi", value: "Suivi" },
                  {
                    label: "Première consultation",
                    value: "Première consultation",
                  },
                  { label: "Urgence", value: "Urgence" },
                  { label: "Bilan", value: "Bilan" },
                  { label: "Pédiatrique", value: "Pédiatrique" },
                  { label: "Autre", value: "Autre" },
                ]}
              />
              <DetailItem
                label="Statut"
                value={editableEvent.status}
                isEditing={isEditing}
                onChange={(value) => handleChange("status", value)}
                type="select"
                options={[
                  { label: "Confirmé", value: "Confirmé" },
                  { label: "En attente", value: "En attente" },
                  { label: "Annulé", value: "Annulé" },
                ]}
              />
              <DetailItem
                label="Date de début"
                value={editableEvent.start}
                isEditing={isEditing}
                onChange={(value) => handleChange("start", value)}
                type="datetime-local"
              />
              <DetailItem
                label="Date de fin"
                value={editableEvent.end}
                isEditing={isEditing}
                onChange={(value) => handleChange("end", value)}
                type="datetime-local"
              />
            </div>
          )}
          <div className="flex space-x-4 mt-6">
            {isEditing ? (
              <Button onClick={handleSave}>Enregistrer</Button>
            ) : (
              <Button onClick={handleEdit}>Modifier</Button>
            )}
            <Button variant="destructive" onClick={handleDelete}>
              Supprimer
            </Button>
            <Dialog.Close asChild>
              <Button variant="outline">Fermer</Button>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Root>
    </div>
  );
}
