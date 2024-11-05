import { useEffect, useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import NavBar from "../common/NavBar.jsx";
import { useUser } from "../contexts/UserContext.jsx";
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import axios from "../../axiosConfig.js";

export default function Login() {
  const { user, loginUser } = useUser();
  const { showAlert } = useAlert();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [showDialog, setShowDialog] = useState(false);
  const [resetEmail, setResetEmail] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm({
    defaultValues: { email: "", password: "" },
  });

  const mutation = useMutation(
    ({ email, password }) => loginUser(email, password),
    {
      onSuccess: (result) => {
        if (result.success) {
          navigate(from);
        } else {
          showAlert(result.message, "destructive");
        }
      },
      onError: () => {
        showAlert("Erreur lors de la connexion", "destructive");
      },
    }
  );

  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  useEffect(() => {
    if (user) {
      navigate(from);
    }
  }, [user, navigate, from]);

  const handlePasswordResetSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "/api/authentification/request-password-reset",
        { email: resetEmail }
      );
      if (response.status === 200) {
        showAlert("Un e-mail de réinitialisation a été envoyé.", "success");
        setShowDialog(false);
        reset();
      } else {
        setError("resetEmail", {
          type: "manual",
          message: response.data.message || "Une erreur est survenue.",
        });
      }
    } catch (error) {
      setError("resetEmail", {
        type: "manual",
        message: "Une erreur est survenue. Veuillez réessayer.",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <section className="flex flex-1 items-center justify-center">
        <div className="container">
          <div className="flex flex-col gap-4 items-center">
            <Card className="w-full max-w-md">
              <CardHeader className="items-center">
                <CardTitle className="text-xl">
                  Connectez-vous avec votre email
                </CardTitle>
                <CardDescription>
                  Entrez vos informations pour vous connecter
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="sarah@exemple.com"
                      {...register("email", { required: "Email requis" })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <div className="flex justify-between">
                      <Label htmlFor="password">Mot de passe</Label>
                      <a
                        href="#"
                        onClick={() => setShowDialog(true)}
                        className="text-sm underline text-primary hover:text-primary/80 font-semibold"
                      >
                        Mot de passe oublié ?
                      </a>
                    </div>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      placeholder="Entrez votre mot de passe"
                      {...register("password", {
                        required: "Mot de passe requis",
                      })}
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={mutation.isLoading}
                  >
                    {mutation.isLoading ? "Connexion..." : "Se connecter"}
                  </Button>
                </form>
              </CardContent>
            </Card>
            <Dialog
              open={showDialog}
              onOpenChange={(open) => !open && setShowDialog(false)}
            >
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Réinitialisation du mot de passe</DialogTitle>
                  <DialogDescription>
                    Veuillez entrer l'adresse e-mail utilisée lors de votre
                    inscription. Vous recevrez un e-mail contenant un lien pour
                    réinitialiser votre mot de passe.
                  </DialogDescription>
                </DialogHeader>
                <form
                  onSubmit={handlePasswordResetSubmit}
                  className="space-y-4"
                >
                  <Label htmlFor="resetEmail">Email</Label>
                  <Input
                    id="resetEmail"
                    type="email"
                    placeholder="Votre adresse e-mail"
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    required
                  />
                  {errors.resetEmail && (
                    <span className="text-red-500">
                      {errors.resetEmail.message}
                    </span>
                  )}
                  <DialogFooter className="flex justify-end mt-6">
                    <Button
                      variant="secondary"
                      onClick={() => setShowDialog(false)}
                    >
                      Annuler
                    </Button>
                    <Button type="submit">Envoyer</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
            <div className="flex gap-1 text-sm">
              <p>Vous n'avez pas encore de compte ?</p>
              <Link
                to="/signup"
                className="underline text-primary hover:text-primary/80 font-semibold"
              >
                S'inscrire
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
