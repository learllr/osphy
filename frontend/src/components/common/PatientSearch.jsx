import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaMars, FaSearch, FaVenus } from "react-icons/fa";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { calculateAge } from "../../../../shared/utils/dateUtils.js";
import {
  capitalizeFirstLetter,
  formatToUpperCase,
  highlightText,
} from "../../../../shared/utils/textUtils.js";
import axios from "../../axiosConfig.js";
import { useAlert } from "../contexts/AlertContext";

export default function PatientSearch() {
  const { register, watch, setValue } = useForm({
    defaultValues: { searchQuery: "" },
  });
  const searchQuery = watch("searchQuery");
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const navigate = useNavigate();
  const { showAlert } = useAlert();

  const { data: patients = [] } = useQuery(
    "patients",
    async () => {
      const response = await axios.get("/patient");
      return response.data;
    },
    {
      onError: () => {
        showAlert("Erreur lors de la récupération des patients", "destructive");
      },
    }
  );

  const filteredPatients =
    searchQuery.length >= 1
      ? patients.filter((patient) => {
          const fullName =
            `${patient.firstName} ${patient.lastName}`.toLowerCase();
          const birthDate = patient.birthDate.toLowerCase();
          const age = calculateAge(patient.birthDate).toString();
          return (
            fullName.includes(searchQuery.toLowerCase()) ||
            birthDate.includes(searchQuery.toLowerCase()) ||
            age.includes(searchQuery.toLowerCase())
          );
        })
      : patients;

  const handlePatientSelect = (patientId) => {
    navigate(`/patient/${patientId}`);
    setValue("searchQuery", "");
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
    <div className="relative text-sm">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="flex items-center border-2 border-gray-700 rounded-full"
      >
        <FaSearch className="text-primary absolute ml-4" />
        <input
          type="text"
          placeholder="Rechercher par nom, date de naissance ou âge"
          {...register("searchQuery")}
          onFocus={handleSearchFocus}
          onBlur={handleSearchBlur}
          className="w-96 pl-10 py-2 rounded-full bg-white hover:bg-gray-50 text-black text-sm"
        />
      </form>

      {isDropdownVisible && filteredPatients.length > 0 && (
        <ul className="absolute bg-white text-black w-96 mt-1 max-h-60 overflow-y-auto rounded shadow-lg z-10">
          {filteredPatients.map((patient) => {
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
                <span
                  dangerouslySetInnerHTML={{
                    __html: `${highlightText(
                      capitalizeFirstLetter(patient.firstName),
                      searchQuery
                    )} ${highlightText(
                      formatToUpperCase(patient.lastName),
                      searchQuery
                    )} - ${highlightText(
                      patient.birthDate,
                      searchQuery
                    )} (${highlightText(age.toString(), searchQuery)})`,
                  }}
                />
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
