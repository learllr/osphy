import { Input } from "@/components/ui/input";
import dayjs from "dayjs";
import React from "react";
import { Link } from "react-router-dom";

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
    const inputValue = e.target.value;
    if (type === "number") {
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
      ? value
        ? dayjs(value, "YYYY-MM-DD").format("DD/MM/YYYY")
        : "Non renseigné"
      : value || "Non renseigné";

  return (
    <div className="flex text-sm mb-1">
      <strong className="w-2/5 text-gray-600 flex items-center">{label}</strong>
      <span className="w-3/5 flex items-center">
        {isEditing && editable ? (
          type === "select" ? (
            <select
              className="w-full bg-gray-100 px-4 py-2 rounded-md border text-gray-700"
              value={value ?? ""}
              onChange={(e) =>
                onChange(e.target.value === "" ? null : e.target.value)
              }
            >
              {allowEmptyOption && <option value="">Non renseigné</option>}
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
