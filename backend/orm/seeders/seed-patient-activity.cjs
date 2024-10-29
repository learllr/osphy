"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("PatientActivities", [
      {
        patientId: 1,
        activity: "Course à pied",
        temporalInfo: "Quotidiennement",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        patientId: 2,
        activity: "Yoga",
        temporalInfo: "Hebdomadaire",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        patientId: 3,
        activity: "Natation",
        temporalInfo: "Deux fois par semaine",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        patientId: 4,
        activity: "Cyclisme",
        temporalInfo: "Tous les week-ends",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        patientId: 5,
        activity: "Salle de sport",
        temporalInfo: "Tous les matins",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        patientId: 6,
        activity: "Tennis",
        temporalInfo: "Deux fois par mois",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        patientId: 7,
        activity: "Basketball",
        temporalInfo: "Hebdomadaire",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        patientId: 8,
        activity: "Randonnée",
        temporalInfo: "Mensuel",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("PatientActivities", null, {});
  },
};
