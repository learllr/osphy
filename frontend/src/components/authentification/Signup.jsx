import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { UserRound, Info } from "lucide-react";
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
import NavBar from "../common/NavBar.jsx";
import { generateIdentifier } from "../../../utils/randomUtils.js";

export default function Signup() {
  const navigate = useNavigate();
  const { signupUser, loginUser } = useUser();
  const { showAlert } = useAlert();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    newsletterAccepted: false,
    termsAccepted: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!passwordPattern.test(formData.password)) {
      showAlert(
        "Le mot de passe doit contenir au moins 8 caractères, dont une majuscule, une minuscule et un chiffre.",
        "warning"
      );
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      showAlert("Les mots de passe ne correspondent pas.", "destructive");
      return;
    }
    if (!formData.termsAccepted) {
      showAlert("Vous devez accepter les conditions générales.", "destructive");
      return;
    }

    const identifier = generateIdentifier();

    const {
      firstName,
      lastName,
      email,
      password,
      newsletterAccepted,
      termsAccepted,
    } = formData;

    const result = await signupUser({
      identifier,
      firstName:
        firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase(),
      lastName: lastName.toUpperCase(),
      email,
      password,
      newsletterAccepted,
      termsAccepted,
    });

    if (result.success) {
      const loginResult = await loginUser(email, password);

      if (loginResult.success) {
        navigate("/");
      } else {
        showAlert(loginResult.message, "destructive");
      }
    } else {
      showAlert(result.message, "destructive");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <section className="flex flex-1 items-center justify-center">
        <div className="container flex flex-col items-center gap-4">
          <Card className="w-full max-w-lg">
            <CardHeader className="items-center">
              <UserRound className="size-10 rounded-full bg-accent p-2.5 text-muted-foreground" />
              <CardTitle className="text-xl">Créer un compte</CardTitle>
              <CardDescription>
                Entrez vos informations pour créer un compte
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="grid gap-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="firstName">Prénom</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      type="text"
                      placeholder="John"
                      value={
                        formData.firstName.charAt(0).toUpperCase() +
                        formData.firstName.slice(1).toLowerCase()
                      }
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="lastName">Nom</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      type="text"
                      placeholder="DOE"
                      value={formData.lastName.toUpperCase()}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="grid gap-2 md:col-span-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="john.doe@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="password">Mot de passe</Label>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      placeholder="Entrez votre mot de passe"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="confirmPassword">
                      Confirmez le mot de passe
                    </Label>
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      placeholder="Confirmez votre mot de passe"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
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
                    id="newsletterAccepted"
                    name="newsletterAccepted"
                    checked={formData.newsletterAccepted}
                    onChange={handleChange}
                    className="w-4 h-4 accent-[hsl(var(--primary))]"
                  />
                  <Label htmlFor="newsletter">
                    Je souhaite recevoir la newsletter
                  </Label>
                </div>

                <div className="flex items-center gap-3 mb-2">
                  <input
                    type="checkbox"
                    id="termsAccepted"
                    name="termsAccepted"
                    checked={formData.termsAccepted}
                    onChange={handleChange}
                    className="w-4 h-4 accent-[hsl(var(--primary))]"
                  />
                  <Label htmlFor="termsAccepted">
                    J'accepte les
                    <a
                      href="#"
                      className="ml-1 underline text-primary hover:text-primary/80"
                    >
                      conditions générales
                    </a>
                  </Label>
                </div>

                <Button type="submit" className="w-full">
                  Créer un compte
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
