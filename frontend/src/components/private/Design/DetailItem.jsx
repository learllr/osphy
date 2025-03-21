import { Input } from "@/components/ui/input";
import React from "react";
import { Link } from "react-router-dom";
import { formatDateFR } from "../../../../../shared/utils/dateUtils";
import { formatPhoneNumber } from "../../../../../shared/utils/formatUtils";

export default function DetailItem({
  label,
  value,
  isEditing = false,
  onChange,
  type = "text",
  options = [],
  min,
  max,
  link = null,
  editable = true,
  allowEmptyOption = true,
}) {
  const handleInputChange = (e) => {
    let inputValue = e.target.value;

    if (label === "Téléphone") {
      inputValue = inputValue.replace(/\D/g, "");
      onChange(formatPhoneNumber(inputValue));
    } else if (type === "number") {
      const numericValue = inputValue === "" ? "" : Number(inputValue);
      if (
        (min !== undefined && numericValue < min) ||
        (max !== undefined && numericValue > max)
      ) {
        return;
      }
      onChange(numericValue);
    } else {
      onChange(inputValue);
    }
  };

  const displayValue =
    type === "date" && !isEditing
      ? formatDateFR(value)
      : label === "Téléphone" && value
      ? formatPhoneNumber(value)
      : value || "-";

  return (
    <div className="flex text-sm mb-1">
      <strong className="w-2/5 text-gray-600 flex items-center">{label}</strong>
      <span className="w-3/5 flex items-center break-all">
        {isEditing && editable ? (
          label === "Téléphone" ? (
            <Input
              type="tel"
              value={value || ""}
              onChange={handleInputChange}
              className="bg-gray-100 px-4 py-2 rounded-md"
            />
          ) : type === "select" ? (
            <select
              className="w-full bg-gray-100 px-4 py-2 rounded-md border text-gray-700"
              value={value ?? ""}
              onChange={(e) =>
                onChange(e.target.value === "" ? null : e.target.value)
              }
            >
              {allowEmptyOption && <option value="">-</option>}
              {options.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          ) : type === "textarea" ? (
            <textarea
              value={value !== null && value !== "" ? value : ""}
              onChange={handleInputChange}
              className="bg-gray-100 px-4 py-2 rounded-md w-full min-h-[80px] border"
              rows="3"
            />
          ) : (
            <Input
              type={type}
              value={value !== null && value !== "" ? value : ""}
              onChange={handleInputChange}
              min={min}
              max={max}
              className="bg-gray-100 px-4 py-2 rounded-md"
            />
          )
        ) : link ? (
          <Link
            to={link}
            className="px-4 py-2 rounded-md text-blue-600 underline"
          >
            {displayValue}
          </Link>
        ) : (
          <span className="px-4 py-2 rounded-md text-gray-700">
            {displayValue}
          </span>
        )}
      </span>
    </div>
  );
}
