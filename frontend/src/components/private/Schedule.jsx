import dayjs from "dayjs";
import React, { useCallback, useEffect, useState } from "react";
import { FaCheckCircle, FaClock, FaTimesCircle } from "react-icons/fa";
import axios from "../../axiosConfig.js";
import Body from "../common/Body.jsx";
import AddAppointment from "./ScheduleElements/AddAppointment.jsx";
import CalendarView from "./ScheduleElements/CalendarView.jsx";

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

  const determineBackgroundColor = useCallback((patient, birthDate) => {
    if (!dayjs(birthDate).isValid()) {
      console.warn("Date de naissance invalide pour:", patient);
      return "#d1d5db";
    }

    const ageInMonths = dayjs().diff(dayjs(birthDate), "month");
    const colors = {
      Homme:
        ageInMonths < 216
          ? "#3B82F6" // Bleu clair pour enfant garçon
          : "#1E40AF", // Bleu foncé pour adulte homme
      Femme:
        ageInMonths < 216
          ? "#F472B6" // Rose clair pour enfant fille
          : "#9D174D", // Rose foncé pour adulte femme
      default:
        ageInMonths < 216
          ? "#6B7280" // Gris clair pour enfant neutre
          : "#374151", // Gris foncé pour adulte neutre
    };

    return colors[patient.gender] || colors.default;
  }, []);

  const determineStatusIcon = (status) =>
    ({
      Confirmé: (
        <FaCheckCircle className="text-green-500 bg-white rounded-lg" />
      ),
      "En attente": <FaClock className="text-yellow-500 bg-white rounded-lg" />,
      Annulé: <FaTimesCircle className="text-red-500 bg-white rounded-lg" />,
    }[status] || null);

  const formatAppointment = (appointment) => {
    const { patient, status, id, date, startTime, endTime, type } = appointment;
    if (!patient?.birthDate) {
      console.error("Patient ou date de naissance manquants");
      return null;
    }

    return {
      id,
      name: `${patient.firstName} ${patient.lastName}`,
      date,
      startTime,
      endTime,
      extendedProps: {
        status,
        icon: determineStatusIcon(status),
        backgroundColor: determineBackgroundColor(patient, patient.birthDate),
        type,
        startTime,
        endTime,
      },
    };
  };

  const handleAddAppointment = (newAppointment) => {
    const formatted = formatAppointment(newAppointment);
    if (formatted) setAppointments((prev) => [...prev, formatted]);
  };

  return (
    <Body>
      <div className="flex flex-col lg:flex-row gap-6 mx-6">
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
          <CalendarView events={appointments} />
        </div>
      </div>
    </Body>
  );
}
