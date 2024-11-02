import React, { useState } from "react";
import NavBar from "../common/NavBar";
import axios from "../../axiosConfig.js";

export default function Settings() {
  const [hours, setHours] = useState(1);
  const [minutes, setMinutes] = useState(0);
  const [message, setMessage] = useState("");

  const handleHoursChange = (event) => {
    const value = Math.max(0, Math.min(4, event.target.value));
    setHours(value);
  };

  const handleMinutesChange = (event) => {
    const value = Math.max(0, Math.min(59, event.target.value));
    setMinutes(value);
  };

  const handleSubmit = async () => {
    const totalDuration = hours * 60 + minutes;
    try {
      await axios.put("/user/settings", {
        consultationDuration: totalDuration,
      });
      setMessage("Paramètres enregistrés avec succès !");
    } catch (error) {
      setMessage("Erreur lors de l'enregistrement des paramètres.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <NavBar />
      <div className="flex justify-center items-center mt-10">
        <div className="p-8 bg-white rounded-lg shadow-lg max-w-md w-full">
          <h1 className="text-2xl font-semibold text-gray-700 mb-6">
            Paramètres de Consultation
          </h1>
          <div className="mb-6">
            <label className="block mb-2 text-gray-600 font-medium">
              Durée des consultations
            </label>
            <div className="flex items-center space-x-4">
              <input
                type="number"
                value={hours}
                onChange={handleHoursChange}
                className="border border-gray-300 rounded-lg p-2 w-24 text-center"
                min="0"
                max="4"
                placeholder="Heures"
              />
              <span className="text-gray-600">h</span>
              <input
                type="number"
                value={minutes}
                onChange={handleMinutesChange}
                className="border border-gray-300 rounded-lg p-2 w-24 text-center"
                min="0"
                max="59"
                placeholder="Minutes"
              />
              <span className="text-gray-600">min</span>
            </div>
          </div>
          <button
            onClick={handleSubmit}
            className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Enregistrer les paramètres
          </button>
          {message && (
            <p
              className={`mt-4 text-center font-medium ${
                message.includes("succès") ? "text-green-500" : "text-red-500"
              }`}
            >
              {message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
