import React, { useState } from "react";
import { FaCalendarAlt, FaPlus, FaSearch } from "react-icons/fa";
import { formatDateFR } from "../../../../../shared/utils/dateUtils.js";
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
    const formattedDate = formatDateFR(consultation.date);
    return formattedDate.includes(searchQuery);
  });

  return (
    <div className="bg-white rounded-lg p-6 border">
      <h2 className="text-lg font-semibold mb-4 text-gray-700 text-center">
        Consultations
      </h2>

      {/* Bouton d'ajout */}
      <button
        onClick={openAddDialog}
        className="flex items-center justify-center w-full bg-primary text-white font-medium py-2 px-4 rounded-lg transition hover:bg-primary/90"
      >
        <FaPlus className="mr-2" /> Ajouter une consultation
      </button>

      {/* Champ de recherche */}
      <div className="relative w-full my-4">
        <input
          type="text"
          placeholder="Rechercher par date..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2 text-sm rounded-lg border focus:ring-2 focus:ring-primary focus:outline-none"
        />
        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
          <FaSearch size={14} />
        </span>
      </div>

      {/* Liste des consultations */}
      <div className="space-y-3">
        {filteredConsultations.length > 0 ? (
          filteredConsultations.map((consultation) => (
            <div
              key={consultation.id}
              className="flex items-center p-3 bg-gray-50 rounded-lg shadow-sm border cursor-pointer transition hover:bg-gray-100"
              onClick={() => onConsultationClick(consultation)}
            >
              <FaCalendarAlt className="text-primary mr-3" />
              <span
                className="text-gray-700 font-medium text-sm"
                dangerouslySetInnerHTML={{
                  __html: highlightText(
                    formatDateFR(consultation.date),
                    searchQuery
                  ),
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

      {/* Dialog d'ajout */}
      <AddConsultationDialog
        patientId={patientId}
        isOpen={showAddDialog}
        onClose={closeAddDialog}
        onConsultationAdded={onConsultationAdded}
      />
    </div>
  );
}
