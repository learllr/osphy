import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import frLocale from "@fullcalendar/core/locales/fr";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

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
    <div className="p-5">
      <h1 className="text-2xl font-semibold mb-4">Mon agenda</h1>
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
        height={"85vh"}
      />
    </div>
  );
}
