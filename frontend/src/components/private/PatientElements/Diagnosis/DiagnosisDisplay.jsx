import React from "react";

export default function DiagnosisDisplay({ diagnosis }) {
  return (
    <>
      <p
        className="text-gray-700 mb-4"
        dangerouslySetInnerHTML={{ __html: diagnosis.differential_diagnosis }}
      />

      <ul className="mt-2">
        {diagnosis?.exams?.map((exam, index) => (
          <li key={index} className="flex items-center space-x-2 mt-3">
            <input
              type="checkbox"
              checked={exam.checked}
              className="form-checkbox h-4 w-4 text-primary flex-shrink-0"
              readOnly
            />
            <span className="text-gray-700">
              <strong>{exam.name}</strong> : {exam.description}
            </span>
          </li>
        ))}
      </ul>
    </>
  );
}
