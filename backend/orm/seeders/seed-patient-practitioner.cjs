"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("PatientPractitioners", [
      {
        patientId: 1,
        profession: "Médecin généraliste",
        fullName: "Dr. Marie Dupont",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        patientId: 2,
        profession: "Kinésithérapeute",
        fullName: "Dr. Pierre Lefevre",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        patientId: 3,
        profession: "Cardiologue",
        fullName: "Dr. Sylvie Bernard",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("PatientPractitioners", null, {});
  },
};
