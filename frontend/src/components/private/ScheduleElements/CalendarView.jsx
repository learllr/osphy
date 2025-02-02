import frLocale from "@fullcalendar/core/locales/fr";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import React, { useCallback, useState } from "react";
import AppointmentDialog from "../../dialogs/AppointmentDialog.jsx";

export default function CalendarView({ events, onDelete, onEdit }) {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleEventSelection = useCallback((event) => {
    if (!event.extendedProps) return;
    setSelectedEvent(event.extendedProps);
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
        events={events}
        eventContent={({ event }) => {
          const { backgroundColor, icon, type, name } =
            event.extendedProps || {};

          return (
            <div
              className="flex flex-col items-start p-1 rounded text-xs leading-tight"
              style={{
                backgroundColor: backgroundColor || "#000",
                color: "#ffffff",
              }}
            >
              <div className="flex items-center">
                {icon && <span>{icon}</span>}
                {type && (
                  <span className="ml-1 font-bold truncate">{type}</span>
                )}
              </div>
              {name && <div className="truncate">{name}</div>}
            </div>
          );
        }}
        locale={frLocale}
        timeZone="local"
        height={"90vh"}
        eventClick={(info) => handleEventSelection(info.event)}
      />

      <AppointmentDialog
        selectedEvent={selectedEvent}
        setSelectedEvent={setSelectedEvent}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        onDelete={onDelete}
      />
    </div>
  );
}
