import { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import NavBar from "../common/NavBar.jsx";
import { useUser } from "../contexts/UserContext.jsx";
import { useAlert } from "../contexts/AlertContext";
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
  const { showAlert } = useAlert();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
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
      showAlert(result.message, "success");
      navigate(from);
    } else {
      showAlert(result.message, "destructive");
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
                <CardTitle className="text-xl">
                  Connectez-vous avec votre email
                </CardTitle>
                <CardDescription>
                  Entrez vos informations pour vous connecter
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="grid gap-4">
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
                  </div>
                  <div className="grid gap-2">
                    <div className="flex justify-between">
                      <Label htmlFor="password">Mot de passe</Label>
                      <a
                        href="#"
                        onClick={() => setShowModal(true)}
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
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Se connecter
                  </Button>
                </form>
              </CardContent>
            </Card>
            <ResetPasswordModal
              isVisible={showModal}
              onClose={() => setShowModal(false)}
              resetEmail={resetEmail}
              setResetEmail={setResetEmail}
              resetMessage={resetMessage}
              resetError={resetError}
            />
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
