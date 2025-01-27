export const determineBackgroundColor = (patient, birthDate) => {
  if (!/^\d{2}\/\d{2}\/\d{4}$/.test(birthDate)) {
    console.warn("Date de naissance invalide pour:", patient);
    return "#d1d5db";
  }

  const [day, month, year] = birthDate.split("/").map(Number);
  const birth = new Date(year, month - 1, day);
  const ageInMonths =
    (new Date().getFullYear() - birth.getFullYear()) * 12 +
    (new Date().getMonth() - birth.getMonth());

  const colors = {
    Homme: ageInMonths < 216 ? "#3B82F6" : "#1E40AF",
    Femme: ageInMonths < 216 ? "#F472B6" : "#9D174D",
    default: ageInMonths < 216 ? "#6B7280" : "#374151",
  };

  return colors[patient.gender] || colors.default;
};
