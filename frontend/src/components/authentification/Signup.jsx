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
import { Info } from "lucide-react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import {
  capitalizeFirstLetter,
  formatToUpperCase,
} from "../../../utils/textUtils.js";
import Body from "../common/Body.jsx";
import { useAlert } from "../contexts/AlertContext";
import { useUser } from "../contexts/UserContext";

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

  const mutation = useMutation(
    async (data) => {
      const userData = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
        newsletterAccepted: data.newsletterAccepted,
        termsAccepted: data.termsAccepted,
      };
      return await signupUser({ userData });
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
    const { password, confirmPassword } = data;
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

  return (
    <Body>
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
                          setValue(
                            "lastName",
                            formatToUpperCase(e.target.value)
                          ),
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
                <div className="flex items-start gap-3 mb-2">
                  <input
                    type="checkbox"
                    {...register("termsAccepted")}
                    className="checkbox w-5 h-5 accent-[hsl(var(--primary))]"
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
                    et la
                    <a
                      href="#"
                      className="ml-1 underline text-primary hover:text-primary/80"
                    >
                      politique de confidentialité des données
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
    </Body>
  );
}
