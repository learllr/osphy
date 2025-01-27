import { createElement } from "react";
import { FaCheckCircle, FaClock, FaTimesCircle } from "react-icons/fa";

export const determineStatusIcon = (status) => {
  const icons = {
    Confirmé: () =>
      createElement(FaCheckCircle, {
        className: "text-green-500 bg-white rounded-lg",
      }),
    "En attente": () =>
      createElement(FaClock, {
        className: "text-yellow-500 bg-white rounded-lg",
      }),
    Annulé: () =>
      createElement(FaTimesCircle, {
        className: "text-red-500 bg-white rounded-lg",
      }),
  };

  const IconComponent = icons[status] || null;
  return IconComponent ? IconComponent() : null;
};
