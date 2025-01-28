import React from "react";

export default function AppointmentFilters({
  statusFilter,
  setStatusFilter,
  showPastAppointments,
  setShowPastAppointments,
}) {
  return (
    <div className="mb-4 text-sm flex items-center">
      <label htmlFor="statusFilter" className="mr-2">
        Filtrer par statut :
      </label>
      <select
        id="statusFilter"
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
        className="border border-gray-300 rounded px-2 py-1"
      >
        <option value="Tous">Tous</option>
        <option value="Confirmé">Confirmé</option>
        <option value="En attente">En attente</option>
        <option value="Annulé">Annulé</option>
      </select>

      <label htmlFor="pastAppointments" className="ml-4">
        <input
          id="pastAppointments"
          type="checkbox"
          checked={showPastAppointments}
          onChange={(e) => setShowPastAppointments(e.target.checked)}
          className="ml-2 mr-2"
        />
        Afficher les rendez-vous passés
      </label>
    </div>
  );
}
