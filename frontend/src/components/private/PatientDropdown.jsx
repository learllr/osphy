import { useEffect, useRef, useState } from "react";
import { FaEllipsisV } from "react-icons/fa";

export default function PatientDropdown({ patientId, onDelete }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-gray-500 hover:text-gray-700 ml-3"
      >
        <FaEllipsisV />
      </button>
      {isOpen && (
        <ul
          ref={dropdownRef}
          className="absolute right-0 bg-white border rounded shadow mt-2 z-10 w-52 text-sm"
        >
          <li>
            <button className="px-4 py-2 hover:bg-gray-100 w-full text-left">
              Exporter en PDF
            </button>
          </li>
          <li>
            <button
              onClick={() => {
                setIsOpen(false);
                onDelete(patientId);
              }}
              className="px-4 py-2 hover:bg-red-50 w-full text-left text-red-500"
            >
              Supprimer
            </button>
          </li>
        </ul>
      )}
    </div>
  );
}
