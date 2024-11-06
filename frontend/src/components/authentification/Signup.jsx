import { useNavigate, Link } from "react-router-dom";
import { Info, UserRound } from "lucide-react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { useUser } from "../contexts/UserContext";
import { useAlert } from "../contexts/AlertContext";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import NavBar from "../common/NavBar.jsx";
import { generateIdentifier } from "../../../utils/randomUtils.js";
import { capitalizeFirstLetter, formatToUpperCase } from "../../../utils/textUtils.js";
import { useState } from "react";

export default function Signup() {
  const navigate = useNavigate();
  const { signupUser, loginUser } = useUser();
  const { showAlert } = useAlert();
  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      newsletterAccepted: false,
      termsAccepted: false,
    },
  });

  const [avatarPreview, setAvatarPreview] = useState(null);

  const mutation = useMutation(
    async (data) => {
      const formData = new FormData();
      if (data.avatar) {
        formData.append("avatar", data.avatar[0]);
      }
      const userData = {
        identifier: generateIdentifier(),
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
        newsletterAccepted: data.newsletterAccepted,
        termsAccepted: data.termsAccepted,
      };
      return await signupUser({ userData, formData });
    },
    {
      onSuccess: async (result, variables) => {
        if (result.success) {
          const loginResult = await loginUser(
            variables.email,
            variables.password
          );
          if (loginResult.success) {
            navigate("/");
          } else {
            showAlert(loginResult.message, "destructive");
          }
        } else {
          showAlert(result.message, "destructive");
        }
      },
      onError: () => {
        showAlert("Erreur lors de l'inscription", "destructive");
      },
    }
  );

  const onSubmit = (data) => {
    const { password, confirmPassword, termsAccepted } = data;
    if (password !== confirmPassword) {
      showAlert("Les mots de passe ne correspondent pas.", "destructive");
      return;
    }
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!passwordPattern.test(password)) {
      showAlert(
        "Le mot de passe doit contenir au moins 8 caractères, dont une majuscule, une minuscule et un chiffre.",
        "warning"
      );
      return;
    }
    mutation.mutate(data);
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarPreview(URL.createObjectURL(file));
      setValue("avatar", e.target.files);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <section className="flex flex-1 items-center justify-center">
        <div className="container flex flex-col items-center gap-4">
          <Card className="w-full max-w-lg">
            <CardHeader className="items-center">
              <CardTitle className="text-xl">Créer un compte</CardTitle>
              <CardDescription>
                Entrez vos informations pour créer un compte
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="avatar">Photo de profil (facultatif)</Label>
                  <div className="flex items-center gap-4">
                    <Avatar className="w-16 h-16">
                      <AvatarImage
                        src={avatarPreview}
                        alt="Prévisualisation de l'avatar"
                      />
                      <AvatarFallback>
                        <UserRound />
                      </AvatarFallback>
                    </Avatar>
                    <Input
                      type="file"
                      id="avatar"
                      accept="image/*"
                      {...register("avatar")}
                      onChange={handleAvatarChange}
                    />
                  </div>
                </div>{" "}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="firstName">
                      Prénom{" "}
                      <span className="text-red-500 align-middle">*</span>
                    </Label>
                    <Input
                      id="firstName"
                      {...register("firstName", {
                        onChange: (e) =>
                          setValue(
                            "firstName",
                            capitalizeFirstLetter(e.target.value)
                          ),
                      })}
                      required
                      placeholder="John"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="lastName">
                      Nom <span className="text-red-500 align-middle">*</span>
                    </Label>
                    <Input
                      id="lastName"
                      {...register("lastName", {
                        onChange: (e) =>
                          setValue("lastName", formatToUpperCase(e.target.value)),
                      })}
                      required
                      placeholder="DOE"
                    />
                  </div>
                  <div className="grid gap-2 md:col-span-2">
                    <Label htmlFor="email">
                      Email <span className="text-red-500 align-middle">*</span>
                    </Label>
                    <Input
                      id="email"
                      {...register("email")}
                      required
                      placeholder="john.doe@example.com"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="password">
                      Mot de passe{" "}
                      <span className="text-red-500 align-middle">*</span>
                    </Label>
                    <Input
                      id="password"
                      {...register("password")}
                      type="password"
                      required
                      placeholder="Entrez votre mot de passe"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="confirmPassword">
                      Confirmez le mot de passe{" "}
                      <span className="text-red-500 align-middle">*</span>
                    </Label>
                    <Input
                      id="confirmPassword"
                      {...register("confirmPassword")}
                      type="password"
                      required
                      placeholder="Confirmez votre mot de passe"
                    />
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500 mt-2">
                  <Info className="w-8 h-8 text-gray-500" />
                  <span>
                    Le mot de passe doit contenir au moins 8 caractères, dont
                    une majuscule, une minuscule et un chiffre.
                  </span>
                </div>
                <div className="flex items-center gap-3 mt-2">
                  <input
                    type="checkbox"
                    {...register("newsletterAccepted")}
                    className="w-4 h-4 accent-[hsl(var(--primary))]"
                  />
                  <Label htmlFor="newsletterAccepted">
                    Je souhaite recevoir la newsletter
                  </Label>
                </div>
                <div className="flex items-center gap-3 mb-2">
                  <input
                    type="checkbox"
                    {...register("termsAccepted")}
                    className="w-4 h-4 accent-[hsl(var(--primary))]"
                    required
                  />
                  <Label htmlFor="termsAccepted">
                    J'accepte les
                    <a
                      href="#"
                      className="ml-1 underline text-primary hover:text-primary/80"
                    >
                      conditions générales
                    </a>{" "}
                    <span className="text-red-500 align-middle">*</span>
                  </Label>
                </div>
                <Button
                  type="submit"
                  className="w-full"
                  disabled={mutation.isLoading}
                >
                  {mutation.isLoading ? "Création..." : "Créer un compte"}
                </Button>
              </form>
            </CardContent>
          </Card>
          <div className="flex gap-1 text-sm">
            <p>Vous avez déjà un compte ?</p>
            <Link
              to="/login"
              className="underline text-primary hover:text-primary/90 font-semibold"
            >
              Se connecter
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
