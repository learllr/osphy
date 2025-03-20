import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import axios from "../../axiosConfig.js";
import { useMessageDialog } from "../contexts/MessageDialogContext.jsx";

export default function AddConsultationDialog({
  patientId,
  isOpen,
  onClose,
  onConsultationAdded,
}) {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      date: new Date().toISOString().split("T")[0],
      patientComplaint: "",
    },
  });
  const { showMessage } = useMessageDialog();

  const addConsultationMutation = useMutation(
    async (consultationData) => {
      const response = await axios.post(`/consultation`, {
        ...consultationData,
        patientId,
      });
      return response.data;
    },
    {
      onSuccess: (newConsultation) => {
        showMessage("success", "Consultation ajoutée avec succès !");
        onConsultationAdded(newConsultation);
        reset();
        onClose();
      },
      onError: (error) => {
        showMessage("error", "Erreur lors de l'ajout de la consultation.");
        console.error("Erreur lors de l'ajout de la consultation :", error);
      },
    }
  );

  const handleFormSubmit = (formData) => {
    addConsultationMutation.mutate(formData);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto p-8">
        <DialogHeader>
          <DialogTitle>Nouvelle consultation</DialogTitle>
          <DialogDescription>
            Remplissez les informations de la consultation pour le patient.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="date">
              Date
              <span className="text-red-500 align-middle leading-none ml-1">
                *
              </span>
            </Label>
            <Input
              id="date"
              type="date"
              {...register("date")}
              className="w-full mt-1 p-2 border"
              required
            />
          </div>

          <div>
            <Label htmlFor="patientComplaint">Motif de consultation</Label>
            <Input
              id="patientComplaint"
              type="text"
              {...register("patientComplaint")}
              placeholder="Motif de consultation"
              className="w-full mt-1 p-2 border"
            />
          </div>

          <DialogFooter className="flex justify-end mt-6">
            <Button
              variant="secondary"
              type="button"
              onClick={() => {
                reset();
                onClose();
              }}
            >
              Annuler
            </Button>
            <Button type="submit" disabled={addConsultationMutation.isLoading}>
              {addConsultationMutation.isLoading ? "Ajout..." : "Ajouter"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
