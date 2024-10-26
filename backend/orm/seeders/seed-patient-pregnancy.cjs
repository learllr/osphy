"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("PatientPregnancies", [
      {
        patientId: 2,
        gender: "Fille",
        deliveryMethod: "Voie basse",
        epidural: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        patientId: 2,
        gender: "Garçon",
        deliveryMethod: "Césarienne",
        epidural: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        patientId: 3,
        gender: "Garçon",
        deliveryMethod: "Césarienne",
        epidural: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("PatientPregnancies", null, {});
  },
};
