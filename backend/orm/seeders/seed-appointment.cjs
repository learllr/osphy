"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Appointments", [
      {
        userId: 1,
        patientId: 1,
        start: new Date("2027-03-15T10:00:00"),
        end: new Date("2027-03-15T11:00:00"),
        status: "Annulé",
        type: "Suivi",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 1,
        patientId: 1,
        start: new Date("2028-06-22T14:00:00"),
        end: new Date("2028-06-22T15:00:00"),
        status: "Confirmé",
        type: "Première consultation",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 1,
        patientId: 1,
        start: new Date("2029-09-05T09:00:00"),
        end: new Date("2029-09-05T10:00:00"),
        status: "En attente",
        type: "Urgence",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 1,
        patientId: 2,
        start: new Date("2024-10-28T09:00:00"),
        end: new Date("2024-10-28T10:00:00"),
        status: "Confirmé",
        type: "Bilan",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 1,
        patientId: 3,
        start: new Date("2024-10-30T11:00:00"),
        end: new Date("2024-10-30T12:00:00"),
        status: "En attente",
        type: "Pédiatrique",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 1,
        patientId: 4,
        start: new Date("2024-11-01T15:00:00"),
        end: new Date("2024-11-01T16:00:00"),
        status: "Confirmé",
        type: "Autre",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 1,
        patientId: 5,
        start: new Date("2024-11-03T10:30:00"),
        end: new Date("2024-11-03T11:30:00"),
        status: "Annulé",
        type: "Suivi",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Appointments", null, {});
  },
};
