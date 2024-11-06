import React, { useState } from "react";
import dayjs from "dayjs";
import { FaMars, FaVenus, FaSearch } from "react-icons/fa";
import AddPatientDialog from "../dialogs/AddPatientDialog.jsx";
import axios from "../../axiosConfig";
import { calculateAge } from "../../../utils/dateUtils.js";
import { useForm } from "react-hook-form";
import { useQuery } from "react-query";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  capitalizeFirstLetter,
  formatToUpperCase,
  highlightText,
} from "../../../utils/textUtils.js";

export default function PatientSearchDialog({ onSelect, onClose }) {
  const { register, watch } = useForm({
    defaultValues: {
      searchTerm: "",
    },
  });
  const searchTerm = watch("searchTerm");

  const [showAddPatientDialog, setShowAddPatientDialog] = useState(false);
  const [genderFilter, setGenderFilter] = useState({
    homme: true,
    femme: true,
  });

  const { data: patients = [], refetch } = useQuery("patients", async () => {
    const response = await axios.get("/patient");
    return response.data;
  });

  const filteredPatients = patients.filter((patient) => {
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

  const handleGenderChange = (gender) => {
    setGenderFilter((prev) => ({
      ...prev,
      [gender]: !prev[gender],
    }));
  };

  const handleNewPatientClick = () => {
    setShowAddPatientDialog(true);
  };

  const handlePatientAdded = () => {
    refetch();
    setShowAddPatientDialog(false);
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Rechercher un patient</DialogTitle>
          <DialogDescription>
            Vous pouvez utiliser les filtres ci-dessous pour trouver un patient
            par nom, date de naissance ou âge.
          </DialogDescription>
        </DialogHeader>

        <Separator />

        <form onSubmit={(e) => e.preventDefault()}>
          <div className="flex items-center border rounded mb-2 p-2">
            <FaSearch className="text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Rechercher par nom, date de naissance ou âge"
              {...register("searchTerm")}
              className="w-full outline-none"
            />
          </div>
        </form>

        <div className="flex items-center mb-2">
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

        <ScrollArea className="h-60">
          <ul className="border rounded p-2">
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
                    <span
                      dangerouslySetInnerHTML={{
                        __html: `${highlightText(
                          capitalizeFirstLetter(patient.firstName),
                          searchTerm
                        )} ${highlightText(
                          formatToUpperCase(patient.lastName),
                          searchTerm
                        )} - ${highlightText(
                          formattedBirthDate,
                          searchTerm
                        )} (${highlightText(age.toString(), searchTerm)})`,
                      }}
                    />
                  </li>
                );
              })
            ) : (
              <li className="p-2">Aucun patient trouvé.</li>
            )}
          </ul>
        </ScrollArea>

        <DialogFooter>
          <Button
            onClick={handleNewPatientClick}
            className="bg-green-500 text-white mt-4 hover:bg-green-600"
          >
            Ajouter un patient
          </Button>
          <Button
            onClick={onClose}
            className="bg-red-500 text-white mt-4 hover:bg-red-600"
          >
            Fermer
          </Button>
        </DialogFooter>
      </DialogContent>

      {showAddPatientDialog && (
        <AddPatientDialog
          isOpen={showAddPatientDialog}
          onClose={() => setShowAddPatientDialog(false)}
          onPatientAdded={handlePatientAdded}
        />
      )}
    </Dialog>
  );
}
