import React, { useState, useEffect } from "react";

export default function PatientSearchModal({ patients, onSelect, onClose }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPatients, setFilteredPatients] = useState([]);

  useEffect(() => {
    const results = patients.filter((patient) =>
      `${patient.firstName} ${patient.lastName}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
    setFilteredPatients(results);
  }, [searchTerm, patients]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow-lg max-w-lg w-full">
        <h2 className="text-2xl font-bold mb-4">Rechercher un patient</h2>
        <input
          type="text"
          placeholder="Rechercher par nom"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        />
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
    </div>
  );
}
