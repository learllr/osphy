import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../axiosConfig.js";

export default function PatientSearch() {
  const [searchQuery, setSearchQuery] = useState("");
  const [patients, setPatients] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get("/api/patient");
        setPatients(response.data);
        setFilteredPatients(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des patients:", error);
      }
    };

    fetchPatients();
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);

    if (e.target.value.length >= 1) {
      const results = patients.filter((patient) =>
        `${patient.firstName} ${patient.lastName}`
          .toLowerCase()
          .includes(e.target.value.toLowerCase())
      );
      setFilteredPatients(results);
    } else {
      setFilteredPatients(patients);
    }
  };

  const handlePatientSelect = (patientId) => {
    navigate(`/patient/${patientId}`);
    setSearchQuery("");
    setFilteredPatients(patients);
    setIsDropdownVisible(false);
  };

  const handleSearchFocus = () => {
    setIsDropdownVisible(true);
  };

  const handleSearchBlur = () => {
    setTimeout(() => {
      setIsDropdownVisible(false);
    }, 200);
  };

  return (
    <div className="relative">
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          placeholder="Rechercher un patient"
          value={searchQuery}
          onChange={handleSearchChange}
          onFocus={handleSearchFocus}
          onBlur={handleSearchBlur}
          className="w-96 px-4 py-2 rounded-full bg-white text-black"
        />
      </form>

      {isDropdownVisible && filteredPatients.length > 0 && (
        <ul className="absolute bg-white text-black w-96 mt-1 max-h-60 overflow-y-auto rounded shadow-lg z-10">
          {filteredPatients.map((patient) => (
            <li
              key={patient.id}
              className="p-2 cursor-pointer hover:bg-gray-200"
              onClick={() => handlePatientSelect(patient.id)}
            >
              {patient.firstName} {patient.lastName}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
