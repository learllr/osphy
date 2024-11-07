import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { useAlert } from "../contexts/AlertContext";
import axios from "../../axiosConfig";
import {
  capitalizeFirstLetter,
  formatToUpperCase,
} from "../../../utils/textUtils.js";

export default function AddPatientDialog({ isOpen, onClose, onPatientAdded }) {
  const { showAlert } = useAlert();
  const queryClient = useQueryClient();

  const { register, handleSubmit, setValue, reset } = useForm({
    defaultValues: {
      gender: "",
      lastName: "",
      firstName: "",
      birthDate: "",
      address: "",
      postalCode: "",
      city: "",
      addressComplement: "",
      mobilePhone: "",
      email: "",
    },
  });

  const mutation = useMutation(
    (newPatient) => axios.post("/patient", newPatient),
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries("patients");
        onPatientAdded(data);
        showAlert("Patient ajouté avec succès", "success");
        onClose();
        reset();
      },
      onError: (error) => {
        showAlert("Erreur lors de l'ajout du patient", "error");
        console.error("Erreur lors de l'ajout du patient:", error);
      },
    }
  );

  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Ajouter un patient</DialogTitle>
          <DialogDescription>
            Veuillez remplir les informations ci-dessous pour ajouter un nouveau
            patient.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="max-h-[90vh]">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col space-y-4 p-4"
          >
            <Separator />
            <h4 className="text-md font-medium text-gray-600">
              Informations personnelles
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label>
                Sexe
                <select
                  {...register("gender")}
                  className="w-full p-2 border rounded"
                  required
                >
                  <option value="">Sélectionnez</option>
                  <option value="Homme">Homme</option>
                  <option value="Femme">Femme</option>
                </select>
              </label>
              <label>
                Nom
                <Input
                  {...register("lastName", {
                    onChange: (e) => {
                      setValue("lastName", formatToUpperCase(e.target.value));
                    },
                  })}
                  required
                  placeholder="DUPONT"
                />
              </label>
              <label>
                Prénom
                <Input
                  {...register("firstName", {
                    onChange: (e) => {
                      setValue(
                        "firstName",
                        capitalizeFirstLetter(e.target.value)
                      );
                    },
                  })}
                  required
                  placeholder="Jean"
                />
              </label>
              <label>
                Date de naissance
                <Input type="date" {...register("birthDate")} required />
              </label>
            </div>

            <Separator className="my-4" />

            <h4 className="text-md font-medium text-gray-600">Coordonnées</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label>
                Adresse
                <Input
                  {...register("address")}
                  placeholder="123 Rue de Paris"
                />
              </label>
              <label>
                Code postal
                <Input {...register("postalCode")} placeholder="75001" />
              </label>
              <label>
                Ville
                <Input {...register("city")} placeholder="Paris" />
              </label>
              <label>
                Complément d'adresse
                <Input
                  {...register("addressComplement")}
                  placeholder="Bâtiment, étage, etc."
                />
              </label>
            </div>

            <Separator className="my-4" />

            <h4 className="text-md font-medium text-gray-600">Contact</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label>
                Email
                <Input
                  type="email"
                  {...register("email")}
                  placeholder="jean.dupont@example.com"
                />
              </label>
              <label>
                Téléphone mobile
                <Input
                  {...register("mobilePhone")}
                  placeholder="06 00 00 00 00"
                />
              </label>
            </div>

            <DialogFooter>
              <Button
                type="submit"
                disabled={mutation.isLoading}
                className="mt-4"
              >
                {mutation.isLoading ? "Enregistrement..." : "Enregistrer"}
              </Button>
              <Button
                type="button"
                onClick={onClose}
                variant="secondary"
                className="mt-4 hover:bg-zinc-200"
              >
                Annuler
              </Button>
            </DialogFooter>
          </form>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
