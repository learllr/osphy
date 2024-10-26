"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("PatientAntecedents", [
      {
        patientId: 1,
        antecedent: "Fracture du bras gauche",
        temporalInfo: "2010",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        patientId: 2,
        antecedent: "Appendicectomie",
        temporalInfo: "2015",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        patientId: 3,
        antecedent: "Chirurgie des ligaments croisés",
        temporalInfo: "2018",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("PatientAntecedents", null, {});
  },
};
