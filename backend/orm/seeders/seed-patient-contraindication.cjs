"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("PatientContraindications", [
      {
        patientId: 1,
        contraindication: "Contre-indication à la manipulation cervicale",
        temporalInfo: "2021",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        patientId: 2,
        contraindication: "Contre-indication à la mobilisation lombaire",
        temporalInfo: "2020",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        patientId: 3,
        contraindication: "Contre-indication au traitement par ultrasons",
        temporalInfo: "2019",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("PatientContraindications", null, {});
  },
};
