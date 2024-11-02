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
  }));

  return (
    <div className="p-5 w-3/4">
      <h1 className="text-2xl font-semibold mb-4">Mon agenda</h1>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="timeGridWeek"
        events={eventsWithLocalTime}
        selectable={true}
        locale={frLocale}
        timeZone="Europe/Paris"
        height={"85vh"}
      />
    </div>
  );
}
