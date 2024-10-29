"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("PatientContraindications", [
      {
        patientId: 1,
        contraindication: "Ne peut pas soulever des objets lourds",
        temporalInfo: "Permanent",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        patientId: 2,
        contraindication: "Allergique aux AINS",
        temporalInfo: "Allergie connue",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        patientId: 3,
        contraindication:
          "Ne peut pas nager en raison d'une infection de l'oreille",
        temporalInfo: "Temporaire",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        patientId: 4,
        contraindication: "Pas de course à pied en raison de douleurs au genou",
        temporalInfo: "Temporaire",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        patientId: 5,
        contraindication: "Éviter les aliments sucrés",
        temporalInfo: "Permanent",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        patientId: 6,
        contraindication: "Pas de produits laitiers",
        temporalInfo: "Permanent",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        patientId: 7,
        contraindication: "Éviter les exercices intenses",
        temporalInfo: "Temporaire",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        patientId: 8,
        contraindication: "Ne peut pas conduire sur de longues distances",
        temporalInfo: "Temporaire",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("PatientContraindications", null, {});
  },
};
