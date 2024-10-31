"use strict";
import { Model, DataTypes } from "sequelize";

export default (sequelize) => {
  class UserSetting extends Model {}

  UserSetting.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      consultationDuration: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 5,
          max: 240,
        },
        defaultValue: 60,
      },
    },
    {
      sequelize,
      modelName: "UserSetting",
      tableName: "UserSettings",
      timestamps: true,
    }
  );

  UserSetting.associate = (models) => {
    UserSetting.belongsTo(models.User, {
      foreignKey: "userId",
      as: "user",
      onDelete: "CASCADE",
    });
  };

  return UserSetting;
};
