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
        comment: "Le patient a annulé en raison d'un empêchement",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 1,
        patientId: 1,
        start: new Date("2028-06-22T14:00:00"),
        end: new Date("2028-06-22T15:00:00"),
        status: "Confirmé",
        comment: "Rendez-vous de suivi semestriel",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 1,
        patientId: 1,
        start: new Date("2029-09-05T09:00:00"),
        end: new Date("2029-09-05T10:00:00"),
        status: "En attente",
        comment: "Première consultation avec ce patient",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Appointments", null, {});
  },
};
