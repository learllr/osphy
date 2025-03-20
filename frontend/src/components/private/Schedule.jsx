import React, { useEffect, useState } from "react";
import { determineAppointmentBackgroundColor } from "../../../../shared/utils/colorUtils.js";
import { determineStatusIcon } from "../../../../shared/utils/iconUtils.js";
import axios from "../../axiosConfig.js";
import Body from "../common/Body.jsx";
import { useMessageDialog } from "../contexts/MessageDialogContext.jsx";
import AddAppointment from "./ScheduleElements/AddAppointment.jsx";
import CalendarView from "./ScheduleElements/CalendarView.jsx";

export default function Schedule() {
  const { showMessage } = useMessageDialog();
  const [patients, setPatients] = useState([]);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchData = async (
      endpoint,
      setter,
      successMessage,
      errorMessage
    ) => {
      try {
        const response = await axios.get(endpoint);
        setter(response.data);
        if (successMessage) showMessage("success", successMessage);
      } catch (error) {
        showMessage("error", errorMessage);
      }
    };

    fetchData(
      "/patient",
      setPatients,
      null,
      "Erreur lors de la récupération des patients."
    );
    fetchData(
      "/appointment",
      (data) => setAppointments(data.map(formatAppointment)),
      null,
      "Erreur lors de la récupération des rendez-vous."
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

    const parsedDate = new Date(date);
    if (isNaN(parsedDate)) return null;

    const formattedDate = parsedDate.toISOString().split("T")[0];

    const startDateTime = new Date(`${formattedDate}T${startTime}`);
    const endDateTime = new Date(`${formattedDate}T${endTime}`);

    return {
      id,
      name: `${patient.firstName} ${patient.lastName}`,
      start: startDateTime.toISOString(),
      end: endDateTime.toISOString(),
      extendedProps: {
        id,
        patientId: patient.id,
        status,
        icon: determineStatusIcon(status),
        backgroundColor: determineAppointmentBackgroundColor(
          patient,
          patient.birthDate
        ),
        type,
        startTime: startTime,
        endTime: endTime,
        date: formattedDate,
      },
    };
  };

  const handleAddAppointment = (newAppointment) => {
    const formatted = formatAppointment(newAppointment);
    if (formatted) {
      setAppointments((prev) => [...prev, formatted]);
      showMessage("success", "Rendez-vous ajouté avec succès !");
    }
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
      showMessage("success", "Rendez-vous mis à jour avec succès !");
    } catch (error) {
      showMessage("error", "Échec de la mise à jour du rendez-vous.");
    }
  };

  const handleDeleteAppointment = async (appointmentId) => {
    if (!appointmentId) return;

    try {
      await axios.delete(`/appointment/${appointmentId}`);
      setAppointments((prev) =>
        prev.filter((appointment) => appointment.id !== appointmentId)
      );
      showMessage("success", "Rendez-vous supprimé avec succès !");
    } catch (error) {
      showMessage("error", "Échec de la suppression du rendez-vous.");
    }
  };

  return (
    <Body>
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="w-full lg:w-1/5 bg-white p-6 border border-gray-300 rounded min-w-64">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">
            Ajouter un rendez-vous
          </h2>
          <AddAppointment
            patients={patients}
            onAppointmentAdd={handleAddAppointment}
          />
        </div>
        <div className="w-full lg:w-4/5 bg-white p-6 border border-gray-300 rounded">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">
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
