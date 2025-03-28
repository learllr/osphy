import { Mail } from "lucide-react";
import React from "react";

export default function DiagnosisDisplay({ diagnosis, onToggleExam }) {
  console.log(diagnosis);
  return (
    <>
      <p
        className="text-gray-700 mb-4"
        dangerouslySetInnerHTML={{ __html: diagnosis.summary }}
      />

      <ul className="mt-2">
        {diagnosis?.exams?.map((exam, index) => (
          <li key={index} className="flex items-center space-x-2 mt-3">
            <input
              type="checkbox"
              checked={exam.checked}
              className="form-checkbox h-4 w-4 text-primary flex-shrink-0"
              onChange={() => onToggleExam(index)}
            />
            <span className="text-gray-700">
              <strong>{exam.name}</strong> : {exam.description}
            </span>
          </li>
        ))}
      </ul>

      <div className="flex items-center justify-center">
        <button
          type="button"
          className="mt-6 px-4 py-2 bg-primary text-white rounded shadow hover:bg-primary/90 transition flex items-center justify-center"
        >
          <Mail className="mr-2" /> Rédiger un mail
        </button>
      </div>
    </>
  );
}
