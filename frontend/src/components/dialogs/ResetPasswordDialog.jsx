import React, { useState } from "react";
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
import { Label } from "@/components/ui/label";
import axios from "../../axiosConfig.js";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";

export default function ResetPasswordDialog({ isVisible, onClose }) {
  const { register, handleSubmit, reset } = useForm();
  const [errorMessage, setErrorMessage] = useState("");

  const mutation = useMutation(
    async (data) => {
      return axios.post("/authentification/request-password-reset", data);
    },
    {
      onSuccess: () => {
        setErrorMessage("");
        reset();
        onClose();
      },
      onError: (error) => {
        const message =
          error.response?.data?.message ||
          "Une erreur est survenue. Veuillez réessayer.";
        setErrorMessage(message);
      },
    }
  );

  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  return (
    <Dialog open={isVisible} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="p-10">
        <DialogHeader>
          <DialogTitle className="text-center mb-4">
            Réinitialisation du mot de passe
          </DialogTitle>
          <DialogDescription className="text-justify">
            Veuillez entrer l'adresse e-mail utilisée lors de votre
            <strong> inscription</strong>. Vous recevrez un e-mail contenant
            <strong> un lien</strong> pour réinitialiser votre mot de passe.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="resetEmail">Email</Label>
            <Input
              id="resetEmail"
              type="email"
              placeholder="Votre adresse e-mail"
              {...register("email", { required: "L'email est requis" })}
            />
            {errorMessage && (
              <p className="text-red-500 text-sm mt-1">{errorMessage}</p>
            )}
          </div>
          <DialogFooter className="flex justify-between mt-6">
            <Button variant="secondary" onClick={onClose}>
              Annuler
            </Button>
            <Button type="submit" disabled={mutation.isLoading}>
              {mutation.isLoading ? "Envoi..." : "Envoyer"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
