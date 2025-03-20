export const calculateAge = (birthDate) => {
  if (!birthDate || isNaN(Date.parse(birthDate))) return "";

  const birth = new Date(birthDate);
  const now = new Date();

  let ageYears = now.getFullYear() - birth.getFullYear();
  let ageMonths =
    (now.getFullYear() - birth.getFullYear()) * 12 +
    (now.getMonth() - birth.getMonth());

  if (now.getDate() < birth.getDate()) {
    ageMonths--;
  }

  if (now < new Date(now.getFullYear(), birth.getMonth(), birth.getDate())) {
    ageYears--;
  }

  return ageYears > 1 ? `${ageYears} ans` : `${ageMonths} mois`;
};

export const isEventInThePast = (date, startTime = null) => {
  if (!date) return false;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  let eventDateTime;
  if (startTime) {
    eventDateTime = new Date(`${date}T${startTime}:00`);
  } else {
    eventDateTime = new Date(date);
    eventDateTime.setHours(0, 0, 0, 0);
  }

  return eventDateTime < today;
};

export function formatDate(date) {
  if (!date || isNaN(Date.parse(date))) return "";
  return new Date(date).toISOString().split("T")[0];
}

export function formatDateFR(date) {
  if (!date || isNaN(Date.parse(date))) return "";
  return new Date(date).toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}
