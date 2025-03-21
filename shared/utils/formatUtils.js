export function formatPhoneNumber(phone) {
  return phone
    .replace(/\D/g, "")
    .slice(0, 10)
    .replace(/(\d{2})(?=\d)/g, "$1 ")
    .trim();
}
