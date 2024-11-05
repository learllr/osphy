import React, { useState, useEffect } from "react";
import axios from "../../../axiosConfig.js";
import PatientSearchDialog from "../../dialogs/PatientSearchDialog.jsx";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

export default function AddAppointment({ patients, onAppointmentAdd }) {
  const [newAppointment, setNewAppointment] = useState({
    start: "",
    end: "",
    type: "Consultation",
    patient: null,
    status: "En attente",
  });

  const [showModal, setShowModal] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAppointment((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const selectedPatient = newAppointment.patient;

    if (!selectedPatient) {
      alert("Veuillez sélectionner un patient.");
      return;
    }

    const startDate = dayjs(newAppointment.start).utc();
    const endDate = dayjs(newAppointment.end).utc();

    if (!startDate.isBefore(endDate)) {
      alert("La date de fin doit être après la date de début.");
      return;
    }

    try {
      const response = await axios.post("/appointment", {
        userId: selectedPatient.userId,
        patientId: selectedPatient.id,
        start: startDate.format(),
        end: endDate.format(),
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
        patient: null,
        status: "En attente",
      });
    } catch (error) {
      console.error("Erreur lors de la création du rendez-vous :", error);
    }
  };

  const handlePatientSelect = (patient) => {
    setNewAppointment((prev) => ({
      ...prev,
      patient: patient,
    }));
    setShowModal(false);
  };

  return (
    <div className="p-2 bg-white w-full">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Patient :</label>
          <div className="flex space-x-2">
            <div className="w-full p-2 border rounded bg-gray-100 text-gray-700">
              {newAppointment.patient ? (
                `${newAppointment.patient.firstName} ${newAppointment.patient.lastName}`
              ) : (
                <span className="text-gray-500">Aucun patient sélectionné</span>
              )}
            </div>
            <button
              type="button"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              onClick={() => setShowModal(true)}
            >
              Rechercher
            </button>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-1">
            Type de rendez-vous :
          </label>
          <select
            name="type"
            value={newAppointment.type}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          >
            <option value="Suivi">Suivi</option>
            <option value="Première consultation">Première consultation</option>
            <option value="Urgence">Urgence</option>
            <option value="Bilan">Bilan</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-1">
            Date de début du rendez-vous :
          </label>
          <input
            type="datetime-local"
            name="start"
            value={newAppointment.start}
            onChange={handleInputChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-1">
            Date de fin du rendez-vous :
          </label>
          <input
            type="datetime-local"
            name="end"
            value={newAppointment.end}
            onChange={handleInputChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Statut :</label>
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
          className="bg-blue-500 text-white px-4 py-2 rounded w-full hover:bg-blue-600"
        >
          Ajouter
        </button>
      </form>

      {showModal && (
        <PatientSearchDialog
          patients={patients}
          onSelect={handlePatientSelect}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}
