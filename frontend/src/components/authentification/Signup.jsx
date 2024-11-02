import React, { useState } from "react";
import dayjs from "dayjs";
import axios from "../../axiosConfig.js";
import { useNavigate } from "react-router-dom";
import NavBar from "../common/NavBar.jsx";

export default function Signup() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    postalCode: "",
    birthDate: "",
    newsletter: false,
    terms: false,
  });

  const [errors, setErrors] = useState({});
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validate = () => {
    const errors = {};

    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Les mots de passe ne correspondent pas.";
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      try {
        await axios.post("/authentification/signup", {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
          postalCode: formData.postalCode,
          birthDate: formData.birthDate,
          newsletter: formData.newsletter,
          terms: formData.terms,
        });
        navigate("/login");
      } catch (error) {
        console.error("Erreur lors de l'inscription:", error);
        setErrors({
          apiError:
            error.response?.data?.error ||
            "Erreur lors de l'inscription de l'utilisateur",
        });
      }
    } else {
      setErrors(validationErrors);
    }
  };

  const today = dayjs().format("YYYY-MM-DD");

  return (
    <div className="min-h-screen">
      <NavBar />
      <div className="flex flex-col items-center">
        <h1 className="text-2xl font-bold mt-8">Inscription</h1>
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md mt-6 space-y-4 mb-24"
        >
          <div>
            <label className="block text-gray-700">Prénom</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              minLength={3}
              maxLength={50}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-gray-700">Nom</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              minLength={3}
              maxLength={50}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onFocus={() => setIsEmailFocused(true)}
              onBlur={() => setIsEmailFocused(false)}
              required
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          {isEmailFocused && (
            <p className="text-sm text-gray-500">
              Veuillez entrer un e-mail valide qui permettra de vérifier votre
              compte par la suite.
            </p>
          )}
          <div>
            <label className="block text-gray-700">Mot de passe</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              onFocus={() => setIsPasswordFocused(true)}
              onBlur={() => setIsPasswordFocused(false)}
              required
              minLength={8}
              pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[\\W_]).{8,}$"
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          {isPasswordFocused && (
            <p className="text-sm text-gray-500">
              Le mot de passe doit contenir au moins 8 caractères, une
              majuscule, une minuscule, un chiffre et un caractère spécial.
            </p>
          )}
          <div>
            <label className="block text-gray-700">
              Confirmation de mot de passe
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
            )}
          </div>
          <div>
            <label className="block text-gray-700">Code postal</label>
            <input
              type="text"
              name="postalCode"
              value={formData.postalCode}
              onChange={handleChange}
              required
              pattern="^\\d{5}$"
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-gray-700">Date de naissance</label>
            <input
              type="date"
              name="birthDate"
              value={formData.birthDate}
              onChange={handleChange}
              required
              max={today}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              name="newsletter"
              checked={formData.newsletter}
              onChange={handleChange}
              className="mr-2"
            />
            <label className="text-gray-700">Abonnement à la newsletter</label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              name="terms"
              checked={formData.terms}
              onChange={handleChange}
              required
              className="mr-2"
            />
            <label className="text-gray-700">
              J'accepte les conditions d'utilisation
            </label>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
          >
            S'inscrire
          </button>
          <div className="text-center">
            <span className="text-gray-700">Tu as déjà un compte ?</span>{" "}
            <a
              href="/login"
              className="text-blue-500 hover:underline transition-colors"
            >
              Connecte toi
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
