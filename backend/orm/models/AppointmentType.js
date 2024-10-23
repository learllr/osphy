"use strict";
import { Model, DataTypes } from "sequelize";

export default (sequelize) => {
  class AppointmentType extends Model {}

  AppointmentType.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: true,
        },
      }
    },
    {
      sequelize,
      modelName: "AppointmentType",
      tableName: "AppointmentTypes",
      timestamps: false,
    }
  );

  return AppointmentType;
};
