"use strict";
import { Model, DataTypes } from "sequelize";

export default (sequelize) => {
  class PatientPregnancy extends Model {}

  PatientPregnancy.init(
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
      gender: {
        type: DataTypes.ENUM("Garçon", "Fille"),
        allowNull: true,
      },
      deliveryMethod: {
        type: DataTypes.ENUM("Voie basse", "Césarienne"),
        allowNull: true,
      },
      epidural: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "PatientPregnancy",
      tableName: "PatientPregnancies",
      timestamps: true,
    }
  );

  PatientPregnancy.associate = (models) => {
    PatientPregnancy.belongsTo(models.Patient, {
      foreignKey: "patientId",
      as: "patient",
      onDelete: "CASCADE",
    });
  };

  return PatientPregnancy;
};
