"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("PatientGynecologies", [
      {
        patientId: 1,
        period: true,
        menopause: false,
        contraception: "Pilule",
        followUp: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        patientId: 4,
        period: false,
        menopause: true,
        contraception: "Stérilet",
        followUp: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        patientId: 6,
        period: true,
        menopause: false,
        contraception: "Implant",
        followUp: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        patientId: 8,
        period: false,
        menopause: true,
        contraception: "Aucune",
        followUp: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("PatientGynecologies", null, {});
  },
};
