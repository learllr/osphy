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
import React, { useCallback, useMemo, useState } from "react";
import DetailItem from "../../private/Design/DetailItem.jsx";

dayjs.extend(utc);

export default function CalendarView({ events, onDelete, onEdit }) {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editableEvent, setEditableEvent] = useState(null);

  const formatEventTime = (time) =>
    time ? dayjs(`1970-01-01T${time}`).format("HH:mm") : "";

  const eventsWithLocalTime = useMemo(
    () =>
      events.map(({ date, startTime, endTime, ...rest }) => ({
        ...rest,
        start: dayjs(`${date}T${startTime}`).format(),
        end: dayjs(`${date}T${endTime}`).format(),
        backgroundColor: rest.extendedProps?.backgroundColor || "#000000",
        textColor: "#ffffff",
      })),
    [events]
  );
  console.log(eventsWithLocalTime);

  const handleEventSelection = useCallback((event) => {
    const { name, status, type, date, startTime, endTime, id } =
      event.extendedProps;

    const formattedEvent = {
      id,
      name: name || "Non spécifié",
      status: status || "Non spécifié",
      type: type || "Non spécifié",
      date: dayjs(date).format("DD/MM/YYYY"),
      startTime: formatEventTime(startTime),
      endTime: formatEventTime(endTime),
    };

    setSelectedEvent(formattedEvent);
    setEditableEvent({ ...formattedEvent });
    setIsEditing(false);
  }, []);

  const handleChange = (field, value) => {
    setEditableEvent((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    if (onEdit && editableEvent) onEdit(editableEvent);
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (onDelete && selectedEvent) {
      onDelete(selectedEvent.id);
      setSelectedEvent(null);
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
    <div className="text-sm">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="timeGridWeek"
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "timeGridDay,timeGridWeek,dayGridMonth",
        }}
        views={{
          dayGridMonth: { buttonText: "Mois" },
          timeGridWeek: { buttonText: "Semaine" },
          timeGridDay: { buttonText: "Jour" },
        }}
        events={eventsWithLocalTime}
        eventContent={({ event }) => (
          <div
            className="flex flex-col items-start p-1 rounded text-xs leading-tight"
            style={{
              backgroundColor: event.extendedProps.backgroundColor,
              color: event.extendedProps.textColor || "#ffffff",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            <div className="flex items-center">
              {event.extendedProps.icon}
              <span className="ml-1 font-bold truncate">
                {event.extendedProps.type}
              </span>
            </div>
            <div className="truncate">
              <span>{event.extendedProps.name}</span>
            </div>
          </div>
        )}
        selectable={true}
        locale={frLocale}
        timeZone="Europe/Paris"
        height={"90vh"}
        eventClick={(info) => handleEventSelection(info.event)}
        weekNumbers={true}
        nowIndicator={true}
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
              {eventFields.map(({ label, field, type, options }) => (
                <DetailItem
                  key={field}
                  label={label}
                  value={editableEvent[field]}
                  isEditing={isEditing}
                  onChange={(value) => handleChange(field, value)}
                  type={type}
                  options={options}
                />
              ))}
            </div>
          )}
          <div className="flex space-x-4 mt-6">
            {isEditing ? (
              <Button onClick={handleSave}>Enregistrer</Button>
            ) : (
              <Button onClick={() => setIsEditing(true)}>Modifier</Button>
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
