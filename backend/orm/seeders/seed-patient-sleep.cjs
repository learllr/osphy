"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("PatientSleeps", [
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
      {
        patientId: 4,
        sleepQuality: "Bon",
        sleepDuration: ">8h",
        restorativeSleep: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        patientId: 5,
        sleepQuality: "Moyen",
        sleepDuration: "7-8h",
        restorativeSleep: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        patientId: 6,
        sleepQuality: "Mauvais",
        sleepDuration: "5-6h",
        restorativeSleep: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        patientId: 7,
        sleepQuality: "Bon",
        sleepDuration: ">8h",
        restorativeSleep: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        patientId: 8,
        sleepQuality: "Moyen",
        sleepDuration: "<5h",
        restorativeSleep: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("PatientSleeps", null, {});
  },
};
