"use strict";
const bcrypt = require("bcrypt");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const hashedPassword = await bcrypt.hash("TestTest4", 10);

    await queryInterface.bulkInsert(
      "Users",
      [
        {
          firstName: "Léa",
          lastName: "ROULLIER",
          email: "leleroullier@gmail.com",
          password: hashedPassword,
          roleId: 1,
          postalCode: "75001",
          birthDate: "1990-01-01",
          newsletterAccepted: true,
          termsAccepted: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: "Sarah",
          lastName: "MARTINS",
          email: "sarah.martins@example.com",
          password: await bcrypt.hash("another_password_here", 10),
          roleId: 2,
          postalCode: "69002",
          birthDate: "1985-05-15",
          newsletterAccepted: false,
          termsAccepted: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
