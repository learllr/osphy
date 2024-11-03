import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { FaMars, FaVenus, FaSearch } from "react-icons/fa";
import axios from "../../axiosConfig.js";
import { calculateAge } from "../../../utils/dateUtils.js";

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

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.length >= 1) {
      const results = patients.filter((patient) => {
        const fullName =
          `${patient.firstName} ${patient.lastName}`.toLowerCase();
        const birthDate = dayjs(patient.birthDate)
          .format("DD/MM/YYYY")
          .toLowerCase();
        const age = calculateAge(patient.birthDate).toString();
        return (
          fullName.includes(query.toLowerCase()) ||
          birthDate.includes(query.toLowerCase()) ||
          age.includes(query.toLowerCase())
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
      <form onSubmit={(e) => e.preventDefault()} className="flex items-center">
        <FaSearch className="text-gray-400 mr-2 absolute ml-2" />
        <input
          type="text"
          placeholder="Rechercher par nom, date de naissance ou âge"
          value={searchQuery}
          onChange={handleSearchChange}
          onFocus={handleSearchFocus}
          onBlur={handleSearchBlur}
          className="w-96 pl-10 py-2 rounded-full bg-white text-black text-sm"
        />
      </form>

      {isDropdownVisible && filteredPatients.length > 0 && (
        <ul className="absolute bg-white text-black w-96 mt-1 max-h-60 overflow-y-auto rounded shadow-lg z-10">
          {filteredPatients.map((patient) => {
            const formattedBirthDate = dayjs(patient.birthDate).format(
              "DD/MM/YYYY"
            );
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
                  {highlightText(patient.lastName, searchQuery)} -{" "}
                  {highlightText(formattedBirthDate, searchQuery)} (
                  {highlightText(age.toString(), searchQuery)})
                </span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
