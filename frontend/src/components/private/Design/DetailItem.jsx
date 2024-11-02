import React from "react";

export default function DetailItem({ label, value }) {
  return (
    <div className="flex mb-2">
      <strong className="w-1/3 text-gray-600">{label}:</strong>
      <span className="w-2/3 bg-gray-100 px-4 py-2 rounded-md text-gray-700">
        {value || "Non renseigné"}
      </span>
    </div>
  );
}
