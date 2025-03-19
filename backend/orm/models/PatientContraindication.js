"use strict";
import { DataTypes, Model } from "sequelize";

export default (sequelize) => {
  class PatientContraindication extends Model {}

  PatientContraindication.init(
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
      temporalInfo: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          notEmpty: true,
          len: [0, 120],
        },
      },
      contraindication: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          len: [0, 255],
        },
      },
    },
    {
      sequelize,
      modelName: "PatientContraindication",
      tableName: "PatientContraindications",
      timestamps: true,
    }
  );

  PatientContraindication.associate = (models) => {
    PatientContraindication.belongsTo(models.Patient, {
      foreignKey: "patientId",
      as: "patient",
      onDelete: "CASCADE",
    });
  };

  return PatientContraindication;
};
