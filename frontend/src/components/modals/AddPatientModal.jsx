import React, { useState } from "react";
import axios from "../../axiosConfig";

export default function AddPatientModal({ isOpen, onClose, onPatientAdded }) {
  const [formData, setFormData] = useState({
    gender: "",
    lastName: "",
    firstName: "",
    birthDate: "",
    address: "",
    postalCode: "",
    city: "",
    addressComplement: "",
    mobilePhone: "",
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/patient", formData);
      onPatientAdded(response.data);
      onClose();
    } catch (error) {
      console.error("Erreur lors de l'ajout du patient:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-10">
      <div className="bg-white p-6 rounded-md w-[550px]">
        <h2 className="text-xl font-bold mb-4">Ajouter un patient</h2>
        <form onSubmit={handleSubmit}>
          <label className="block mb-2">
            Sexe
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded"
              required
            >
              <option value="">Sélectionnez</option>
              <option value="Homme">Homme</option>
              <option value="Femme">Femme</option>
            </select>
          </label>
          <label className="block mb-2">
            Nom
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded"
              required
            />
          </label>
          <label className="block mb-2">
            Prénom
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded"
              required
            />
          </label>
          <label className="block mb-2">
            Date de naissance
            <input
              type="date"
              name="birthDate"
              value={formData.birthDate}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded"
              required
            />
          </label>
          <label className="block mb-2">
            Adresse
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded"
            />
          </label>
          <label className="block mb-2">
            Code postal
            <input
              type="text"
              name="postalCode"
              value={formData.postalCode}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded"
            />
          </label>
          <label className="block mb-2">
            Ville
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded"
            />
          </label>
          <label className="block mb-2">
            Email
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded"
            />
          </label>
          <label className="block mb-2">
            Téléphone mobile
            <input
              type="text"
              name="mobilePhone"
              value={formData.mobilePhone}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded"
            />
          </label>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
          >
            Enregistrer
          </button>
          <button
            type="button"
            onClick={onClose}
            className="text-red-500 px-4 py-2 mt-4"
          >
            Annuler
          </button>
        </form>
      </div>
    </div>
  );
}
