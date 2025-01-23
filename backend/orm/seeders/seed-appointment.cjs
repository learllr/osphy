"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Appointments", [
      {
        userId: 1,
        patientId: 1,
        date: "2027-03-15",
        startTime: "10:00",
        endTime: "11:00",
        status: "Annulé",
        type: "Suivi",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 1,
        patientId: 1,
        date: "2028-06-22",
        startTime: "14:00",
        endTime: "15:00",
        status: "Confirmé",
        type: "Première consultation",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 1,
        patientId: 1,
        date: "2029-09-05",
        startTime: "09:00",
        endTime: "10:00",
        status: "En attente",
        type: "Urgence",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 1,
        patientId: 2,
        date: "2024-10-28",
        startTime: "09:00",
        endTime: "10:00",
        status: "Confirmé",
        type: "Bilan",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 1,
        patientId: 3,
        date: "2024-10-30",
        startTime: "11:00",
        endTime: "12:00",
        status: "En attente",
        type: "Pédiatrique",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 1,
        patientId: 4,
        date: "2024-11-01",
        startTime: "15:00",
        endTime: "16:00",
        status: "Confirmé",
        type: "Autre",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 1,
        patientId: 5,
        date: "2024-11-03",
        startTime: "10:30",
        endTime: "11:30",
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
