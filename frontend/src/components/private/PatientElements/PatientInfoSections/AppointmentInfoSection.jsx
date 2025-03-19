import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import {
  formatDate,
  formatDateFR,
  isEventInThePast,
} from "../../../../../../shared/utils/dateUtils.js";
import axios from "../../../../axiosConfig.js";
import { useMessageDialog } from "../../../contexts/MessageDialogContext.jsx";
import Section from "../../Design/Section.jsx";
import AppointmentFilters from "./Appointment/AppointmentFilters.jsx";
import AppointmentItem from "./Appointment/AppointmentItem.jsx";

export default function AppointmentInfoSection({ patientId }) {
  const [appointments, setAppointments] = useState([]);
  const [originalAppointments, setOriginalAppointments] = useState([]);
  const [statusFilter, setStatusFilter] = useState("Tous");
  const [showPastAppointments, setShowPastAppointments] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modifiedAppointments, setModifiedAppointments] = useState(new Set());
  const [appointmentsToDelete, setAppointmentsToDelete] = useState([]);
  const { showMessage } = useMessageDialog();

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get(`/appointment/${patientId}`);
        const formattedAppointments = response.data.map((appointment) => ({
          ...appointment,
          date: formatDate(appointment.date),
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
    const formattedDate = value ? formatDate(value) : "";

    setAppointments((prev) =>
      prev.map((appointment) =>
        appointment.id === id
          ? { ...appointment, date: formattedDate }
          : appointment
      )
    );
    setModifiedAppointments((prev) => new Set(prev).add(id));
  };

  const handleDelete = (id) => {
    setAppointments((prev) => prev.filter((appt) => appt.id !== id));

    if (!String(id).startsWith("temp-")) {
      setAppointmentsToDelete((prev) => [...prev, id]);
    }

    setModifiedAppointments((prev) => {
      const newSet = new Set(prev);
      newSet.delete(id);
      return newSet;
    });
  };

  const handleAddAppointment = () => {
    const newAppointment = {
      id: `temp-${Date.now()}-${Math.random()}`,
      patientId,
      date: new Date().toLocaleDateString("fr-FR"),
      startTime: "",
      endTime: "",
      status: "En attente",
    };
    setAppointments((prev) => [...prev, newAppointment]);
    setModifiedAppointments((prev) => new Set(prev).add(newAppointment.id));
  };

  const handleSaveChanges = async () => {
    setLoading(true);

    const invalidAppointments = appointments.filter(
      (appointment) =>
        (!appointment.date || !appointment.startTime || !appointment.endTime) &&
        String(appointment.id).startsWith("temp-")
    );

    if (invalidAppointments.length > 0) {
      showMessage(
        "error",
        "Veuillez remplir tous les champs obligatoires : date, heure de début et heure de fin."
      );
      setLoading(false);
      return;
    }

    try {
      await Promise.all(
        appointmentsToDelete.map((id) => axios.delete(`/appointment/${id}`))
      );

      const updates = appointments
        .filter(
          (appointment) =>
            appointment.id && !String(appointment.id).startsWith("temp-")
        )
        .map((appointment) =>
          axios.put(`/appointment/${appointment.id}`, {
            ...appointment,
            date: formatDate(appointment.date),
          })
        );

      const newAppointments = appointments
        .filter((appointment) => String(appointment.id).startsWith("temp-"))
        .map((appointment) =>
          axios
            .post(`/appointment`, {
              patientId: appointment.patientId,
              date: formatDate(appointment.date),
              startTime: appointment.startTime,
              endTime: appointment.endTime,
              status: appointment.status,
              comment: appointment.comment,
            })
            .then((response) => ({
              tempId: appointment.id,
              newData: response.data,
            }))
        );

      const createdAppointments = await Promise.all(newAppointments);

      setAppointments((prev) =>
        prev.map((appt) => {
          const created = createdAppointments.find(
            (ca) => ca.tempId === appt.id
          );
          return created ? created.newData : appt;
        })
      );

      setIsEditing(false);
      setModifiedAppointments(new Set());
      setAppointmentsToDelete([]);

      const response = await axios.get(`/appointment/${patientId}`);
      const formattedAppointments = response.data.map((appointment) => ({
        ...appointment,
        date: formatDateFR(appointment.date),
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

    const isPastAppointment = isEventInThePast(
      appointment.date,
      appointment.startTime
    );

    if (isEditing) {
      return (
        statusMatch &&
        (!isPastAppointment || modifiedAppointments.has(appointment.id))
      );
    } else {
      return (
        statusMatch &&
        (showPastAppointments ? isPastAppointment : !isPastAppointment)
      );
    }
  });

  return (
    <Section
      title="Rendez-vous"
      count={filteredAppointments.length}
      onEdit={handleEdit}
      hideEditButton={isEditing}
    >
      {!isEditing && (
        <AppointmentFilters
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          showPastAppointments={showPastAppointments}
          setShowPastAppointments={setShowPastAppointments}
        />
      )}
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
        <p className="text-center text-gray-600 text-sm">
          Aucun rendez-vous correspondant.
        </p>
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
