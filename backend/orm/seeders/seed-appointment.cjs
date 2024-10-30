"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Appointments", [
      {
        userId: 1,
        patientId: 1,
        start: new Date("2024-10-28T10:00:00"),
        end: new Date("2024-10-28T11:00:00"),
        status: "Annulé",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 1,
        patientId: 2,
        start: new Date("2024-10-30T14:00:00"),
        end: new Date("2024-10-30T15:00:00"),
        status: "Confirmé",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 1,
        patientId: 3,
        start: new Date("2024-11-02T09:00:00"),
        end: new Date("2024-11-02T10:00:00"),
        status: "En attente",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Appointments", null, {});
  },
};
