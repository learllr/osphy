import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import React from "react";
import { FaTrash } from "react-icons/fa";

dayjs.extend(customParseFormat);

export default function AppointmentItem({
  appointment,
  isEditing,
  handleDateChange,
  handleInputChange,
  handleDelete,
}) {
  // Formatage de la date pour affichage
  const formattedDate = appointment.date
    ? dayjs(appointment.date, ["DD/MM/YYYY", "YYYY-MM-DD"]).format("DD/MM/YYYY")
    : "";

  // Formatage de la date pour l'input type="date" (YYYY-MM-DD)
  const dateForInput = appointment.date
    ? dayjs(appointment.date, ["DD/MM/YYYY", "YYYY-MM-DD"]).format("YYYY-MM-DD")
    : "";

  return (
    <li className="mb-2 flex flex-col md:flex-row items-start md:items-center w-full">
      {isEditing ? (
        <>
          <div className="flex gap-2 w-full md:w-auto">
            <input
              type="date"
              value={dateForInput}
              onChange={(e) => handleDateChange(appointment.id, e.target.value)}
              className="border rounded px-2 py-1 w-full md:w-auto"
            />
            <input
              type="time"
              value={appointment.startTime || ""}
              onChange={(e) =>
                handleInputChange(appointment.id, "startTime", e.target.value)
              }
              className="border rounded px-2 py-1 w-full md:w-auto"
            />
            <input
              type="time"
              value={appointment.endTime || ""}
              onChange={(e) =>
                handleInputChange(appointment.id, "endTime", e.target.value)
              }
              className="border rounded px-2 py-1 w-full md:w-auto"
            />
          </div>
          <textarea
            value={appointment.comment || ""}
            onChange={(e) =>
              handleInputChange(appointment.id, "comment", e.target.value)
            }
            placeholder="Ajouter un commentaire"
            className="border rounded px-2 py-1 mt-2 w-full ml-2"
          />
          <button
            onClick={() => handleDelete(appointment.id)}
            className="ml-2 text-red-500 hover:text-red-700"
            aria-label="Supprimer le rendez-vous"
          >
            <FaTrash size={16} />
          </button>
        </>
      ) : (
        <>
          <div className="flex items-center w-full">
            <span
              className={`w-2 h-2 rounded-full mr-2 ${
                appointment.status === "Confirmé"
                  ? "bg-green-500"
                  : appointment.status === "En attente"
                  ? "bg-orange-500"
                  : "bg-red-500"
              }`}
            ></span>
            {formattedDate}{" "}
            <span className="text-gray-600 ml-2">
              ({appointment.startTime} - {appointment.endTime})
            </span>
            {appointment.comment && (
              <p className="text-sm text-gray-500 ml-2 italic">
                {appointment.comment}
              </p>
            )}
          </div>
        </>
      )}
    </li>
  );
}
