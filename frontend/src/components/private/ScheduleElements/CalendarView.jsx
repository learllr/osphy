import frLocale from "@fullcalendar/core/locales/fr";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import React from "react";

dayjs.extend(utc);

export default function CalendarView({ events }) {
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
        <span className="ml-1">{eventInfo.event.title}</span>
      </div>
    );
  };

  return (
    <div className="text-sm">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="timeGridWeek"
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
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
      />
    </div>
  );
}
