import { Input } from "@/components/ui/input";
import React from "react";

export default function DetailItem({
  label,
  value,
  isEditing = false,
  onChange,
  type = "text",
  options = [],
  min,
  max,
}) {
  return (
    <div className="flex mb-1 text-sm">
      <strong className="w-1/3 text-gray-600 flex items-center">{label}</strong>
      <span className="w-2/3 flex items-center">
        {isEditing ? (
          type === "select" ? (
            <select
              className="w-full bg-gray-100 px-4 py-2 rounded-md border text-gray-700"
              value={value || ""}
              onChange={(e) => onChange(e.target.value)}
            >
              <option value="">Sélectionnez</option>
              {options.map((option, idx) => (
                <option key={idx} value={option.value}>
                  {option}
                </option>
              ))}
            </select>
          ) : (
            <Input
              type={type}
              value={value !== null && value !== undefined ? value : ""}
              onChange={(e) => {
                const inputValue = e.target.value;
                if (type === "number") {
                  const numericValue =
                    inputValue === "" ? "" : Number(inputValue);
                  if (
                    numericValue === "" ||
                    (min !== undefined && numericValue < min) ||
                    (max !== undefined && numericValue > max)
                  ) {
                    return;
                  }
                  onChange(numericValue);
                } else {
                  onChange(inputValue);
                }
              }}
              min={min}
              max={max}
              className="bg-gray-100 px-4 py-2 rounded-md"
            />
          )
        ) : (
          <span className="px-4 py-2 rounded-md text-gray-700">
            {value !== null && value !== undefined && value !== ""
              ? value
              : "Non renseigné"}
          </span>
        )}
      </span>
    </div>
  );
}
