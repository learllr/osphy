import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaMars, FaVenus } from "react-icons/fa";
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
        const response = await axios.get("/patient");
        setPatients(response.data);
        setFilteredPatients(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des patients:", error);
      }
    };

    fetchPatients();
  }, []);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  };

  const highlightText = (text, query) => {
    const parts = text.split(new RegExp(`(${query})`, "gi"));
    return (
      <>
        {parts.map((part, index) =>
          part.toLowerCase() === query.toLowerCase() ? (
            <span key={index} className="font-bold">
              {part}
            </span>
          ) : (
            part
          )
        )}
      </>
    );
  };

  const calculateAge = (birthDate) => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birth.getDate())
    ) {
      age--;
    }
    return age;
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.length >= 1) {
      const results = patients.filter((patient) => {
        const fullName =
          `${patient.firstName} ${patient.lastName}`.toLowerCase();
        const birthDate = new Date(patient.birthDate)
          .toLocaleDateString()
          .toLowerCase();
        return (
          fullName.includes(query.toLowerCase()) ||
          birthDate.includes(query.toLowerCase())
        );
      });
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
          {filteredPatients.map((patient) => {
            const formattedBirthDate = new Date(
              patient.birthDate
            ).toLocaleDateString();
            const age = calculateAge(patient.birthDate);
            const genderIcon =
              patient.gender === "Homme" ? (
                <FaMars className="text-blue-500 mr-2" />
              ) : (
                <FaVenus className="text-pink-500 mr-2" />
              );

            return (
              <li
                key={patient.id}
                className="flex items-center p-2 cursor-pointer hover:bg-gray-200"
                onClick={() => handlePatientSelect(patient.id)}
              >
                {genderIcon}
                <span>
                  {highlightText(
                    capitalizeFirstLetter(patient.firstName),
                    searchQuery
                  )}{" "}
                  {highlightText(patient.lastName.toUpperCase(), searchQuery)} -{" "}
                  {highlightText(formattedBirthDate, searchQuery)} ({age} ans)
                </span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
