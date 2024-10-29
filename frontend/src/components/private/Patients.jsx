import React, { useEffect, useState } from "react";
import NavBar from "../common/NavBar";
import axios from "../../axiosConfig.js";
import { Link } from "react-router-dom";
import { useUser } from "../contexts/UserContext";
import AddPatientModal from "../modals/AddPatientModal.jsx";

export default function Patients() {
  const [patients, setPatients] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filters, setFilters] = useState({
    id: "",
    gender: "",
    lastName: "",
    firstName: "",
    birthDate: "",
  });

  const { user } = useUser();
  const [showDropdown, setShowDropdown] = useState({});

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get("/api/patient");
        setPatients(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des patients:", error);
      }
    };

    if (user) {
      fetchPatients();
    }
  }, [user]);

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const toggleDropdown = (id) => {
    setShowDropdown((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleDeletePatient = async (id) => {
    try {
      await axios.delete(`/api/patient/${id}`);
      setPatients((prevPatients) => prevPatients.filter((p) => p.id !== id));
    } catch (error) {
      console.error("Erreur lors de la suppression du patient:", error);
    }
  };

  const filteredPatients = patients.filter((patient) => {
    return (
      patient.id.toString().includes(filters.id) &&
      (filters.gender === "" ||
        patient.gender.toLowerCase().includes(filters.gender.toLowerCase())) &&
      patient.lastName.toLowerCase().includes(filters.lastName.toLowerCase()) &&
      patient.firstName
        .toLowerCase()
        .includes(filters.firstName.toLowerCase()) &&
      new Date(patient.birthDate)
        .toLocaleDateString()
        .includes(filters.birthDate)
    );
  });

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handlePatientAdded = (newPatient) => {
    setPatients((prev) => [...prev, newPatient]);
  };

  return (
    <div>
      <NavBar />
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Liste des Patients</h1>
        <button
          onClick={toggleModal}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Ajouter un patient
        </button>
      </div>

      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="border px-4 py-2">
              ID
              <input
                type="text"
                name="id"
                value={filters.id}
                onChange={handleFilterChange}
                className="mt-1 block w-full border border-gray-300 rounded-md"
                placeholder="Filtrer par ID"
              />
            </th>
            <th className="border px-4 py-2">
              Genre
              <select
                name="gender"
                value={filters.gender}
                onChange={handleFilterChange}
                className="mt-1 block w-full border border-gray-300 rounded-md"
              >
                <option value="">Tous</option>
                <option value="homme">Homme</option>
                <option value="femme">Femme</option>
              </select>
            </th>
            <th className="border px-4 py-2">
              Nom
              <input
                type="text"
                name="lastName"
                value={filters.lastName}
                onChange={handleFilterChange}
                className="mt-1 block w-full border border-gray-300 rounded-md"
                placeholder="Filtrer par nom"
              />
            </th>
            <th className="border px-4 py-2">
              Prénom
              <input
                type="text"
                name="firstName"
                value={filters.firstName}
                onChange={handleFilterChange}
                className="mt-1 block w-full border border-gray-300 rounded-md"
                placeholder="Filtrer par prénom"
              />
            </th>
            <th className="border px-4 py-2">
              Date de naissance
              <input
                type="text"
                name="birthDate"
                value={filters.birthDate}
                onChange={handleFilterChange}
                className="mt-1 block w-full border border-gray-300 rounded-md"
                placeholder="Filtrer par date de naissance"
              />
            </th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredPatients.map((patient) => (
            <tr key={patient.id}>
              <td className="border px-4 py-2">{patient.id}</td>
              <td className="border px-4 py-2">{patient.gender}</td>
              <td className="border px-4 py-2">{patient.lastName}</td>
              <td className="border px-4 py-2">{patient.firstName}</td>
              <td className="border px-4 py-2">
                {new Date(patient.birthDate).toLocaleDateString()}
              </td>
              <td className="border px-4 py-2">
                <Link
                  to={`/patient/${patient.id}`}
                  className="text-blue-500 hover:underline"
                >
                  Ouvrir la fiche patient
                </Link>
                <div className="relative inline-block">
                  <button
                    onClick={() => toggleDropdown(patient.id)}
                    className="ml-2 px-2 py-1"
                  >
                    ...
                  </button>
                  {showDropdown[patient.id] && (
                    <ul className="absolute right-0 bg-white border rounded shadow-lg mt-2 z-10 w-52">
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
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <AddPatientModal
        isOpen={isModalOpen}
        onClose={toggleModal}
        onPatientAdded={handlePatientAdded}
      />
    </div>
  );
}
