import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "../../../axiosConfig.js";
import PatientSearchDialog from "../../dialogs/PatientSearchDialog.jsx";

export default function AddAppointment({ patients, onAppointmentAdd }) {
  const { register, handleSubmit, setValue, watch, reset } = useForm({
    defaultValues: {
      date: "",
      startTime: "",
      endTime: "",
      type: "Suivi",
      patient: null,
      status: "En attente",
    },
  });

  const [showModal, setShowModal] = useState(false);

  const patient = watch("patient");

  const handlePatientSelect = (selectedPatient) => {
    setValue("patient", selectedPatient);
    setShowModal(false);
  };

  const onSubmit = async (data) => {
    const { date, startTime, endTime, patient, type } = data;

    if (!patient) {
      alert("Veuillez sélectionner un patient.");
      return;
    }

    if (!date || !startTime || !endTime) {
      alert("Veuillez remplir tous les champs de date et d'heure.");
      return;
    }

    if (
      new Date(`${date} ${startTime}`).getTime() >=
      new Date(`${date} ${endTime}`).getTime()
    ) {
      alert("L'heure de fin doit être après l'heure de début.");
      return;
    }

    try {
      const response = await axios.post("/appointment", {
        userId: patient.userId,
        patientId: patient.id,
        type,
        date,
        startTime,
        endTime,
        status: "En attente",
      });

      onAppointmentAdd({
        ...response.data,
        patient,
      });

      reset();
    } catch (error) {
      console.error("Erreur lors de la création du rendez-vous :", error);
    }
  };

  return (
    <div className="bg-white w-full text-sm">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Patient :</label>
          <div className="w-full p-2 border rounded bg-gray-100 text-gray-700">
            {patient ? (
              `${patient.firstName} ${patient.lastName}`
            ) : (
              <span className="text-gray-500">Aucun patient sélectionné</span>
            )}
          </div>
          <Button onClick={() => setShowModal(true)} className="w-full mt-2">
            Rechercher
          </Button>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-1">
            Type de rendez-vous :
          </label>
          <select
            {...register("type", { required: true })}
            className="w-full p-2 border rounded"
          >
            <option value="Suivi">Suivi</option>
            <option value="Première consultation">Première consultation</option>
            <option value="Urgence">Urgence</option>
            <option value="Bilan">Bilan</option>
            <option value="Pédiatrique">Pédiatrique</option>
            <option value="Consultation">Consultation</option>
            <option value="Autre">Autre</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-1">
            Date du rendez-vous :
          </label>
          <input
            type="date"
            {...register("date", { required: true })}
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Heure de début :</label>
          <input
            type="time"
            {...register("startTime", { required: true })}
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Heure de fin :</label>
          <input
            type="time"
            {...register("endTime", { required: true })}
            className="w-full p-2 border rounded"
          />
        </div>

        <Button type="submit" className="w-full">
          Ajouter
        </Button>
      </form>

      {showModal && (
        <PatientSearchDialog
          patients={patients}
          onSelect={handlePatientSelect}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}
