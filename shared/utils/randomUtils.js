export const generateIdentifier = () => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let identifier = "";
  for (let i = 0; i < 8; i++) {
    identifier += characters.charAt(
      Math.floor(Math.random() * characters.length)
    );
  }
  return identifier;
};

export const generateUniqueIdentifier = async (findUserByIdentifier) => {
  let isUnique = false;
  let identifier;

  while (!isUnique) {
    identifier = generateIdentifier();
    const existingUser = await findUserByIdentifier(identifier);
    if (!existingUser) {
      isUnique = true;
    }
  }

  return identifier;
};
