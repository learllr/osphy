import React, { useState, useEffect } from "react";
import axios from "../../../axiosConfig.js";
import PatientSearchModal from "../../modals/PatientSearchModal.jsx";

export default function AddAppointment({ patients, onAppointmentAdd }) {
  const [newAppointment, setNewAppointment] = useState({
    start: "",
    end: "",
    type: "Consultation",
    patient: "",
    status: "En attente",
  });

  const [showModal, setShowModal] = useState(false);
  const defaultSettings = {
    consultationDuration: 60,
  };
  const [consultationDuration, setConsultationDuration] = useState(
    defaultSettings.consultationDuration
  );

  useEffect(() => {
    const fetchUserSettings = async () => {
      try {
        const response = await axios.get("/user/settings");
        setConsultationDuration(
          response.data
            ? response.data.consultationDuration
            : consultationDuration
        );
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des paramètres utilisateur :",
          error
        );
      }
    };
    fetchUserSettings();
  }, []);

  const calculateEndDate = (startDate) => {
    const endDate = new Date(
      startDate.getTime() + consultationDuration * 60000
    );

    const year = endDate.getFullYear();
    const month = String(endDate.getMonth() + 1).padStart(2, "0");
    const day = String(endDate.getDate()).padStart(2, "0");
    const hours = String(endDate.getHours()).padStart(2, "0");
    const minutes = String(endDate.getMinutes()).padStart(2, "0");

    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setNewAppointment((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const isOverlapping = (start, end, existingAppointments) => {
    return existingAppointments.some((appointment) => {
      const existingStart = new Date(appointment.start);
      const existingEnd = new Date(appointment.end);

      return (
        (start >= existingStart && start < existingEnd) || // Start time is during another appointment
        (end > existingStart && end <= existingEnd) || // End time is during another appointment
        (start <= existingStart && end >= existingEnd) // New appointment encompasses existing appointment
      );
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const selectedPatient = patients.find(
      (patient) =>
        `${patient.firstName} ${patient.lastName}` === newAppointment.patient
    );

    if (!selectedPatient) {
      alert("Veuillez sélectionner un patient.");
      return;
    }

    const startDate = new Date(newAppointment.start);
    const endDate =
      newAppointment.type === "Autres"
        ? newAppointment.end
        : calculateEndDate(startDate);

    try {
      const appointmentsResponse = await axios.get("/appointment");
      const existingAppointments = appointmentsResponse.data;

      if (isOverlapping(startDate, new Date(endDate), existingAppointments)) {
        alert("Ce créneau horaire chevauche un autre rendez-vous.");
        return;
      }

      const response = await axios.post("/appointment", {
        userId: selectedPatient.userId,
        patientId: selectedPatient.id,
        start: newAppointment.start,
        end: endDate,
        status: newAppointment.status,
      });

      onAppointmentAdd({
        ...response.data,
        patient: selectedPatient,
      });

      setNewAppointment({
        start: "",
        end: "",
        type: "Consultation",
        patient: "",
        status: "En attente",
      });
    } catch (error) {
      console.error("Erreur lors de la création du rendez-vous :", error);
    }
  };

  const handlePatientSelect = (patient) => {
    setNewAppointment((prev) => ({
      ...prev,
      patient: `${patient.firstName} ${patient.lastName}`,
    }));
    setShowModal(false);
  };

  return (
    <div className="p-5 w-1/4">
      <h2 className="text-2xl font-semibold mb-2">Ajouter un rendez-vous</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-1">Patient :</label>
          <div className="flex space-x-2">
            <div className="w-full p-2 border rounded bg-gray-100">
              {newAppointment.patient ? (
                newAppointment.patient
              ) : (
                <span className="text-gray-500">Aucun patient sélectionné</span>
              )}
            </div>
            <button
              type="button"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              onClick={() => setShowModal(true)}
            >
              Rechercher un patient
            </button>
          </div>
        </div>

        <div className="mb-2">
          <label className="block mb-1">Type de rendez-vous :</label>
          <select
            name="type"
            value={newAppointment.type}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          >
            <option value="Consultation">Consultation</option>
            <option value="Première consultation">Première consultation</option>
            <option value="Urgence">Urgence</option>
            <option value="Autres">Autre</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block mb-1">Date de début :</label>
          <input
            type="datetime-local"
            name="start"
            value={newAppointment.start}
            onChange={handleInputChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>

        {newAppointment.type === "Autres" && (
          <div className="mb-4">
            <label className="block mb-1">Date de fin :</label>
            <input
              type="datetime-local"
              name="end"
              value={newAppointment.end}
              onChange={handleInputChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>
        )}

        <div className="mb-4">
          <label className="block mb-1">Statut :</label>
          <select
            name="status"
            value={newAppointment.status}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          >
            <option value="En attente">En attente</option>
            <option value="Confirmé">Confirmé</option>
            <option value="Annulé">Annulé</option>
          </select>
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Ajouter
        </button>
      </form>

      {showModal && (
        <PatientSearchModal
          patients={patients}
          onSelect={handlePatientSelect}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}
