"use strict";
import { Model, DataTypes } from "sequelize";

export default (sequelize) => {
  class PatientActivity extends Model {}

  PatientActivity.init(
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
      temporalInfo: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      activity: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          len: [2, 120],
        },
      }
    },
    {
      sequelize,
      modelName: "PatientActivity",
      tableName: "PatientActivities",
      timestamps: true,
    }
  );

  PatientActivity.associate = (models) => {
    PatientActivity.belongsTo(models.Patient, {
      foreignKey: "patientId",
      as: "patient",
      onDelete: "CASCADE",
    });
  };

  return PatientActivity;
};
