"use strict";
import { Model, DataTypes } from "sequelize";

export default (sequelize) => {
  class Pregnancy extends Model {}

  Pregnancy.init(
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
      pregnancyCount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      deliveryMethod: {
        type: DataTypes.ENUM('Voie basse', 'Césarienne'),
        allowNull: true,
      },
      epidural: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Pregnancy",
      tableName: "Pregnancies",
      timestamps: true,
    }
  );

  Pregnancy.associate = (models) => {
    Pregnancy.belongsTo(models.Patient, {
      foreignKey: "patientId",
      as: "patient",
      onDelete: "CASCADE",
    });
  };

  return Pregnancy;
};
