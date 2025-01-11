"use strict";
const bcrypt = require("bcrypt");

const generateIdentifier = () => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let identifier = "";
  for (let i = 0; i < 8; i++) {
    identifier += characters.charAt(
      Math.floor(Math.random() * characters.length)
    );
  }
  return identifier;
};

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const hashedPassword1 = await bcrypt.hash("TestTest4", 10);
    const hashedPassword2 = await bcrypt.hash("another_password_here", 10);
    const hashedPassword3 = await bcrypt.hash("Pauline1234", 10);

    await queryInterface.bulkInsert(
      "Users",
      [
        {
          identifier: generateIdentifier(),
          firstName: "Léa",
          lastName: "ROULLIER",
          email: "leleroullier@gmail.com",
          password: hashedPassword1,
          roleId: 1,
          newsletterAccepted: true,
          termsAccepted: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          identifier: generateIdentifier(),
          firstName: "Sarah",
          lastName: "MARTINS",
          email: "sarah.martins@example.com",
          password: hashedPassword2,
          roleId: 2,
          newsletterAccepted: false,
          termsAccepted: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          identifier: generateIdentifier(),
          firstName: "Pauline",
          lastName: "ALARCON",
          email: "pauline.alarcon@gmail.com",
          password: hashedPassword3,
          roleId: 1,
          newsletterAccepted: false,
          termsAccepted: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        }
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
