import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ResetPasswordModal from "../modals/ResetPasswordModal.jsx";
import { useUser } from "../contexts/UserContext.jsx";
import axios from "axios";
import NavBar from "../common/NavBar.jsx";

const BASE_URL = import.meta.env.VITE_BASE_URL;

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
      const response = await axios.post(`${BASE_URL}/api/reset-password`, {
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
    <div className="min-h-screen">
      <NavBar />
      <div className="flex justify-center items-center m-20">
        <div className="bg-white w-full max-w-lg p-8">
          <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
            Connexion
          </h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-700 mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email}</p>
              )}
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Mot de passe</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                minLength={8}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              />
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password}</p>
              )}
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Se connecter
            </button>

            <div className="text-center mt-4">
              <a
                href="#"
                onClick={() => setShowModal(true)}
                className="text-blue-500 hover:underline transition-colors"
              >
                Mot de passe oublié ?
              </a>
            </div>
          </form>

          <ResetPasswordModal
            isVisible={showModal}
            onClose={() => setShowModal(false)}
            onSubmit={handleResetPassword}
            resetEmail={resetEmail}
            setResetEmail={setResetEmail}
            resetMessage={resetMessage}
            resetError={resetError}
          />
        </div>
      </div>
    </div>
  );
}
