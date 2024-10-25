"use strict";
import { Model, DataTypes } from "sequelize";

export default (sequelize) => {
  class PatientPractitioner extends Model {}

  PatientPractitioner.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      patientId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Patients",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      profession: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      fullName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          len: [2, 120],
        },
      },
    },
    {
      sequelize,
      modelName: "PatientPractitioner",
      tableName: "PatientPractitioners",
      timestamps: true,
    }
  );

  PatientPractitioner.associate = (models) => {
    PatientPractitioner.belongsTo(models.Patient, {
      foreignKey: "patientId",
      as: "patient",
      onDelete: "CASCADE",
    });
  };

  return PatientPractitioner;
};
