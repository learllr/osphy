"use strict";
import { Model, DataTypes } from "sequelize";

export default (sequelize) => {
  class PatientSleep extends Model {}

  PatientSleep.init(
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
      sleepQuality: {
        type: DataTypes.ENUM("Bon", "Moyen", "Mauvais"),
        allowNull: true,
      },
      sleepDuration: {
        type: DataTypes.ENUM("<5h", "5-6h", "7-8h", ">8h"),
        allowNull: true,
      },
      restorativeSleep: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "PatientSleep",
      tableName: "PatientSleeps",
      timestamps: true,
    }
  );

  PatientSleep.associate = (models) => {
    PatientSleep.belongsTo(models.Patient, {
      foreignKey: "patientId",
      as: "patient",
      onDelete: "CASCADE",
    });
  };

  return PatientSleep;
};
