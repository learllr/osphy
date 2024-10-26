'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('PatientActivities', [
      {
        patientId: 1,
        activity: 'Course à pied',
        temporalInfo: '3 fois par semaine',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        patientId: 2,
        activity: 'Natation',
        temporalInfo: '2 fois par semaine',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        patientId: 3,
        activity: 'Yoga',
        temporalInfo: 'Tous les matins',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('PatientActivities', null, {});
  }
};
