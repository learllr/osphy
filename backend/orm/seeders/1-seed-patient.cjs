"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Patients", [
      {
        gender: "Homme",
        lastName: "Doe",
        firstName: "John",
        birthDate: "1985-04-12",
        address: "123 Main St",
        postalCode: "75001",
        city: "Paris",
        mobilePhone: "0600000001",
        email: "john.doe@example.com",
        occupation: "Ingénieur",
        height: 180,
        weight: 75,
        handedness: "Droitier",
        medicalTreatments: "Aucun",
        additionalInfo: "Aucune information supplémentaire",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        gender: "Femme",
        lastName: "Smith",
        firstName: "Jane",
        birthDate: "1990-07-22",
        address: "456 Oak St",
        postalCode: "69002",
        city: "Lyon",
        mobilePhone: "0600000002",
        email: "jane.smith@example.com",
        occupation: "Professeur",
        height: 165,
        weight: 60,
        handedness: "Gaucher",
        medicalTreatments: "Aucun",
        additionalInfo: "Aime courir le matin",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        gender: "Homme",
        lastName: "Brown",
        firstName: "Michael",
        birthDate: "1978-11-05",
        address: "789 Pine St",
        postalCode: "33000",
        city: "Bordeaux",
        mobilePhone: "0600000003",
        email: "michael.brown@example.com",
        occupation: "Consultant",
        height: 175,
        weight: 80,
        handedness: "Ambidextre",
        medicalTreatments: "Traitement pour hypertension",
        additionalInfo: "Prend un traitement quotidien",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Patients", null, {});
  },
};
