import React, { useState } from "react";
import PatientSearchModal from "../../modals/PatientSearchModal.jsx";

export default function AddAppointment({ patients, onAppointmentAdd }) {
  const [newAppointment, setNewAppointment] = useState({
    title: "",
    start: "",
    end: "",
    description: "",
    type: "Consultation",
    patient: "",
  });
  const [showModal, setShowModal] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setNewAppointment({ ...newAppointment, [name]: checked });
    } else {
      setNewAppointment({ ...newAppointment, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAppointmentAdd(newAppointment);
    setNewAppointment({
      title: "",
      start: "",
      end: "",
      description: "",
      type: "Consultation",
      patient: "",
    });
  };

  const handlePatientSelect = (patient) => {
    setNewAppointment({
      ...newAppointment,
      patient: `${patient.firstName} ${patient.lastName}`,
    });
    setShowModal(false);
  };

  return (
    <div className="p-5 w-1/4">
      <h2 className="text-2xl font-semibold mb-2">Ajouter un rendez-vous</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-2">
          <label className="block mb-1">Titre :</label>
          <input
            type="text"
            name="title"
            value={newAppointment.title}
            onChange={handleInputChange}
            placeholder="Titre du rendez-vous"
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-2">
          <label className="block mb-1">Description (facultatif) :</label>
          <textarea
            name="description"
            value={newAppointment.description}
            onChange={handleInputChange}
            placeholder="Description du rendez-vous"
            className="w-full p-2 border rounded"
            rows="4"
          />
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
            <option value="Suivi">Suivi</option>
            <option value="Première consultation">Première consultation</option>
            <option value="Urgence">Urgence</option>
          </select>
        </div>
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
