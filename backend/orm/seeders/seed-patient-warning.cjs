"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("PatientWarnings", [
      {
        patientId: 1,
        warning: "Allergie aux antibiotiques",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        patientId: 2,
        warning: "Asthme sévère",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        patientId: 3,
        warning: "Hypertension",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("PatientWarnings", null, {});
  },
};
