"use strict";

const dayjs = require("dayjs");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Appointments", [
      {
        userId: 1,
        patientId: 1,
        date: dayjs().subtract(7, "day").format("DD/MM/YYYY"),
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
        date: dayjs().add(5, "day").format("DD/MM/YYYY"),
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
        date: dayjs().add(3, "day").format("DD/MM/YYYY"),
        startTime: "09:00",
        endTime: "10:00",
        status: "En attente",
        type: "Urgence",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 1,
        patientId: 1,
        date: dayjs().add(1, "day").format("DD/MM/YYYY"),
        startTime: "11:00",
        endTime: "12:00",
        status: "Confirmé",
        type: "Bilan",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 1,
        patientId: 1,
        date: dayjs().format("DD/MM/YYYY"),
        startTime: "15:00",
        endTime: "16:00",
        status: "En attente",
        type: "Pédiatrique",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 1,
        patientId: 1,
        date: dayjs().add(2, "day").format("DD/MM/YYYY"),
        startTime: "10:30",
        endTime: "11:30",
        status: "Confirmé",
        type: "Autre",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 1,
        patientId: 6,
        date: dayjs().add(4, "day").format("DD/MM/YYYY"),
        startTime: "09:00",
        endTime: "10:00",
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
