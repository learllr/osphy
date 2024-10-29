"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("PatientWarnings", [
      {
        patientId: 1,
        warning: "Hypertension",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        patientId: 2,
        warning: "Asthme",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        patientId: 3,
        warning: "Migraines chroniques",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        patientId: 4,
        warning: "Convalescence post-opératoire",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        patientId: 5,
        warning: "Diabétique",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        patientId: 6,
        warning: "Réactions allergiques sévères",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        patientId: 7,
        warning: "Arthrite dans les articulations",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        patientId: 8,
        warning: "Problèmes rénaux",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("PatientWarnings", null, {});
  },
};
