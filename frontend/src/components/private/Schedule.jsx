import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import frLocale from "@fullcalendar/core/locales/fr";

export default function Schedule() {
  const [events, setEvents] = useState([
    { title: "Consultation", start: "2024-10-24T10:00:00", end: "2024-10-24T12:00:00" },
    { title: "Suivi", start: "2024-10-25T14:00:00", end: "2024-10-25T15:00:00" },
  ]);

  const [newEvent, setNewEvent] = useState({
    title: "",
    start: "",
    end: "",
    description: "",
    type: "Consultation",
    patient: "",
    isNewPatient: false,
  });

  const handleDateClick = (arg) => {
    alert("Date cliquée : " + arg.dateStr);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setNewEvent({ ...newEvent, [name]: checked });
    } else {
      setNewEvent({ ...newEvent, [name]: value });
    }
  };

  const handleAddEvent = (e) => {
    e.preventDefault();
    setEvents([...events, newEvent]);
    setNewEvent({
      title: "",
      start: "",
      end: "",
      description: "",
      type: "Consultation",
      patient: "",
      isNewPatient: false,
    });
  };

  return (
    <div className="flex">
      {/* Formulaire à gauche */}
      <div className="flex-1 p-5 w-1/4">
        <h2 className="text-2xl font-semibold mb-2">Ajouter un rendez-vous</h2>
        <form onSubmit={handleAddEvent}>
          <div className="mb-2">
            <label className="block mb-1">Titre :</label>
            <input
              type="text"
              name="title"
              value={newEvent.title}
              onChange={handleInputChange}
              placeholder="Titre du rendez-vous"
              required
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-2">
            <label className="block mb-1">Description (facultatif) :</label>
            <textarea
              name="description"
              value={newEvent.description}
              onChange={handleInputChange}
              placeholder="Description du rendez-vous"
              className="w-full p-2 border rounded"
              rows="4"
            />
          </div>
          <div className="mb-2">
            <label className="block mb-1">Type de rendez-vous :</label>
            <select
              name="type"
              value={newEvent.type}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
            >
              <option value="Consultation">Consultation</option>
              <option value="Suivi">Suivi</option>
              <option value="Première consultation">Première consultation</option>
              <option value="Urgence">Urgence</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block mb-1">Patient :</label>
            <input
              type="text"
              name="patient"
              value={newEvent.patient}
              onChange={handleInputChange}
              placeholder="Nom du patient"
              required
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              name="isNewPatient"
              checked={newEvent.isNewPatient}
              onChange={handleInputChange}
              className="mr-2"
            />
            <label>Nouveau patient</label>
          </div>
          <div className="mb-4">
            <label className="block mb-1">Date de début :</label>
            <input
              type="datetime-local"
              name="start"
              value={newEvent.start}
              onChange={handleInputChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Date de fin :</label>
            <input
              type="datetime-local"
              name="end"
              value={newEvent.end}
              onChange={handleInputChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Ajouter
          </button>
        </form>
      </div>

      {/* Calendrier à droite */}
      <div className="flex-2 p-5 w-3/4">
        <h1 className="text-2xl font-semibold mb-4">Mon agenda</h1>
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          events={events}
          dateClick={handleDateClick}
          selectable={true}
          locale={frLocale}
          timeZone="Europe/Paris"
          height={"85vh"}
        />
      </div>
    </div>
  );
}
