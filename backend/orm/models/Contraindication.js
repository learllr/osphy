"use strict";
import { Model, DataTypes } from "sequelize";

export default (sequelize) => {
  class Contraindication extends Model {}

  Contraindication.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      consultationId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Consultations",
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
      }
    },
    {
      sequelize,
      modelName: "Contraindication",
      tableName: "Contraindications",
      timestamps: true,
    }
  );

  Contraindication.associate = (models) => {
    Contraindication.belongsTo(models.Consultation, {
      foreignKey: "consultationId",
      as: "consultation",
      onDelete: "CASCADE",
    });
  };

  return Contraindication;
};
