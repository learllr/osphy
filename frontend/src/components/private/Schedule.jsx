import React, { useEffect, useState } from "react";
import NavBar from "../common/NavBar";
import axios from "../../axiosConfig.js";
import AddAppointment from "./ScheduleElements/AddAppointment.jsx";
import CalendarView from "./ScheduleElements/CalendarView.jsx";

export default function Schedule() {
  const [patients, setPatients] = useState([]);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get("/patient");
        setPatients(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des patients:", error);
      }
    };
    fetchPatients();
  }, []);

  const handleAddAppointment = (newAppointment) => {
    const updatedAppointment = {
      id: newAppointment.id,
      title: `${newAppointment.patient.firstName} ${newAppointment.patient.lastName}`,
      start: newAppointment.start,
      end: newAppointment.end,
      backgroundColor:
        newAppointment.status === "Confirmé"
          ? "green"
          : newAppointment.status === "En attente"
          ? "orange"
          : "red",
    };

    setAppointments([...appointments, updatedAppointment]);
  };

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get("/appointment");
        const events = response.data.map((appointment) => ({
          id: appointment.id,
          title: `${appointment.patient.firstName} ${appointment.patient.lastName}`,
          start: appointment.start,
          end: appointment.end,
          backgroundColor:
            appointment.status === "Confirmé"
              ? "green"
              : appointment.status === "En attente"
              ? "orange"
              : "red",
        }));
        setAppointments(events);
      } catch (error) {
        console.error("Erreur lors de la récupération des rendez-vous:", error);
      }
    };

    fetchAppointments();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <NavBar />
      <div className="flex flex-col lg:flex-row mt-6 gap-6 mx-6">
        <div className="w-full lg:w-1/5 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Ajouter un rendez-vous
          </h2>
          <AddAppointment
            patients={patients}
            onAppointmentAdd={handleAddAppointment}
          />
        </div>
        <div className="w-full lg:w-4/5 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Calendrier des rendez-vous
          </h2>
          <CalendarView events={appointments} />
        </div>
      </div>
    </div>
  );
}
