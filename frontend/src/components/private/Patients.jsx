import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NavBar from "../common/NavBar";
import axios from "../../axiosConfig.js";
import { useUser } from "../contexts/UserContext";
import AddPatientModal from "../modals/AddPatientModal.jsx";
import { FaPlus, FaEllipsisV, FaMars, FaVenus } from "react-icons/fa";
import dayjs from "dayjs";

export default function Patients() {
  const [patients, setPatients] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [genderFilters, setGenderFilters] = useState({
    homme: true,
    femme: true,
  });
  const { user } = useUser();
  const [showDropdown, setShowDropdown] = useState({});

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get("/patient");
        setPatients(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des patients:", error);
      }
    };

    if (user) {
      fetchPatients();
    }
  }, [user]);

  const toggleDropdown = (id) => {
    setShowDropdown((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleDeletePatient = async (id) => {
    try {
      await axios.delete(`/patient/${id}`);
      setPatients((prevPatients) => prevPatients.filter((p) => p.id !== id));
    } catch (error) {
      console.error("Erreur lors de la suppression du patient:", error);
    }
  };

  const calculateAge = (birthDate) => {
    return dayjs().diff(dayjs(birthDate), "year");
  };

  const handleGenderFilterChange = (gender) => {
    setGenderFilters((prev) => ({ ...prev, [gender]: !prev[gender] }));
  };

  const highlightText = (text, query) => {
    if (!query) return text;
    const parts = text.split(new RegExp(`(${query})`, "gi"));
    return parts.map((part, index) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <span key={index} className="font-bold">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  const filteredPatients = patients.filter((patient) => {
    const fullName = `${patient.firstName} ${patient.lastName}`.toLowerCase();
    const genderMatch =
      (genderFilters.homme && patient.gender.toLowerCase() === "homme") ||
      (genderFilters.femme && patient.gender.toLowerCase() === "femme");
    const birthDate = dayjs(patient.birthDate).format("DD/MM/YYYY");

    return (
      genderMatch &&
      (fullName.includes(searchQuery.toLowerCase()) ||
        birthDate.includes(searchQuery))
    );
  });

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handlePatientAdded = (newPatient) => {
    setPatients((prev) => [...prev, newPatient]);
  };

  return (
    <>
      <NavBar />
      <div className="bg-gray-100 min-h-screen p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-700">
            Liste des Patients
          </h1>
          <button
            onClick={toggleModal}
            className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            <FaPlus className="mr-2" /> Ajouter un patient
          </button>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-4">
          <div className="mb-4">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2"
              placeholder="Rechercher un patient par nom, prénom ou date de naissance"
            />
          </div>

          <div className="flex items-center mb-6">
            <label className="mr-4 text-gray-600">Genre :</label>
            <div className="flex items-center mr-4">
              <input
                type="checkbox"
                id="homme"
                checked={genderFilters.homme}
                onChange={() => handleGenderFilterChange("homme")}
                className="mr-2"
              />
              <label
                htmlFor="homme"
                className="flex items-center text-gray-700"
              >
                <FaMars className="text-blue-500 mr-1" /> Homme
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="femme"
                checked={genderFilters.femme}
                onChange={() => handleGenderFilterChange("femme")}
                className="mr-2"
              />
              <label
                htmlFor="femme"
                className="flex items-center text-gray-700"
              >
                <FaVenus className="text-pink-500 mr-1" /> Femme
              </label>
            </div>
          </div>

          <div>
            {filteredPatients.map((patient) => {
              const birthDate = dayjs(patient.birthDate).format("DD/MM/YYYY");
              const age = calculateAge(patient.birthDate);

              return (
                <div
                  key={patient.id}
                  className="flex justify-between items-center py-4 border-b border-gray-200 relative"
                >
                  <div className="flex items-center">
                    {patient.gender.toLowerCase() === "homme" ? (
                      <FaMars className="text-blue-500 mr-2" />
                    ) : (
                      <FaVenus className="text-pink-500 mr-2" />
                    )}
                    <div>
                      <div className="text-gray-700 font-semibold">
                        {highlightText(
                          patient.lastName.toUpperCase(),
                          searchQuery
                        )}{" "}
                        {highlightText(patient.firstName, searchQuery)}
                      </div>
                      <div className="text-sm text-gray-500">
                        {highlightText(birthDate, searchQuery)} ({age} ans)
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Link
                      to={`/patient/${patient.id}`}
                      className="text-zinc-700 font-semibold px-4 py-2 border border-zinc-700 rounded-full hover:bg-zinc-700 hover:text-white transition-colors"
                    >
                      Ouvrir
                    </Link>
                    <button
                      onClick={() => toggleDropdown(patient.id)}
                      className="text-gray-500 hover:text-gray-700 ml-3 relative"
                    >
                      <FaEllipsisV />
                    </button>
                    {showDropdown[patient.id] && (
                      <ul className="absolute right-0 bg-white border rounded shadow-lg mt-44 z-10 w-52">
                        <li>
                          <button className="px-4 py-2 hover:bg-gray-200 w-full text-left">
                            Modifier
                          </button>
                        </li>
                        <li>
                          <button className="px-4 py-2 hover:bg-gray-200 w-full text-left">
                            Exporter en PDF
                          </button>
                        </li>
                        <li>
                          <button
                            onClick={() => handleDeletePatient(patient.id)}
                            className="px-4 py-2 hover:bg-gray-200 w-full text-left text-red-500"
                          >
                            Supprimer
                          </button>
                        </li>
                      </ul>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <AddPatientModal
          isOpen={isModalOpen}
          onClose={toggleModal}
          onPatientAdded={handlePatientAdded}
        />
      </div>
    </>
  );
}
