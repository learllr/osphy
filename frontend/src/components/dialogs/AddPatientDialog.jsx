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
import { Separator } from "@/components/ui/separator";
import React from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { patientSections } from "../../../../shared/constants/fields.js";
import {
  capitalizeFirstLetter,
  formatToUpperCase,
} from "../../../../shared/utils/textUtils.js";
import axios from "../../axiosConfig";
import { useMessageDialog } from "../contexts/MessageDialogContext.jsx";

export default function AddPatientDialog({ isOpen, onClose, onPatientAdded }) {
  const { showMessage } = useMessageDialog();
  const queryClient = useQueryClient();

  const { register, handleSubmit, setValue, reset } = useForm({
    defaultValues: Object.fromEntries(
      patientSections.flatMap((section) =>
        section.fields.map((field) => [field.name, ""])
      )
    ),
  });

  const mutation = useMutation(
    (newPatient) => axios.post("/patient", newPatient),
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries("patients");
        onPatientAdded(data);
        showMessage("success", "Patient ajouté avec succès !");
        onClose();
        reset();
      },
      onError: () => {
        showMessage("error", "Erreur lors de l'ajout du patient.");
      },
    }
  );

  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto p-8 text-sm">
        <DialogHeader>
          <DialogTitle>Ajouter un patient</DialogTitle>
          <DialogDescription>
            Veuillez remplir les informations ci-dessous pour ajouter un nouveau
            patient.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col space-y-2 p-4"
        >
          {patientSections.map((section, index) => (
            <div key={index}>
              <h4 className="text-base font-medium text-gray-600 mb-4">
                {section.title}
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {section.fields.map((field, idx) => (
                  <label key={idx} className="block">
                    <label
                      key={idx}
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      {field.label}{" "}
                      {field.required && (
                        <span className="text-red-500 align-middle leading-none">
                          *
                        </span>
                      )}
                    </label>

                    {field.type === "select" ? (
                      <select
                        {...register(field.name)}
                        className="w-full p-2 border rounded"
                        required={field.required}
                      >
                        {field.options.map((option, i) => (
                          <option key={i} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <Input
                        {...register(field.name, {
                          onChange: (e) => {
                            if (field.format === "uppercase") {
                              setValue(
                                field.name,
                                formatToUpperCase(e.target.value)
                              );
                            }
                            if (field.format === "capitalize") {
                              setValue(
                                field.name,
                                capitalizeFirstLetter(e.target.value)
                              );
                            }
                          },
                        })}
                        type={field.type}
                        placeholder={field.placeholder}
                        required={field.required}
                      />
                    )}
                  </label>
                ))}
              </div>
              {index !== patientSections.length - 1 && (
                <Separator className="my-4" />
              )}
            </div>
          ))}

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
      </DialogContent>
    </Dialog>
  );
}
