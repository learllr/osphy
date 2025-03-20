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

  const eventDate = new Date(date);

  if (!isNaN(eventDate.getTime())) {
    if (startTime) {
      const [hours, minutes] = startTime.split(":").map(Number);
      eventDate.setHours(hours, minutes, 0, 0);
    } else {
      eventDate.setHours(0, 0, 0, 0);
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return eventDate < today;
  }

  return false;
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
