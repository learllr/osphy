import dayjs from "dayjs";
import React from "react";
import { FaTrash } from "react-icons/fa";

export default function AppointmentItem({
  appointment,
  isEditing,
  tempDate,
  handleDateChange,
  handleInputChange,
  handleDelete,
}) {
  const formattedDate = tempDate[appointment.id]
    ? dayjs(tempDate[appointment.id], "DD/MM/YYYY").isValid()
      ? dayjs(tempDate[appointment.id], "DD/MM/YYYY").format("YYYY-MM-DD")
      : ""
    : dayjs(appointment.date, "DD/MM/YYYY").isValid()
    ? dayjs(appointment.date, "DD/MM/YYYY").format("YYYY-MM-DD")
    : "";

  return (
    <li className="mb-2 flex items-center w-full">
      {isEditing ? (
        <>
          <input
            type="date"
            value={formattedDate}
            onChange={(e) => handleDateChange(appointment.id, e.target.value)}
            className="border rounded px-2 py-1"
          />
          <input
            type="time"
            value={appointment.startTime}
            onChange={(e) =>
              handleInputChange(appointment.id, "startTime", e.target.value)
            }
            className="border rounded ml-1 px-2 py-1"
          />
          <input
            type="time"
            value={appointment.endTime}
            onChange={(e) =>
              handleInputChange(appointment.id, "endTime", e.target.value)
            }
            className="border rounded ml-1 px-2 py-1"
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
          {appointment.date}{" "}
          <span className="text-gray-500 ml-1">
            ({appointment.startTime} - {appointment.endTime})
          </span>
        </>
      )}
    </li>
  );
}
