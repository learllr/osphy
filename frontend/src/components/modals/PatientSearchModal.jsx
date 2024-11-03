import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import { FaMars, FaVenus, FaSearch } from "react-icons/fa";
import AddPatientModal from "./AddPatientModal";
import axios from "../../axiosConfig";
import { calculateAge } from "../../../utils/dateUtils.js";

export default function PatientSearchModal({ onSelect, onClose }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [showAddPatientModal, setShowAddPatientModal] = useState(false);
  const [patients, setPatients] = useState([]);
  const [genderFilter, setGenderFilter] = useState({
    homme: true,
    femme: true,
  });

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
    const results = patients.filter((patient) => {
      const fullName = `${patient.firstName} ${patient.lastName}`.toLowerCase();
      const formattedBirthDate = dayjs(patient.birthDate).format("DD/MM/YYYY");
      const age = calculateAge(patient.birthDate).toString();
      const gender = patient.gender.toLowerCase();

      const matchesSearchTerm =
        fullName.includes(searchTerm.toLowerCase()) ||
        formattedBirthDate.includes(searchTerm) ||
        age.includes(searchTerm);

      const matchesGenderFilter =
        (gender === "homme" && genderFilter.homme) ||
        (gender === "femme" && genderFilter.femme);

      return matchesSearchTerm && matchesGenderFilter;
    });
    setFilteredPatients(results);
  }, [searchTerm, patients, genderFilter]);

  const handleGenderChange = (gender) => {
    setGenderFilter((prev) => ({
      ...prev,
      [gender]: !prev[gender],
    }));
  };

  const handleNewPatientClick = () => {
    setShowAddPatientModal(true);
  };

  const handlePatientAdded = () => {
    fetchPatients();
    setShowAddPatientModal(false);
  };

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
            placeholder="Rechercher par nom, date de naissance ou âge"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full outline-none"
          />
        </div>

        <div className="flex items-center mb-4">
          <label className="mr-4">Sexe :</label>
          <div className="flex items-center mr-4">
            <input
              type="checkbox"
              checked={genderFilter.homme}
              onChange={() => handleGenderChange("homme")}
              className="mr-1"
            />
            <FaMars className="text-blue-500 mr-1" /> Homme
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={genderFilter.femme}
              onChange={() => handleGenderChange("femme")}
              className="mr-1"
            />
            <FaVenus className="text-pink-500 mr-1" /> Femme
          </div>
        </div>

        <ul className="h-60 overflow-y-auto border rounded p-2">
          {filteredPatients.length > 0 ? (
            filteredPatients.map((patient) => {
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
                  onClick={() => onSelect(patient)}
                >
                  {genderIcon}
                  <span>
                    {highlightText(
                      capitalizeFirstLetter(patient.firstName),
                      searchTerm
                    )}{" "}
                    {highlightText(patient.lastName, searchTerm)} -{" "}
                    {highlightText(formattedBirthDate, searchTerm)} (
                    {highlightText(age.toString(), searchTerm)})
                  </span>
                </li>
              );
            })
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
