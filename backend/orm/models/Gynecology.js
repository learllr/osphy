"use strict";
import { Model, DataTypes } from "sequelize";

export default (sequelize) => {
  class Gynecology extends Model {}

  Gynecology.init(
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
        type: DataTypes.ENUM('Aucune', 'Stérilet', 'Pillule', 'Implant', 'Patch', 'Anneau', 'Diaphragme', 'Préservatif', 'Autre'),
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Gynecology",
      tableName: "Gynecologies",
      timestamps: true,
    }
  );

  Gynecology.associate = (models) => {
    Gynecology.belongsTo(models.Patient, {
      foreignKey: "patientId",
      as: "patient",
      onDelete: "CASCADE",
    });
  };

  return Gynecology;
};
