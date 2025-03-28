import React, { useState } from "react";
import { FaCalendarAlt, FaPlus, FaSearch } from "react-icons/fa";
import { highlightText } from "../../../../../shared/utils/textUtils.js";
import AddConsultationDialog from "../../dialogs/AddConsultationDialog.jsx";

export default function ConsultationList({
  consultations,
  onConsultationClick,
  patientId,
  onConsultationAdded,
}) {
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const openAddDialog = () => setShowAddDialog(true);
  const closeAddDialog = () => setShowAddDialog(false);

  const filteredConsultations = consultations.filter((consultation) => {
    return consultation.date.includes(searchQuery);
  });

  return (
    <div className="bg-white rounded-lg py-6 px-4 border">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-700 mr-4">
          Consultations
        </h2>
        <button
          onClick={openAddDialog}
          className="p-1.5 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
          title="Ajouter une consultation"
        >
          <FaPlus size={14} />
        </button>
      </div>

      <div className="relative w-full mb-4">
        <input
          type="text"
          placeholder="Rechercher par date..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-9 py-2 text-xs rounded-lg border focus:ring-2 focus:ring-primary focus:outline-none"
        />
        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
          <FaSearch size={14} />
        </span>
      </div>

      <div className="space-y-2">
        {filteredConsultations.length > 0 ? (
          filteredConsultations.map((consultation, index) => (
            <div
              key={consultation.id || `consultation-${index}`}
              className="flex items-center py-2 px-3 bg-gray-50 rounded-lg shadow-sm border cursor-pointer transition hover:bg-gray-100"
              onClick={() => onConsultationClick(consultation)}
            >
              <FaCalendarAlt className="text-primary mr-3" />
              <span
                className="text-gray-700 font-medium text-sm"
                dangerouslySetInnerHTML={{
                  __html: highlightText(consultation.date, searchQuery),
                }}
              />
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-sm text-center">
            Aucune consultation enregistrée.
          </p>
        )}
      </div>

      <AddConsultationDialog
        patientId={patientId}
        isOpen={showAddDialog}
        onClose={closeAddDialog}
        onConsultationAdded={onConsultationAdded}
      />
    </div>
  );
}
