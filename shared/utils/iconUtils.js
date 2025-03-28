import { CheckCircle, Clock, XCircle } from "lucide-react";
import { createElement } from "react";

export const determineStatusIcon = (status) => {
  const icons = {
    Confirmé: () =>
      createElement(CheckCircle, {
        className: "text-green-500 bg-white rounded-lg",
        size: 18,
        strokeWidth: 2,
      }),
    "En attente": () =>
      createElement(Clock, {
        className: "text-yellow-500 bg-white rounded-lg",
        size: 18,
        strokeWidth: 2,
      }),
    Annulé: () =>
      createElement(XCircle, {
        className: "text-red-500 bg-white rounded-lg",
        size: 18,
        strokeWidth: 2,
      }),
  };

  const IconComponent = icons[status] || null;
  return IconComponent ? IconComponent() : null;
};
