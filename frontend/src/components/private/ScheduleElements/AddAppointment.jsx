import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "../../../axiosConfig.js";
import { useMessageDialog } from "../../contexts/MessageDialogContext.jsx";
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

  const { showMessage } = useMessageDialog();
  const [showModal, setShowModal] = useState(false);
  const patient = watch("patient");

  const handlePatientSelect = (selectedPatient) => {
    setValue("patient", selectedPatient);
    setShowModal(false);
  };

  const onSubmit = async (data) => {
    const { date, startTime, endTime, patient, type } = data;

    if (!patient) {
      showMessage("error", "Veuillez sélectionner un patient.");
      return;
    }

    if (!date || !startTime || !endTime) {
      showMessage(
        "error",
        "Veuillez remplir tous les champs de date et d'heure."
      );
      return;
    }

    if (
      new Date(`${date} ${startTime}`).getTime() >=
      new Date(`${date} ${endTime}`).getTime()
    ) {
      showMessage("error", "L'heure de fin doit être après l'heure de début.");
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
      showMessage("error", "Erreur lors de la création du rendez-vous.");
    }
  };

  return (
    <div className="bg-white w-full text-sm">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-1 items-center">
            Patient
            <span className="text-red-500 ml-1">*</span>
          </label>
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
          <label className="block text-gray-700 mb-1 items-center">
            Type de rendez-vous
            <span className="text-red-500 ml-1">*</span>
          </label>
          <select
            {...register("type", { required: true })}
            className="w-full p-2 border rounded"
            aria-invalid={watch("type") ? "false" : "true"}
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
          <label className="block text-gray-700 mb-1 items-center">
            Date du rendez-vous
            <span className="text-red-500 ml-1">*</span>
          </label>
          <input
            type="date"
            {...register("date", { required: true })}
            className="w-full p-2 border rounded"
            aria-invalid={watch("date") ? "false" : "true"}
            min="1900-01-01"
            max="2500-12-31"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-1 items-center">
            Heure de début
            <span className="text-red-500 ml-1">*</span>
          </label>
          <input
            type="time"
            {...register("startTime", { required: true })}
            className="w-full p-2 border rounded"
            aria-invalid={watch("startTime") ? "false" : "true"}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-1 items-center">
            Heure de fin
            <span className="text-red-500 ml-1">*</span>
          </label>
          <input
            type="time"
            {...register("endTime", { required: true })}
            className="w-full p-2 border rounded"
            aria-invalid={watch("endTime") ? "false" : "true"}
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
