"use strict";
import { Model, DataTypes } from "sequelize";

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
      },
      contraindication: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          len: [3, 255],
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
