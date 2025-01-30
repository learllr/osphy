import dayjs from "dayjs";

export const calculateAge = (birthDate) => {
  const [day, month, year] = birthDate.split("/").map(Number);
  const birth = new Date(year, month - 1, day);
  const now = new Date();

  let ageYears = now.getFullYear() - birth.getFullYear();
  const ageMonths = now.getMonth() + 1 - (birth.getMonth() + 1) + ageYears * 12;

  if (
    now.getMonth() < birth.getMonth() ||
    (now.getMonth() === birth.getMonth() && now.getDate() < birth.getDate())
  ) {
    ageYears--;
  }

  return ageYears > 1 ? `${ageYears} ans` : `${ageMonths} mois`;
};

export const formatEventTime = (time) =>
  time ? dayjs(`1970-01-01T${time}`).format("HH:mm") : "";

export const isEventInThePast = (date, startTime = null) => {
  let eventDateTime;

  if (startTime) {
    eventDateTime = dayjs(`${date} ${startTime}`, [
      "DD/MM/YYYY HH:mm",
      "YYYY-MM-DD HH:mm",
    ]);
  } else {
    eventDateTime = dayjs(date, ["DD/MM/YYYY", "YYYY-MM-DD"]).startOf("day");
  }

  return eventDateTime.isBefore(dayjs());
};
