import React, { useEffect, useState } from "react";
import NavBar from "../common/NavBar";
import axios from "../../axiosConfig.js";
import AddAppointment from "./ScheduleElements/AddAppointment.jsx";
import CalendarView from "./ScheduleElements/CalendarView.jsx";

export default function Schedule() {
  const [events, setEvents] = useState([]);
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get("/api/patient");
        setPatients(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des patients:", error);
      }
    };
    fetchPatients();
  }, []);

  const handleAddAppointment = (newAppointment) => {
    setEvents([...events, newAppointment]);
  };

  return (
    <div>
      <NavBar />
      <div className="flex">
        <AddAppointment
          patients={patients}
          onAppointmentAdd={handleAddAppointment}
        />
        <CalendarView events={events} />
      </div>
    </div>
  );
}
