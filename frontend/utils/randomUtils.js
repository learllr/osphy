export const generateIdentifier = () => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let identifier = "";
  for (let i = 0; i < 8; i++) {
    identifier += characters.charAt(
      Math.floor(Math.random() * characters.length)
    );
  }
  return identifier;
};
