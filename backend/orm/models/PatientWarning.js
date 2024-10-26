"use strict";
import { Model, DataTypes } from "sequelize";

export default (sequelize) => {
  class PatientWarning extends Model {}

  PatientWarning.init(
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
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      warning: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
    },
    {
      sequelize,
      modelName: "PatientWarning",
      tableName: "PatientWarnings",
      timestamps: true,
    }
  );

  PatientWarning.associate = (models) => {
    PatientWarning.belongsTo(models.Patient, {
      foreignKey: "patientId",
      as: "patient",
      onDelete: "CASCADE",
    });
  };

  return PatientWarning;
};
