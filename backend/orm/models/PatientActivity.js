"use strict";
import { DataTypes, Model } from "sequelize";

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
        validate: {
          notEmpty: true,
          len: [0, 120],
        },
      },
      activity: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          notEmpty: true,
          len: [0, 255],
        },
      },
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
