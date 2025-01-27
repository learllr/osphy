import { Button } from "@/components/ui/button";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import React, { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import axios from "../../../../axiosConfig.js";
import Section from "../../Design/Section.jsx";

dayjs.extend(customParseFormat);

export default function AppointmentInfoSection({ patientId }) {
  const [appointments, setAppointments] = useState([]);
  const [originalAppointments, setOriginalAppointments] = useState([]);
  const [tempDate, setTempDate] = useState({});
  const [statusFilter, setStatusFilter] = useState("Tous");
  const [showPastAppointments, setShowPastAppointments] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modifiedAppointments, setModifiedAppointments] = useState(new Set());

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get(`/appointment/${patientId}`);
        const formattedAppointments = response.data.map((appt) => ({
          ...appt,
          date: dayjs(appt.date, "DD/MM/YYYY").format("DD/MM/YYYY"),
          startTime: dayjs(appt.startTime, "HH:mm:ss").format("HH:mm"),
          endTime: dayjs(appt.endTime, "HH:mm:ss").format("HH:mm"),
        }));
        setAppointments(formattedAppointments);
        setOriginalAppointments(formattedAppointments);
      } catch (error) {
        console.error("Erreur lors de la récupération des rendez-vous:", error);
      }
    };

    fetchAppointments();
  }, [patientId]);

  const handleEdit = () => {
    setOriginalAppointments([...appointments]);
    setIsEditing(true);
  };

  const handleInputChange = (id, field, value) => {
    setAppointments((prev) =>
      prev.map((appointment) =>
        appointment.id === id ? { ...appointment, [field]: value } : appointment
      )
    );
    setModifiedAppointments((prev) => new Set(prev).add(id));
  };

  const handleDateChange = (id, value) => {
    setTempDate((prev) => ({ ...prev, [id]: value }));

    if (/^\d{2}\/\d{2}\/\d{4}$/.test(value)) {
      handleInputChange(id, "date", value);
    }
  };

  const handleSaveChanges = async () => {
    setLoading(true);

    const pastModifiedAppointments = appointments.filter((appointment) => {
      const originalAppointment = originalAppointments.find(
        (orig) => orig.id === appointment.id
      );

      const newDateTime = dayjs(
        `${appointment.date} ${appointment.startTime}`,
        "DD/MM/YYYY HH:mm"
      );
      const isPast = newDateTime.isBefore(dayjs());

      return (
        isPast &&
        originalAppointment &&
        (originalAppointment.date !== appointment.date ||
          originalAppointment.startTime !== appointment.startTime)
      );
    });

    if (pastModifiedAppointments.length > 0) {
      alert(
        "Attention : Certains rendez-vous ont une date passée, ils seront tout de même enregistrés."
      );
    }

    try {
      await Promise.all(
        appointments.map((appointment) =>
          axios.put(`/appointment/${appointment.id}`, appointment)
        )
      );
      setIsEditing(false);
      setModifiedAppointments(new Set());
    } catch (error) {
      console.error("Erreur lors de la mise à jour des rendez-vous:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setAppointments([...originalAppointments]);
    setTempDate({});
    setIsEditing(false);
    setModifiedAppointments(new Set());
  };

  const handleDelete = (id) => {
    setAppointments((prev) => prev.filter((appt) => appt.id !== id));
    setModifiedAppointments((prev) => {
      const newSet = new Set(prev);
      newSet.delete(id);
      return newSet;
    });
  };

  const filteredAppointments = appointments.filter((appointment) => {
    const statusMatch =
      statusFilter === "Tous" || appointment.status === statusFilter;

    const isModified = modifiedAppointments.has(appointment.id);

    const appointmentDateTime = dayjs(
      `${appointment.date} ${appointment.startTime}`,
      "DD/MM/YYYY HH:mm"
    );
    const isPastAppointment = appointmentDateTime.isBefore(dayjs());

    if (isEditing) {
      return (
        statusMatch &&
        (isModified || showPastAppointments || !isPastAppointment)
      );
    } else {
      if (showPastAppointments) {
        return statusMatch && isPastAppointment;
      } else {
        return statusMatch && !isPastAppointment;
      }
    }
  });

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
          {filteredAppointments.map((appointment) => (
            <li key={appointment.id} className="mb-2 flex items-center w-full">
              {isEditing ? (
                <>
                  <input
                    type="text"
                    value={tempDate[appointment.id] || appointment.date}
                    onChange={(e) =>
                      handleDateChange(appointment.id, e.target.value)
                    }
                    className="border rounded px-2 py-1"
                    placeholder="JJ/MM/AAAA"
                  />
                  <input
                    type="time"
                    value={appointment.startTime}
                    onChange={(e) =>
                      handleInputChange(
                        appointment.id,
                        "startTime",
                        e.target.value
                      )
                    }
                    className="border rounded ml-1 px-2 py-1"
                  />
                  <input
                    type="time"
                    value={appointment.endTime}
                    onChange={(e) =>
                      handleInputChange(
                        appointment.id,
                        "endTime",
                        e.target.value
                      )
                    }
                    className="border rounded ml-1 px-2 py-1"
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
                  {appointment.date}{" "}
                  <span className="text-gray-500 ml-1">
                    ({appointment.startTime} - {appointment.endTime})
                  </span>
                </>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm">Aucun rendez-vous correspondant.</p>
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
