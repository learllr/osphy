import { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import NavBar from "../common/NavBar.jsx";
import { Globe, UserRound } from "lucide-react";
import { useUser } from "../contexts/UserContext.jsx";
import axios from "../../axiosConfig.js";
import ResetPasswordModal from "../modals/ResetPasswordModal.jsx";
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

export default function Login() {
  const { user, loginUser } = useUser();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetMessage, setResetMessage] = useState("");
  const [resetError, setResetError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;
    const result = await loginUser(email, password);

    if (result.success) {
      navigate(from);
    } else {
      setErrors({ apiError: result.message });
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/reset-password", {
        email: resetEmail,
      });
      if (response.status === 200) {
        setResetMessage(
          "Un lien de réinitialisation de mot de passe a été envoyé à votre email."
        );
        setResetError("");
      } else {
        setResetError(response.data.message || "Une erreur est survenue.");
      }
    } catch (error) {
      setResetError("Une erreur est survenue. Veuillez réessayer plus tard.");
    }
  };

  useEffect(() => {
    if (user) {
      navigate(from);
    }
  }, [user, navigate, from]);

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <section className="flex flex-1 items-center justify-center">
        <div className="container">
          <div className="flex flex-col gap-4 items-center">
            <Card className="w-full max-w-md">
              <CardHeader className="items-center">
                <UserRound className="size-10 rounded-full bg-accent p-2.5 text-muted-foreground" />
                <CardTitle className="text-xl">
                  Connectez-vous avec votre email
                </CardTitle>
                <CardDescription>
                  Entrez vos informations pour vous connecter
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="grid gap-4">
                  <Button variant="outline" className="w-full">
                    <Globe className="mr-2 size-4" />
                    Se connecter avec Google
                  </Button>
                  <div className="flex items-center gap-4">
                    <span className="h-px w-full bg-input"></span>
                    <span className="text-xs text-muted-foreground">OU</span>
                    <span className="h-px w-full bg-input"></span>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="sarah@exemple.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm">{errors.email}</p>
                    )}
                  </div>
                  <div className="grid gap-2">
                    <div className="flex justify-between">
                      <Label htmlFor="password">Mot de passe</Label>
                      <a
                        href="#"
                        onClick={() => setShowModal(true)}
                        className="text-sm underline"
                      >
                        Mot de passe oublié ?
                      </a>
                    </div>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      placeholder="Entrez votre mot de passe"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                    {errors.password && (
                      <p className="text-red-500 text-sm">{errors.password}</p>
                    )}
                  </div>
                  <Button type="submit" className="w-full">
                    Se connecter
                  </Button>
                  {errors.apiError && (
                    <p className="text-red-500 text-sm text-center mt-4">
                      {errors.apiError}
                    </p>
                  )}
                </form>
              </CardContent>
            </Card>
            <ResetPasswordModal
              isVisible={showModal}
              onClose={() => setShowModal(false)}
              onSubmit={handleResetPassword}
              resetEmail={resetEmail}
              setResetEmail={setResetEmail}
              resetMessage={resetMessage}
              resetError={resetError}
            />
            <div className="flex gap-1 text-sm">
              <p>Vous n'avez pas encore de compte ?</p>
              <Link to="/signup" className="underline">
                S'inscrire
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
