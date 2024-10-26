"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("PatientGynecologies", [
      {
        patientId: 2,
        period: true,
        menopause: false,
        contraception: "Pilule",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        patientId: 3,
        period: false,
        menopause: true,
        contraception: "Aucune",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("PatientGynecologies", null, {});
  },
};
