"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("PatientAntecedents", [
      {
        patientId: 1,
        antecedent: "Fracture de la jambe",
        category: "Traumatique",
        year: "2010",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        patientId: 1,
        antecedent: "Asthme depuis l'enfance",
        category: "Traumatique",
        year: "2009",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        patientId: 1,
        antecedent: "Asthme depuis l'enfance",
        category: "Chirurgical",
        year: "1958",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        patientId: 3,
        antecedent: "Migraines",
        category: "Chirurgical",
        year: "1998",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        patientId: 1,
        antecedent: "Chirurgie du dos",
        category: "Médical",
        year: "1985",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        patientId: 5,
        antecedent: "Diabète de type 2",
        category: "Médical",
        year: "2015",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        patientId: 6,
        antecedent: "Allergie à la pénicilline",
        category: "Traumatique",
        year: "1999",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        patientId: 7,
        antecedent: "Fracture du bras",
        category: "Médical",
        year: "2005",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        patientId: 8,
        antecedent: "Arthrite",
        category: "Traumatique",
        year: "2020",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("PatientAntecedents", null, {});
  },
};
