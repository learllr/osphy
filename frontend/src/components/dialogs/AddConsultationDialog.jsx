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

export default function AddConsultationDialog({
  patientId,
  isVisible,
  onClose,
  onConsultationAdded,
}) {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      date: new Date().toISOString().split("T")[0],
      patientComplaint: "",
    },
  });

  const mutation = useMutation(
    async (data) => {
      const response = await axios.post(`/consultation`, {
        ...data,
        patientId,
      });
      return response.data;
    },
    {
      onSuccess: (data) => {
        onConsultationAdded(data);
        reset();
        onClose();
      },
      onError: (error) => {
        console.error("Erreur lors de l'ajout de la consultation :", error);
      },
    }
  );

  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  return (
    <Dialog open={isVisible} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto p-8">
        <DialogHeader>
          <DialogTitle>Nouvelle Consultation</DialogTitle>
          <DialogDescription>
            Remplissez les informations de la consultation pour le patient.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="date">Date</Label>
            <Input
              type="date"
              {...register("date")}
              className="w-full mt-2 p-2 border"
            />
          </div>

          <div>
            <Label htmlFor="patientComplaint">Motif de consultation</Label>
            <Input
              type="text"
              {...register("patientComplaint")}
              placeholder="Motif de consultation"
              className="w-full mt-2 p-2 border"
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
            <Button type="submit" disabled={mutation.isLoading}>
              {mutation.isLoading ? "Ajout..." : "Ajouter"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
