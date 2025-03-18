export const determineAppointmentBackgroundColor = (patient, birthDate) => {
  if (!birthDate || isNaN(Date.parse(birthDate))) {
    return "#d1d5db";
  }

  const birth = new Date(birthDate);
  const now = new Date();

  const ageInMonths =
    (now.getFullYear() - birth.getFullYear()) * 12 +
    (now.getMonth() - birth.getMonth());

  const colors = {
    Homme: ageInMonths < 216 ? "#3B82F6" : "#1E40AF",
    Femme: ageInMonths < 216 ? "#F472B6" : "#9D174D",
    default: ageInMonths < 216 ? "#6B7280" : "#374151",
  };

  return colors[patient.gender] || colors.default;
};
