"use strict";
import { Model, DataTypes } from "sequelize";

export default (sequelize) => {
  class Antecedent extends Model {}

  Antecedent.init(
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
      antecedent: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      }
    },
    {
      sequelize,
      modelName: "Antecedent",
      tableName: "Antecedents",
      timestamps: true,
    }
  );

  Antecedent.associate = (models) => {
    Antecedent.belongsTo(models.Patient, {
      foreignKey: "patientId",
      as: "patient",
      onDelete: "CASCADE",
    });
  };

  return Antecedent;
};
