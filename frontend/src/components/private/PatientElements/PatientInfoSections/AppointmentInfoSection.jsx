import { Button } from "@/components/ui/button";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import React, { useEffect, useState } from "react";
import axios from "../../../../axiosConfig.js";
import Section from "../../Design/Section.jsx";
import AppointmentFilters from "./Appointment/AppointmentFilters.jsx";
import AppointmentItem from "./Appointment/AppointmentItem.jsx";

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
  const [appointmentsToDelete, setAppointmentsToDelete] = useState([]);

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
    const formattedDate = dayjs(value, "YYYY-MM-DD").format("DD/MM/YYYY");
    setTempDate((prev) => ({ ...prev, [id]: formattedDate }));
    handleInputChange(id, "date", formattedDate);
  };

  const handleDelete = (id) => {
    setAppointments((prev) => prev.filter((appt) => appt.id !== id));
    setAppointmentsToDelete((prev) => [...prev, id]);
    setModifiedAppointments((prev) => {
      const newSet = new Set(prev);
      newSet.delete(id);
      return newSet;
    });
  };

  const handleSaveChanges = async () => {
    setLoading(true);
    try {
      await Promise.all(
        appointmentsToDelete.map((id) => axios.delete(`/appointment/${id}`))
      );

      await Promise.all(
        appointments.map((appointment) =>
          axios.put(`/appointment/${appointment.id}`, appointment)
        )
      );

      setIsEditing(false);
      setModifiedAppointments(new Set());
      setAppointmentsToDelete([]);
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
    setAppointmentsToDelete([]);
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
      <AppointmentFilters
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        showPastAppointments={showPastAppointments}
        setShowPastAppointments={setShowPastAppointments}
      />
      {filteredAppointments.length > 0 ? (
        <ul className="text-sm">
          {filteredAppointments.map((appointment) => (
            <AppointmentItem
              key={appointment.id}
              appointment={appointment}
              isEditing={isEditing}
              tempDate={tempDate}
              handleDateChange={handleDateChange}
              handleInputChange={handleInputChange}
              handleDelete={handleDelete}
            />
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
