"use strict";
import { Model, DataTypes } from "sequelize";

export default (sequelize) => {
  class Newsletter extends Model {}

  Newsletter.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      status: {
        type: DataTypes.ENUM("Abonné", "Désabonné"),
        defaultValue: "Abonné",
        allowNull: false,
      },
      unsubscribeDate: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Newsletter",
      tableName: "Newsletters",
      timestamps: true,
      createdAt: "subscribeDate",
      updatedAt: false,
    }
  );

  return Newsletter;
};
