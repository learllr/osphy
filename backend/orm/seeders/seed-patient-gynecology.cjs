"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("PatientGynecologies", [
      {
        patientId: 2,
        period: true,
        menopause: false,
        contraception: "Pilule",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        patientId: 4,
        period: false,
        menopause: true,
        contraception: "Stérilet",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        patientId: 6,
        period: true,
        menopause: false,
        contraception: "Implant",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        patientId: 8,
        period: false,
        menopause: true,
        contraception: "Aucune",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("PatientGynecologies", null, {});
  },
};
