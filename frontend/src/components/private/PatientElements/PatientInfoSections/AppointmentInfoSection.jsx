import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import axios from "../../../../axiosConfig.js";
import Section from "../../Design/Section.jsx";

export default function AppointmentInfoSection({ patientId }) {
  const [appointments, setAppointments] = useState([]);
  const [statusFilter, setStatusFilter] = useState("Tous");

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get(`/appointment/${patientId}`);
        setAppointments(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des rendez-vous:", error);
      }
    };

    fetchAppointments();
  }, [patientId]);

  const filteredAppointments =
    statusFilter === "Tous"
      ? appointments
      : appointments.filter(
          (appointment) => appointment.status === statusFilter
        );

  return (
    <Section title="Rendez-vous à venir" count={filteredAppointments.length}>
      <div className="mb-4">
        <label htmlFor="statusFilter" className="mr-2">
          Filtrer par statut :
        </label>
        <select
          id="statusFilter"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border border-gray-300 rounded px-2 py-1"
        >
          <option value="Tous">Tous</option>
          <option value="Confirmé">Confirmé</option>
          <option value="En attente">En attente</option>
          <option value="Annulé">Annulé</option>
        </select>
      </div>

      {filteredAppointments.length > 0 ? (
        <ul>
          {filteredAppointments.map((appointment) => (
            <li key={appointment.id} className="mb-2 flex items-center">
              <span
                className={`w-2 h-2 rounded-full mr-2 ${
                  appointment.status === "Confirmé"
                    ? "bg-green-500"
                    : appointment.status === "En attente"
                    ? "bg-orange-500"
                    : "bg-red-500"
                }`}
              ></span>
              {dayjs(appointment.start).format("DD/MM/YYYY")}{" "}
              <span className="text-gray-500 ml-1">
                ({dayjs(appointment.start).format("HH:mm")} -{" "}
                {dayjs(appointment.end).format("HH:mm")})
              </span>
              {appointment.comment && (
                <span className="ml-4 text-gray-600 italic">
                  {appointment.comment}
                </span>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>Aucun rendez-vous correspondant.</p>
      )}
    </Section>
  );
}
