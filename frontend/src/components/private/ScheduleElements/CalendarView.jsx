import frLocale from "@fullcalendar/core/locales/fr";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import React, { useCallback, useMemo, useState } from "react";
import AppointmentDialog from "../../dialogs/AppointmentDialog.jsx";

dayjs.extend(utc);

export default function CalendarView({ events, onDelete, onEdit }) {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editableEvent, setEditableEvent] = useState(null);

  const eventsWithLocalTime = useMemo(
    () =>
      events.map(({ date, startTime, endTime, ...rest }) => ({
        ...rest,
        start: dayjs(`${date} ${startTime}`, "DD/MM/YYYY HH:mm").toISOString(),
        end: dayjs(`${date} ${endTime}`, "DD/MM/YYYY HH:mm").toISOString(),
        backgroundColor: rest.extendedProps?.backgroundColor || "#000000",
        textColor: "#ffffff",
      })),
    [events]
  );

  const handleEventSelection = useCallback((event) => {
    if (!event.extendedProps) return;

    const { name, status, type, date, startTime, endTime, id, patientId } =
      event.extendedProps || {};

    const formattedEvent = {
      id: id || "",
      name: name || "Non spécifié",
      status: status || "Non spécifié",
      type: type || "Non spécifié",
      date: date ? dayjs(date, "DD/MM/YYYY").format("DD/MM/YYYY") : "Inconnue",
      startTime: dayjs(startTime, "HH:mm").format("HH:mm"),
      endTime: dayjs(endTime, "HH:mm").format("HH:mm"),
      patientId: patientId || null,
    };

    setSelectedEvent(formattedEvent);
    setEditableEvent(formattedEvent);
    setIsEditing(false);
  }, []);

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
        locale={frLocale}
        timeZone="Europe/Paris"
        height={"90vh"}
        eventClick={(info) => handleEventSelection(info.event)}
      />

      <AppointmentDialog
        selectedEvent={selectedEvent}
        setSelectedEvent={setSelectedEvent}
        editableEvent={editableEvent}
        setEditableEvent={setEditableEvent}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    </div>
  );
}
