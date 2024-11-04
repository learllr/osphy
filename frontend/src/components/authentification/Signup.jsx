import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Globe, UserRound } from "lucide-react";
import { useUser } from "../contexts/UserContext";
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
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    newsletterAccepted: false,
    termsAccepted: false,
  });
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setErrors({ confirmPassword: "Les mots de passe ne correspondent pas" });
      return;
    }
    if (!formData.termsAccepted) {
      setErrors({
        termsAccepted: "Vous devez accepter les conditions générales",
      });
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
      firstName,
      lastName,
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
        setApiError("Erreur lors de la connexion après inscription.");
      }
    } else {
      setApiError(result.message);
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
                <Button variant="outline" className="w-full">
                  <Globe className="mr-2 size-4" />
                  S'inscrire avec Google
                </Button>
                <div className="flex items-center gap-4">
                  <span className="h-px w-full bg-input"></span>
                  <span className="text-xs text-muted-foreground">OU</span>
                  <span className="h-px w-full bg-input"></span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="firstName">Prénom</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      type="text"
                      placeholder="John"
                      value={formData.firstName}
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
                      placeholder="Doe"
                      value={formData.lastName}
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
                    {errors.confirmPassword && (
                      <p className="text-red-500 text-sm">
                        {errors.confirmPassword}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="newsletterAccepted"
                    name="newsletterAccepted"
                    checked={formData.newsletterAccepted}
                    onChange={handleChange}
                    className="w-4 h-4"
                  />
                  <Label htmlFor="newsletter">
                    Je souhaite recevoir la newsletter
                  </Label>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="termsAccepted"
                    name="termsAccepted"
                    checked={formData.termsAccepted}
                    onChange={handleChange}
                    required
                    className="w-4 h-4"
                  />
                  <Label htmlFor="termsAccepted">
                    J'accepte les
                    <a href="#" className="ml-1 underline hover:text-primary">
                      conditions générales
                    </a>
                  </Label>
                  {errors.termsAccepted && (
                    <p className="text-red-500 text-sm">
                      {errors.termsAccepted}
                    </p>
                  )}
                </div>

                <Button type="submit" className="w-full">
                  Créer un compte
                </Button>
                {apiError && (
                  <p className="text-red-500 text-sm text-center mt-4">
                    {apiError}
                  </p>
                )}
              </form>
            </CardContent>
          </Card>
          <div className="flex gap-1 text-sm">
            <p>Vous avez déjà un compte ?</p>
            <Link to="/login" className="underline">
              Se connecter
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
