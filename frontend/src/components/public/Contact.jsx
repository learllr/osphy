"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import * as React from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import {
  capitalizeFirstLetter,
  formatToUpperCase,
} from "../../../../shared/utils/textUtils.js";
import Body from "../common/Body.jsx";
import { useMessageDialog } from "../contexts/MessageDialogContext.jsx";
import Combobox from "../private/Design/Combobox.jsx";

export default function Contact() {
  const { showMessage } = useMessageDialog();
  const subjects = [
    { value: "question", label: "Question" },
    { value: "feedback", label: "Retour (bugs, critiques, suggestions...)" },
    { value: "collaboration", label: "Collaboration" },
    { value: "other", label: "Autre" },
  ];

  const { register, handleSubmit, setValue, reset } = useForm();

  const mutation = useMutation({
    mutationFn: async (data) => {
      const response = await axios.post("/api/contact", data);
      return response.data;
    },
    onSuccess: () => {
      showMessage("success", "Message envoyé avec succès!");
      reset();
    },
    onError: () => {
      showMessage("error", "Une erreur est survenue, veuillez réessayer.");
    },
  });

  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  return (
    <Body>
      <section className="flex items-center justify-center md:mx-14">
        <div className="container mx-auto flex max-w-screen-xl flex-col justify-between gap-6 lg:flex-row lg:gap-10 lg:px-8">
          <div className="mx-auto flex max-w-sm flex-col justify-center gap-16 w-full lg:w-1/2">
            <div className="text-center lg:text-left">
              <h1 className="mb-2 text-5xl font-semibold md:mb-3 md:text-5xl">
                Contactez-nous
              </h1>
              <p className="text-muted-foreground">
                Nous sommes disponibles pour répondre à vos questions, vos
                retours ou opportunités de collaboration. Dites-nous comment
                nous pouvons vous aider!
              </p>
            </div>
            <div className="mx-auto w-fit md:mx-0">
              <h3 className="mb-4 text-center text-2xl font-semibold md:text-left">
                Coordonnées
              </h3>
              <ul className="ml-4 list-disc">
                <li>
                  <span className="font-bold">Email : </span>
                  <a
                    href="mailto:your-email@example.com"
                    className="underline hover:text-primary/80"
                  >
                    your-email@example.com
                  </a>
                </li>
                <li>
                  <span className="font-bold">Facebook : </span>
                  <a
                    href="https://www.facebook.com/your-facebook-page"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-primary/80"
                  >
                    facebook.com/your-facebook-page
                  </a>
                </li>
                <li>
                  <span className="font-bold">Instagram : </span>
                  <a
                    href="https://www.instagram.com/your-instagram-profile"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-primary/80"
                  >
                    instagram.com/your-instagram-profile
                  </a>
                </li>
                <li>
                  <span className="font-bold">TikTok : </span>
                  <a
                    href="https://www.tiktok.com/@your-tiktok-profile"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-primary/80"
                  >
                    tiktok.com/@your-tiktok-profile
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <Card className="mx-auto w-full max-w-screen-sm">
            <CardHeader>
              <CardTitle className="text-center text-3xl">
                Envoyez-nous un message
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-6"
              >
                <div className="flex flex-col lg:flex-row gap-4">
                  <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="firstname">Prénom</Label>
                    <Input
                      type="text"
                      id="firstname"
                      placeholder="Sarah"
                      {...register("firstname", {
                        required: "Ce champ est requis.",
                        onChange: (e) =>
                          setValue(
                            "firstname",
                            capitalizeFirstLetter(e.target.value)
                          ),
                      })}
                    />
                  </div>
                  <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="lastname">Nom</Label>
                    <Input
                      type="text"
                      id="lastname"
                      placeholder="Carrey"
                      {...register("lastname", {
                        required: "Ce champ est requis.",
                        onChange: (e) =>
                          setValue(
                            "lastname",
                            formatToUpperCase(e.target.value)
                          ),
                      })}
                    />
                  </div>
                </div>

                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    type="email"
                    id="email"
                    placeholder="sarah.carrey@hotmail.com"
                    {...register("email", {
                      required: "Ce champ est requis.",
                      pattern: {
                        value: /^\S+@\S+$/i,
                        message: "Email invalide",
                      },
                    })}
                  />
                </div>
                <div className="grid w-full items-center gap-1.5">
                  <Label>Sujet</Label>
                  <Combobox
                    subjects={subjects}
                    placeholder="Rechercher un sujet..."
                    {...register("subject", {
                      required: "Ce champ est requis.",
                    })}
                  />
                </div>
                <div className="grid w-full gap-1.5">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    placeholder="Tapez votre message ici."
                    id="message"
                    {...register("message", {
                      required: "Ce champ est requis.",
                      onChange: (e) =>
                        setValue(
                          "message",
                          capitalizeFirstLetter(e.target.value)
                        ),
                    })}
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full"
                  disabled={mutation.isLoading}
                >
                  {mutation.isLoading
                    ? "Envoi en cours..."
                    : "Envoyer le message"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
    </Body>
  );
}
