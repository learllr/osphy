import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useEffect, useRef, useState } from "react";
import { FaEllipsisV, FaMars, FaPlus, FaVenus } from "react-icons/fa";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Link } from "react-router-dom";
import {
  calculateAge,
  formatDateFR,
} from "../../../../shared/utils/dateUtils.js";
import {
  capitalizeFirstLetter,
  formatToUpperCase,
  highlightText,
} from "../../../../shared/utils/textUtils.js";
import axios from "../../axiosConfig.js";
import Body from "../common/Body.jsx";
import { useUser } from "../contexts/UserContext";
import AddPatientDialog from "../dialogs/AddPatientDialog.jsx";
import ConfirmDialog from "../dialogs/ConfirmDialog.jsx";
import Pagination from "./Design/Pagination.jsx";
import PatientDropdown from "./PatientDropdown.jsx";

export default function Patients() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [genderFilters, setGenderFilters] = useState({
    homme: true,
    femme: true,
  });
  const { user } = useUser();
  const [showDropdown, setShowDropdown] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const patientsPerPage = 10;
  const queryClient = useQueryClient();
  const dropdownRef = useRef(null);

  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    patientId: null,
  });

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown({});
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const { data: patients = [], refetch } = useQuery(
    "patients",
    async () => {
      const response = await axios.get("/patient");
      return response.data;
    },
    {
      enabled: !!user,
    }
  );

  const deletePatientMutation = useMutation(
    (id) => axios.delete(`/patient/${id}`),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("patients");
      },
    }
  );

  const toggleDropdown = (id) => {
    setShowDropdown((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const confirmDelete = () => {
    if (confirmDialog.patientId) {
      deletePatientMutation.mutate(confirmDialog.patientId);
      setConfirmDialog({ isOpen: false, patientId: null });
    }
  };

  const handleDeletePatient = (id) => {
    setConfirmDialog({ isOpen: true, patientId: id });
  };

  const handleGenderFilterChange = (gender) => {
    setGenderFilters((prev) => ({ ...prev, [gender]: !prev[gender] }));
  };

  const filteredPatients = patients
    .filter((patient) => {
      const fullName = `${patient.firstName} ${patient.lastName}`.toLowerCase();
      const genderMatch =
        (genderFilters.homme && patient.gender.toLowerCase() === "homme") ||
        (genderFilters.femme && patient.gender.toLowerCase() === "femme");
      const birthDateFormatted = formatDateFR(patient.birthDate);
      const age = calculateAge(patient.birthDate);

      return (
        genderMatch &&
        (fullName.includes(searchQuery.toLowerCase()) ||
          birthDateFormatted.includes(searchQuery) ||
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

  const toggleDialog = () => {
    setIsDialogOpen(!isDialogOpen);
  };

  const handlePatientAdded = () => {
    refetch();
  };

  return (
    <Body>
      <div>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-700">
            Liste des Patients
          </h1>
          <Button
            onClick={toggleDialog}
            className="flex items-center text-white px-4 py-2 rounded-lg"
          >
            <FaPlus className="mr-2" /> Ajouter un patient
          </Button>
        </div>

        <div>
          <div className="mb-4">
            <Input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
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
                      <span
                        dangerouslySetInnerHTML={{
                          __html: highlightText(
                            formatToUpperCase(patient.lastName),
                            searchQuery
                          ),
                        }}
                      />{" "}
                      <span
                        dangerouslySetInnerHTML={{
                          __html: highlightText(
                            capitalizeFirstLetter(patient.firstName),
                            searchQuery
                          ),
                        }}
                      />
                    </div>
                    <div className="text-sm text-gray-500">
                      <span
                        dangerouslySetInnerHTML={{
                          __html: highlightText(
                            formatDateFR(patient.birthDate),
                            searchQuery
                          ),
                        }}
                      />{" "}
                      (
                      <span
                        dangerouslySetInnerHTML={{
                          __html: highlightText(`${age}`, searchQuery),
                        }}
                      />
                      )
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
                  <PatientDropdown
                    patientId={patient.id}
                    onDelete={handleDeletePatient}
                  />
                </div>
              </div>
            );
          })}

          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        </div>

        <AddPatientDialog
          isOpen={isDialogOpen}
          onClose={toggleDialog}
          onPatientAdded={handlePatientAdded}
        />
      </div>

      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        onClose={() => setConfirmDialog({ isOpen: false, patientId: null })}
        onConfirm={confirmDelete}
        title="Supprimer le patient"
        message="Êtes-vous sûr de vouloir supprimer ce patient ? Cette action est irréversible."
        confirmText="Supprimer"
        cancelText="Annuler"
      />
    </Body>
  );
}
