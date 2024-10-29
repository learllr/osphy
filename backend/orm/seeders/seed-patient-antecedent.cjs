"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("PatientAntecedents", [
      {
        patientId: 1,
        antecedent: "Fracture de la jambe en 2010",
        temporalInfo: "Il y a 10 ans",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        patientId: 2,
        antecedent: "Asthme depuis l'enfance",
        temporalInfo: "Depuis l'enfance",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        patientId: 3,
        antecedent: "Migraines",
        temporalInfo: "Occasionnel",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        patientId: 4,
        antecedent: "Chirurgie du dos",
        temporalInfo: "Il y a 5 ans",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        patientId: 5,
        antecedent: "Diabète de type 2",
        temporalInfo: "Depuis 2015",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        patientId: 6,
        antecedent: "Allergie à la pénicilline",
        temporalInfo: "Connue depuis l'enfance",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        patientId: 7,
        antecedent: "Fracture du bras",
        temporalInfo: "Il y a 3 ans",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        patientId: 8,
        antecedent: "Arthrite",
        temporalInfo: "Diagnostiquée en 2020",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("PatientAntecedents", null, {});
  },
};
