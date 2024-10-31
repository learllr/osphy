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
    <>
      <NavBar />
      <div className="p-6 max-w-md mx-auto">
        <h1 className="text-2xl font-semibold mb-4">Paramètres</h1>
        <div className="mb-4">
          <label className="block mb-2 font-medium">
            Durée des consultations
          </label>
          <div className="flex space-x-2">
            <input
              type="number"
              value={hours}
              onChange={handleHoursChange}
              className="border border-gray-300 rounded-md p-2 w-20"
              min="0"
              max="4"
              placeholder="Heures"
            />
            <span>h</span>
            <input
              type="number"
              value={minutes}
              onChange={handleMinutesChange}
              className="border border-gray-300 rounded-md p-2 w-20"
              min="0"
              max="59"
              placeholder="Minutes"
            />
            <span>min</span>
          </div>
          <button
            onClick={handleSubmit}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            Valider
          </button>
          {message && <p className="mt-2 text-gray-600">{message}</p>}
        </div>
      </div>
    </>
  );
}
