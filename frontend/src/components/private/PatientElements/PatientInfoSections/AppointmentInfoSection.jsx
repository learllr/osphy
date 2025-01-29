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
          date: dayjs(appt.date, "DD/MM/YYYY").format("YYYY-MM-DD"),
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
    setAppointments((prev) =>
      prev.map((appointment) =>
        appointment.id === id ? { ...appointment, date: value } : appointment
      )
    );
    setModifiedAppointments((prev) => new Set(prev).add(id));
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

  const handleAddAppointment = () => {
    const newAppointment = {
      id: null,
      patientId,
      date: dayjs().format("YYYY-MM-DD"),
      startTime: "",
      endTime: "",
      status: "En attente",
    };
    setAppointments((prev) => [...prev, newAppointment]);
    setModifiedAppointments((prev) => new Set(prev).add(newAppointment.id));
  };

  const handleSaveChanges = async () => {
    setLoading(true);
    try {
      const pastAddedAppointments = appointments.filter((appointment) => {
        const appointmentDateTime = dayjs(
          `${appointment.date} ${appointment.startTime}`,
          "YYYY-MM-DD HH:mm"
        );
        return appointment.id === null && appointmentDateTime.isBefore(dayjs());
      });

      if (pastAddedAppointments.length > 0) {
        alert(
          "Attention : Certains rendez-vous ajoutés ont une date passée et apparaîtront dans 'Rendez-vous passés'."
        );
      }

      await Promise.all(
        appointmentsToDelete.map((id) => axios.delete(`/appointment/${id}`))
      );

      const updates = appointments
        .filter((appointment) => appointment.id !== null)
        .map((appointment) =>
          axios.put(`/appointment/${appointment.id}`, {
            ...appointment,
            date: dayjs(appointment.date, "YYYY-MM-DD").format("DD/MM/YYYY"),
          })
        );

      const newAppointments = appointments
        .filter((appointment) => appointment.id === null)
        .map((appointment) =>
          axios.post(`/appointment`, {
            patientId: appointment.patientId,
            date: dayjs(appointment.date, "YYYY-MM-DD").isValid()
              ? dayjs(appointment.date, "YYYY-MM-DD").format("DD/MM/YYYY")
              : "",
            startTime: appointment.startTime,
            endTime: appointment.endTime,
            status: appointment.status,
          })
        );

      await Promise.all([...updates, ...newAppointments]);

      setIsEditing(false);
      setModifiedAppointments(new Set());
      setAppointmentsToDelete([]);

      const response = await axios.get(`/appointment/${patientId}`);
      const formattedAppointments = response.data.map((appt) => ({
        ...appt,
        date: dayjs(appt.date, "DD/MM/YYYY").format("YYYY-MM-DD"),
        startTime: dayjs(appt.startTime, "HH:mm:ss").format("HH:mm"),
        endTime: dayjs(appt.endTime, "HH:mm:ss").format("HH:mm"),
      }));
      setAppointments(formattedAppointments);
      setOriginalAppointments(formattedAppointments);
    } catch (error) {
      console.error("Erreur lors de la mise à jour des rendez-vous:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setAppointments([...originalAppointments]);
    setIsEditing(false);
    setModifiedAppointments(new Set());
    setAppointmentsToDelete([]);
  };

  const filteredAppointments = appointments.filter((appointment) => {
    const statusMatch =
      statusFilter === "Tous" || appointment.status === statusFilter;
    const appointmentDateTime = dayjs(
      `${appointment.date} ${appointment.startTime}`,
      "YYYY-MM-DD HH:mm"
    );
    const isPastAppointment = appointmentDateTime.isBefore(dayjs());

    if (isEditing) {
      // En mode édition, on affiche les rendez-vous futurs ou ceux qui sont en cours de modification
      return (
        statusMatch &&
        (!isPastAppointment || modifiedAppointments.has(appointment.id))
      );
    } else {
      // Hors mode édition, on affiche soit les passés, soit les futurs
      return (
        statusMatch &&
        (showPastAppointments ? isPastAppointment : !isPastAppointment)
      );
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
          {filteredAppointments.map((appointment, index) => (
            <AppointmentItem
              key={index}
              appointment={appointment}
              isEditing={isEditing}
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
        <>
          <div className="mt-4 flex gap-2">
            <Button onClick={handleAddAppointment} variant="outline">
              Ajouter un rendez-vous
            </Button>
          </div>
          <div className="mt-4 flex gap-2">
            <Button onClick={handleSaveChanges} disabled={loading}>
              {loading ? "Enregistrement..." : "Enregistrer"}
            </Button>
            <Button
              onClick={handleCancel}
              variant="secondary"
              disabled={loading}
            >
              Annuler
            </Button>
          </div>
        </>
      )}
    </Section>
  );
}
