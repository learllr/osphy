"use strict";
import { DataTypes, Model } from "sequelize";

export default (sequelize) => {
  class PatientAntecedent extends Model {}

  PatientAntecedent.init(
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
      category: {
        type: DataTypes.ENUM("Traumatique", "Médical", "Chirurgical"),
        allowNull: false,
        validate: {
          isIn: [["Traumatique", "Médical", "Chirurgical"]],
        },
      },
      year: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      antecedent: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "PatientAntecedent",
      tableName: "PatientAntecedents",
      timestamps: true,
    }
  );

  PatientAntecedent.associate = (models) => {
    PatientAntecedent.belongsTo(models.Patient, {
      foreignKey: "patientId",
      as: "patient",
      onDelete: "CASCADE",
    });
  };

  return PatientAntecedent;
};
