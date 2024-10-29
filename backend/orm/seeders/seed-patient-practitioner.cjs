"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("PatientPractitioners", [
      {
        patientId: 1,
        profession: "Médecin généraliste",
        fullName: "Dr. Thompson",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        patientId: 2,
        profession: "Kinésithérapeute",
        fullName: "Dr. Johnson",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        patientId: 3,
        profession: "Chirurgien orthopédique",
        fullName: "Dr. Lee",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        patientId: 4,
        profession: "Nutritionniste",
        fullName: "Dr. Miller",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        patientId: 5,
        profession: "Cardiologue",
        fullName: "Dr. Adams",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        patientId: 6,
        profession: "Dermatologue",
        fullName: "Dr. Baker",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        patientId: 7,
        profession: "Neurologue",
        fullName: "Dr. Wilson",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        patientId: 8,
        profession: "Endocrinologue",
        fullName: "Dr. Taylor",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("PatientPractitioners", null, {});
  },
};
