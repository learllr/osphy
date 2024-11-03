import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NavBar from "../common/NavBar";
import axios from "../../axiosConfig.js";
import { useUser } from "../contexts/UserContext";
import AddPatientModal from "../modals/AddPatientModal.jsx";
import { FaPlus, FaEllipsisV, FaMars, FaVenus } from "react-icons/fa";
import dayjs from "dayjs";
import { calculateAge } from "../../../utils/dateUtils.js";

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
  const [currentPage, setCurrentPage] = useState(1);
  const patientsPerPage = 10;

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

  const filteredPatients = patients
    .filter((patient) => {
      const fullName = `${patient.firstName} ${patient.lastName}`.toLowerCase();
      const genderMatch =
        (genderFilters.homme && patient.gender.toLowerCase() === "homme") ||
        (genderFilters.femme && patient.gender.toLowerCase() === "femme");
      const birthDate = dayjs(patient.birthDate).format("DD/MM/YYYY");
      const age = calculateAge(patient.birthDate);

      return (
        genderMatch &&
        (fullName.includes(searchQuery.toLowerCase()) ||
          birthDate.includes(searchQuery) ||
          `${age}`.includes(searchQuery))
      );
    })
    .sort((a, b) => {
      if (a.lastName.toLowerCase() < b.lastName.toLowerCase()) return -1;
      if (a.lastName.toLowerCase() > b.lastName.toLowerCase()) return 1;
      if (a.firstName.toLowerCase() < b.firstName.toLowerCase()) return -1;
      if (a.firstName.toLowerCase() > b.firstName.toLowerCase()) return 1;
      return 0;
    });

  const totalPages = Math.ceil(filteredPatients.length / patientsPerPage);
  const paginatedPatients = filteredPatients.slice(
    (currentPage - 1) * patientsPerPage,
    currentPage * patientsPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handlePatientAdded = (newPatient) => {
    setPatients((prev) => [...prev, newPatient]);
  };

  return (
    <>
      <NavBar />
      <div className="min-h-screen p-8">
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

        <div>
          <div className="mb-4">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2"
              placeholder="Rechercher un patient par nom, prénom, date de naissance ou âge"
            />
          </div>

          <div className="flex items-center mb-6">
            <label className="mr-4 text-gray-600">Sexe :</label>
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
            <div className="flex items-center mr-4">
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

          {paginatedPatients.map((patient) => {
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
                      {highlightText(patient.lastName, searchQuery)}{" "}
                      {highlightText(patient.firstName, searchQuery)}
                    </div>
                    <div className="text-sm text-gray-500">
                      {highlightText(birthDate, searchQuery)} (
                      {highlightText(`${age}`, searchQuery)})
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

          <div className="flex justify-center mt-6">
            {Array.from({ length: totalPages }, (_, index) => index + 1).map(
              (pageNumber) => (
                <button
                  key={pageNumber}
                  onClick={() => handlePageChange(pageNumber)}
                  className={`px-3 py-1 border rounded mx-1 ${
                    currentPage === pageNumber
                      ? "bg-blue-500 text-white"
                      : "bg-white text-gray-700"
                  }`}
                >
                  {pageNumber}
                </button>
              )
            )}
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
