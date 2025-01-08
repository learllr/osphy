"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("PatientPregnancies", [
      {
        patientId: 1,
        gender: "Fille",
        deliveryMethod: "Voie basse",
        epidural: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        patientId: 1,
        gender: "Garçon",
        deliveryMethod: "Césarienne",
        epidural: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        patientId: 6,
        gender: "Fille",
        deliveryMethod: "Voie basse",
        epidural: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        patientId: 8,
        gender: "Garçon",
        deliveryMethod: "Voie basse",
        epidural: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("PatientPregnancies", null, {});
  },
};
