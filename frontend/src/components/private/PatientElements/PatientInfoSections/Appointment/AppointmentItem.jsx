import dayjs from "dayjs";
import React from "react";
import { FaTrash } from "react-icons/fa";

export default function AppointmentItem({
  appointment,
  isEditing,
  handleDateChange,
  handleInputChange,
  handleDelete,
}) {
  const formattedDate = dayjs(appointment.date, "YYYY-MM-DD").isValid()
    ? dayjs(appointment.date, "YYYY-MM-DD").format("DD/MM/YYYY")
    : "";

  return (
    <li className="mb-2 flex items-center w-full">
      {isEditing ? (
        <>
          <input
            type="date"
            value={appointment.date || ""}
            onChange={(e) => handleDateChange(appointment.id, e.target.value)}
            className="border rounded px-2 py-1"
          />
          <input
            type="time"
            value={appointment.startTime || ""}
            onChange={(e) =>
              handleInputChange(appointment.id, "startTime", e.target.value)
            }
            className="border rounded ml-2 px-2 py-1"
          />
          <input
            type="time"
            value={appointment.endTime || ""}
            onChange={(e) =>
              handleInputChange(appointment.id, "endTime", e.target.value)
            }
            className="border rounded ml-2 px-2 py-1"
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
          <span className="text-gray-500 ml-2">
            ({appointment.startTime} - {appointment.endTime})
          </span>
        </>
      )}
    </li>
  );
}
