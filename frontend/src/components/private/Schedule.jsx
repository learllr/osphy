import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import React, { useEffect, useState } from "react";
import { determineBackgroundColor } from "../../../../shared/utils/colorUtils.js";
import { determineStatusIcon } from "../../../../shared/utils/iconUtils.js";
import axios from "../../axiosConfig.js";
import Body from "../common/Body.jsx";
import AddAppointment from "./ScheduleElements/AddAppointment.jsx";
import CalendarView from "./ScheduleElements/CalendarView.jsx";

dayjs.extend(customParseFormat);

export default function Schedule() {
  const [patients, setPatients] = useState([]);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchData = async (endpoint, setter) => {
      try {
        const response = await axios.get(endpoint);
        setter(response.data);
      } catch (error) {
        console.error(`Erreur lors de la récupération de ${endpoint}:`, error);
      }
    };

    fetchData("/patient", setPatients);
    fetchData("/appointment", (data) =>
      setAppointments(data.map(formatAppointment))
    );
  }, []);

  const formatAppointment = (appointment) => {
    const { patient, status, id, date, startTime, endTime, type } = appointment;

    if (!patient?.birthDate || !patient?.id) {
      console.error("Patient, ID ou date de naissance manquants");
      return null;
    }

    const formattedDate = dayjs(date, "DD/MM/YYYY", true).format("DD/MM/YYYY");
    const formattedStartTime = dayjs(startTime, "HH:mm:ss").format("HH:mm");
    const formattedEndTime = dayjs(endTime, "HH:mm:ss").format("HH:mm");

    return {
      id,
      name: `${patient.firstName} ${patient.lastName}`,
      date: formattedDate,
      startTime: formattedStartTime,
      endTime: formattedEndTime,
      extendedProps: {
        id,
        patientId: patient.id,
        status,
        date: formattedDate,
        icon: determineStatusIcon(status),
        backgroundColor: determineBackgroundColor(patient, patient.birthDate),
        type,
        startTime: formattedStartTime,
        endTime: formattedEndTime,
      },
    };
  };

  const handleAddAppointment = (newAppointment) => {
    const formatted = formatAppointment(newAppointment);
    if (formatted) setAppointments((prev) => [...prev, formatted]);
  };

  const handleDeleteAppointment = async (appointmentId) => {
    if (!appointmentId) return;

    try {
      await axios.delete(`/appointment/${appointmentId}`);
      setAppointments((prev) =>
        prev.filter((appointment) => appointment.id !== appointmentId)
      );
    } catch (error) {
      console.error("Erreur lors de la suppression du rendez-vous :", error);
      alert("Échec de la suppression du rendez-vous.");
    }
  };

  return (
    <Body>
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="w-full lg:w-1/5 bg-white p-6 border border-gray-300 rounded">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Ajouter un rendez-vous
          </h2>
          <AddAppointment
            patients={patients}
            onAppointmentAdd={handleAddAppointment}
          />
        </div>
        <div className="w-full lg:w-4/5 bg-white p-6 border border-gray-300 rounded">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Calendrier des rendez-vous
          </h2>
          <CalendarView
            events={appointments}
            onDelete={handleDeleteAppointment}
          />
        </div>
      </div>
    </Body>
  );
}
