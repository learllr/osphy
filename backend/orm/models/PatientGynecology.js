"use strict";
import { Model, DataTypes } from "sequelize";

export default (sequelize) => {
  class PatientGynecology extends Model {}

  PatientGynecology.init(
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
      period: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      menopause: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      contraception: {
        type: DataTypes.ENUM(
          "Aucune",
          "Stérilet",
          "Stérilet cuivre",
          "Stérilet hormonal",
          "Pilule",
          "Pilule (PC ou COC)",
          "Pilule (PP)",
          "Ogino",
          "Implant",
          "Patch",
          "Anneau",
          "Préservatif",
          "Autre"
        ),
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "PatientGynecology",
      tableName: "PatientGynecologies",
      timestamps: true,
    }
  );

  PatientGynecology.associate = (models) => {
    PatientGynecology.belongsTo(models.Patient, {
      foreignKey: "patientId",
      as: "patient",
      onDelete: "CASCADE",
    });
  };

  return PatientGynecology;
};
