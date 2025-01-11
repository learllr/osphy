import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { FaCheckCircle, FaClock, FaTimesCircle } from "react-icons/fa";
import axios from "../../axiosConfig.js";
import Body from "../common/Body.jsx";
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

  const determineBackgroundColor = (patient, birthDate) => {
    const birthDateDayjs = dayjs(birthDate);
    if (!birthDateDayjs.isValid()) {
      console.warn("Date de naissance invalide pour le patient:", patient);
      return "#d1d5db";
    }

    const ageInMonths = dayjs().diff(birthDateDayjs, "month");

    if (patient.gender === "Homme") {
      if (ageInMonths < 12) {
        return "#bfdbfe";
      }
      return ageInMonths < 216 ? "#3175cb" : "#1622b1";
    } else if (patient.gender === "Femme") {
      if (ageInMonths < 12) {
        return "#fbcfe8";
      }
      return ageInMonths < 216 ? "#cb318e" : "#b11655";
    }
    return "#d1d5db";
  };

  const determineStatusIcon = (status) => {
    switch (status) {
      case "Confirmé":
        return <FaCheckCircle className="text-green-500 bg-white rounded-lg" />;
      case "En attente":
        return <FaClock className="text-yellow-500 bg-white rounded-lg" />;
      case "Annulé":
        return <FaTimesCircle className="text-red-500 bg-white rounded-lg" />;
      default:
        return null;
    }
  };

  const handleAddAppointment = (newAppointment) => {
    if (!newAppointment.patient || !newAppointment.patient.birthDate) {
      console.error(
        "Patient ou date de naissance manquants dans le rendez-vous"
      );
      return;
    }

    const backgroundColor = determineBackgroundColor(
      newAppointment.patient,
      newAppointment.patient.birthDate
    );

    const statusIcon = determineStatusIcon(newAppointment.status);

    const updatedAppointment = {
      id: newAppointment.id,
      name: `${newAppointment.patient.firstName} ${newAppointment.patient.lastName}`,
      start: newAppointment.start,
      end: newAppointment.end,
      extendedProps: {
        status: newAppointment.status,
        icon: statusIcon,
        backgroundColor,
        type: newAppointment.type,
      },
    };

    setAppointments([...appointments, updatedAppointment]);
  };

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get("/appointment");
        const events = response.data.map((appointment) => {
          const backgroundColor = determineBackgroundColor(
            appointment.patient,
            appointment.patient.birthDate
          );

          const statusIcon = determineStatusIcon(appointment.status);

          return {
            id: appointment.id,
            name: `${appointment.patient.firstName} ${appointment.patient.lastName}`,
            start: appointment.start,
            end: appointment.end,
            extendedProps: {
              status: appointment.status,
              icon: statusIcon,
              backgroundColor,
              type: appointment.type,
            },
          };
        });
        setAppointments(events);
      } catch (error) {
        console.error("Erreur lors de la récupération des rendez-vous:", error);
      }
    };

    fetchAppointments();
  }, []);

  return (
    <Body>
      <div>
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
      </div>
    </Body>
  );
}
