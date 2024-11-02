import React, { useState, useEffect } from "react";
import AddPatientModal from "./AddPatientModal";
import axios from "../../axiosConfig";
import { FaSearch } from "react-icons/fa";

export default function PatientSearchModal({ onSelect, onClose }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [showAddPatientModal, setShowAddPatientModal] = useState(false);
  const [patients, setPatients] = useState([]);

  const fetchPatients = async () => {
    try {
      const response = await axios.get("/patient");
      setPatients(response.data);
      setFilteredPatients(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des patients:", error);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  useEffect(() => {
    const results = patients.filter((patient) =>
      `${patient.firstName} ${patient.lastName}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
    setFilteredPatients(results);
  }, [searchTerm, patients]);

  const handleNewPatientClick = () => {
    setShowAddPatientModal(true);
  };

  const handlePatientAdded = () => {
    fetchPatients();
    setShowAddPatientModal(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow-lg max-w-lg w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Rechercher un patient</h2>
          <button
            onClick={handleNewPatientClick}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Ajouter un patient
          </button>
        </div>
        <div className="flex items-center border rounded mb-4 p-2">
          <FaSearch className="text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Rechercher par nom"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full outline-none"
          />
        </div>
        <ul className="max-h-60 overflow-y-auto">
          {filteredPatients.length > 0 ? (
            filteredPatients.map((patient) => (
              <li
                key={patient.id}
                className="p-2 hover:bg-gray-200 cursor-pointer"
                onClick={() => onSelect(patient)}
              >
                {patient.firstName} {patient.lastName}
              </li>
            ))
          ) : (
            <li className="p-2">Aucun patient trouvé.</li>
          )}
        </ul>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 mt-4"
          onClick={onClose}
        >
          Fermer
        </button>
      </div>

      {showAddPatientModal && (
        <AddPatientModal
          isOpen={showAddPatientModal}
          onClose={() => setShowAddPatientModal(false)}
          onPatientAdded={handlePatientAdded}
        />
      )}
    </div>
  );
}
