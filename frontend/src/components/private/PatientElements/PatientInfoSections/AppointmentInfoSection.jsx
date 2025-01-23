import { Button } from "@/components/ui/button";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import axios from "../../../../axiosConfig.js";
import Section from "../../Design/Section.jsx";

export default function AppointmentInfoSection({ patientId }) {
  const [appointments, setAppointments] = useState([]);
  const [statusFilter, setStatusFilter] = useState("Tous");
  const [showPastAppointments, setShowPastAppointments] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

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

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleInputChange = (id, field, value) => {
    setAppointments((prevAppointments) =>
      prevAppointments.map((appointment) =>
        appointment.id === id ? { ...appointment, [field]: value } : appointment
      )
    );
  };

  const handleSaveChanges = async () => {
    setLoading(true);
    try {
      await Promise.all(
        appointments.map((appointment) =>
          axios.put(`/appointment/${appointment.id}`, appointment)
        )
      );
      setIsEditing(false);
    } catch (error) {
      console.error("Erreur lors de la mise à jour des rendez-vous:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleDelete = async (id) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer ce rendez-vous ?")) {
      try {
        await axios.delete(`/appointment/${id}`);
        setAppointments(appointments.filter((appt) => appt.id !== id));
      } catch (error) {
        console.error("Erreur lors de la suppression du rendez-vous:", error);
      }
    }
  };

  const filteredAppointments = appointments
    .filter((appointment) =>
      statusFilter === "Tous" ? true : appointment.status === statusFilter
    )
    .filter((appointment) =>
      showPastAppointments
        ? dayjs(appointment.start).isBefore(dayjs())
        : dayjs(appointment.start).isAfter(dayjs())
    );

  return (
    <Section
      title="Rendez-vous à venir"
      count={filteredAppointments.length}
      onEdit={handleEdit}
      hideEditButton={showPastAppointments}
    >
      <div className="mb-4 text-sm flex items-center">
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

        <label htmlFor="pastAppointments" className="ml-4">
          <input
            id="pastAppointments"
            type="checkbox"
            checked={showPastAppointments}
            onChange={(e) => setShowPastAppointments(e.target.checked)}
            className="ml-2 mr-2"
          />
          Afficher les rendez-vous passés
        </label>
      </div>

      {filteredAppointments.length > 0 ? (
        <ul className="text-sm">
          {filteredAppointments.map((appointment) => {
            const isPast = dayjs(appointment.start).isBefore(dayjs());

            return (
              <li
                key={appointment.id}
                className="mb-2 flex items-center w-full"
              >
                {isEditing && !isPast ? (
                  <>
                    <input
                      type="date"
                      value={dayjs(appointment.start).format("YYYY-MM-DD")}
                      onChange={(e) =>
                        handleInputChange(
                          appointment.id,
                          "start",
                          dayjs(e.target.value).toISOString()
                        )
                      }
                      className="border rounded px-2 py-1"
                    />
                    <input
                      type="time"
                      value={dayjs(appointment.start).format("HH:mm")}
                      onChange={(e) =>
                        handleInputChange(
                          appointment.id,
                          "start",
                          dayjs(appointment.start)
                            .hour(Number(e.target.value.split(":")[0]))
                            .minute(Number(e.target.value.split(":")[1]))
                            .toISOString()
                        )
                      }
                      className="border rounded ml-1 px-2 py-1"
                    />
                    <input
                      type="time"
                      value={dayjs(appointment.end).format("HH:mm")}
                      onChange={(e) =>
                        handleInputChange(
                          appointment.id,
                          "end",
                          dayjs(appointment.end)
                            .hour(Number(e.target.value.split(":")[0]))
                            .minute(Number(e.target.value.split(":")[1]))
                            .toISOString()
                        )
                      }
                      className="border rounded ml-1 px-2 py-1"
                    />
                    <input
                      type="text"
                      value={appointment.comment || ""}
                      onChange={(e) =>
                        handleInputChange(
                          appointment.id,
                          "comment",
                          e.target.value
                        )
                      }
                      className="ml-1 border rounded px-2 py-1 w-full"
                      placeholder="Commentaire"
                    />
                    <button
                      onClick={() => handleDelete(appointment.id)}
                      className="ml-2 text-red-500 hover:text-red-700"
                      aria-label="Supprimer le rendez-vous"
                    >
                      <FaTrash size={16} />
                    </button>
                  </>
                ) : (
                  <>
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
                  </>
                )}
              </li>
            );
          })}
        </ul>
      ) : (
        <p>Aucun rendez-vous correspondant.</p>
      )}

      {isEditing && (
        <div className="mt-4 flex gap-2">
          <Button onClick={handleSaveChanges} disabled={loading}>
            {loading ? "Enregistrement..." : "Enregistrer"}
          </Button>
          <Button onClick={handleCancel} variant="secondary" disabled={loading}>
            Annuler
          </Button>
        </div>
      )}
    </Section>
  );
}
