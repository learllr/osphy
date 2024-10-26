import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import frLocale from "@fullcalendar/core/locales/fr";
import NavBar from "../common/NavBar";
import axios from "axios";
import PatientSearchModal from "../modals/PatientSearchModal.jsx";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export default function Schedule() {
  const [events, setEvents] = useState([]);
  const [patients, setPatients] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showNewPatientModal, setShowNewPatientModal] = useState(false);

  const [newEvent, setNewEvent] = useState({
    title: "",
    start: "",
    end: "",
    description: "",
    type: "Consultation",
    patient: "",
    isNewPatient: false,
  });

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/patient`);
        setPatients(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des patients:", error);
      }
    };
    fetchPatients();
  }, []);

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

  const handlePatientSelect = (patient) => {
    setNewEvent({
      ...newEvent,
      patient: `${patient.firstName} ${patient.lastName}`,
    });
    setShowModal(false);
  };

  return (
    <div>
      <NavBar />
      <div className="flex">
        <div className="flex-1 p-5 w-1/4">
          <h2 className="text-2xl font-semibold mb-2">
            Ajouter un rendez-vous
          </h2>
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
                <option value="Première consultation">
                  Première consultation
                </option>
                <option value="Urgence">Urgence</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block mb-1">Patient :</label>
              <div className="flex space-x-2">
                <div className="w-full p-2 border rounded bg-gray-100">
                  {newEvent.patient ? (
                    newEvent.patient
                  ) : (
                    <span className="text-gray-500">
                      Aucun patient sélectionné
                    </span>
                  )}
                </div>
                <button
                  type="button"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  onClick={() => setShowModal(true)}
                >
                  Rechercher un patient
                </button>
              </div>
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
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Ajouter
            </button>
          </form>
        </div>

        <div className="flex-2 p-5 w-3/4">
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
      </div>

      {showModal && (
        <PatientSearchModal
          patients={patients}
          onSelect={handlePatientSelect}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}
