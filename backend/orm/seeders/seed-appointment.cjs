"use strict";

const dayjs = require("dayjs");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Appointments", [
      {
        userId: 1,
        patientId: 1,
        date: dayjs().subtract(7, "day").format("YYYY-MM-DD"),
        startTime: "10:00:00",
        endTime: "11:00:00",
        status: "Annulé",
        type: "Suivi",
        comment: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 1,
        patientId: 1,
        date: dayjs().add(5, "day").format("YYYY-MM-DD"),
        startTime: "14:00:00",
        endTime: "15:00:00",
        status: "Confirmé",
        type: "Première consultation",
        comment: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 1,
        patientId: 1,
        date: dayjs().add(3, "day").format("YYYY-MM-DD"),
        startTime: "09:00:00",
        endTime: "10:00:00",
        status: "En attente",
        type: "Urgence",
        comment: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 1,
        patientId: 1,
        date: dayjs().add(1, "day").format("YYYY-MM-DD"),
        startTime: "11:00:00",
        endTime: "12:00:00",
        status: "Confirmé",
        type: "Bilan",
        comment: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 1,
        patientId: 1,
        date: dayjs().format("YYYY-MM-DD"),
        startTime: "15:00:00",
        endTime: "16:00:00",
        status: "En attente",
        type: "Pédiatrique",
        comment: "Test",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 1,
        patientId: 1,
        date: dayjs().add(2, "day").format("YYYY-MM-DD"),
        startTime: "10:30:00",
        endTime: "11:30:00",
        status: "Confirmé",
        type: "Autre",
        comment: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 1,
        patientId: 6,
        date: dayjs().add(4, "day").format("YYYY-MM-DD"),
        startTime: "09:00:00",
        endTime: "10:00:00",
        status: "Annulé",
        type: "Suivi",
        comment: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Appointments", null, {});
  },
};
