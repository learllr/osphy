"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("PatientSleeps", [
      {
        patientId: 1,
        sleepQuality: "Bon",
        sleepDuration: "7-8h",
        restorativeSleep: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        patientId: 2,
        sleepQuality: "Moyen",
        sleepDuration: "5-6h",
        restorativeSleep: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        patientId: 3,
        sleepQuality: "Mauvais",
        sleepDuration: "<5h",
        restorativeSleep: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("PatientSleeps", null, {});
  },
};
