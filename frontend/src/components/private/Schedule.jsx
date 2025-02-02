import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import React, { useEffect, useState } from "react";
import { determineBackgroundColor } from "../../../../shared/utils/colorUtils.js";
import { determineStatusIcon } from "../../../../shared/utils/iconUtils.js";
import axios from "../../axiosConfig.js";
import Body from "../common/Body.jsx";
import AddAppointment from "./ScheduleElements/AddAppointment.jsx";
import CalendarView from "./ScheduleElements/CalendarView.jsx";

dayjs.extend(utc);

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

  const formatAppointment = ({
    patient,
    status,
    id,
    date,
    startTime,
    endTime,
    type,
  }) => {
    if (!patient?.birthDate || !patient?.id) return null;

    const parsedDate = dayjs(date, ["DD/MM/YYYY", "YYYY-MM-DD"], true);

    const formattedDate = parsedDate.format("YYYY-MM-DD");

    const startDateTime = dayjs(
      `${formattedDate} ${startTime}`,
      "YYYY-MM-DD HH:mm:ss",
      true
    );
    const endDateTime = dayjs(
      `${formattedDate} ${endTime}`,
      "YYYY-MM-DD HH:mm:ss",
      true
    );

    return {
      id,
      name: `${patient.firstName} ${patient.lastName}`,
      start: dayjs.utc(startDateTime).local().format(),
      end: dayjs.utc(endDateTime).local().format(),
      extendedProps: {
        id,
        patientId: patient.id,
        status,
        icon: determineStatusIcon(status),
        backgroundColor: determineBackgroundColor(patient, patient.birthDate),
        type,
        startTime: startDateTime.format("HH:mm:ss"),
        endTime: endDateTime.format("HH:mm:ss"),
        date: formattedDate,
      },
    };
  };

  const handleAddAppointment = (newAppointment) => {
    const formatted = formatAppointment(newAppointment);
    if (formatted) setAppointments((prev) => [...prev, formatted]);
  };

  const handleEditAppointment = async (updatedAppointment) => {
    if (!updatedAppointment || !updatedAppointment.id) return;

    const patient = patients.find((p) => p.id === updatedAppointment.patientId);

    const formattedAppointment = formatAppointment({
      ...updatedAppointment,
      patient,
      date: updatedAppointment.date,
      startTime: updatedAppointment.startTime,
      endTime: updatedAppointment.endTime,
    });

    setAppointments((prev) =>
      prev.map((appointment) =>
        appointment.id === updatedAppointment.id
          ? formattedAppointment
          : appointment
      )
    );

    try {
      await axios.put(
        `/appointment/${updatedAppointment.id}`,
        formattedAppointment
      );
    } catch (error) {
      console.error("Erreur lors de la mise à jour du rendez-vous :", error);
      alert("Échec de la mise à jour du rendez-vous.");
    }
  };

  const handleDeleteAppointment = async (appointmentId) => {
    if (!appointmentId) return;

    try {
      await axios.delete(`/appointment/${appointmentId}`);
      setAppointments((prev) =>
        prev.filter((appointment) => appointment.id !== appointmentId)
      );
    } catch (error) {
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
            onEdit={handleEditAppointment}
            onDelete={handleDeleteAppointment}
          />
        </div>
      </div>
    </Body>
  );
}
