import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import frLocale from "@fullcalendar/core/locales/fr";

export default function CalendarView({ events }) {
  return (
    <div className="p-5 w-3/4">
      <h1 className="text-2xl font-semibold mb-4">Mon agenda</h1>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="timeGridWeek"
        events={events}
        selectable={true}
        locale={frLocale}
        timeZone="Europe/Paris"
        height={"85vh"}
      />
    </div>
  );
}
