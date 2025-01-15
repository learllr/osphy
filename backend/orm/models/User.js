"use strict";
import { DataTypes, Model } from "sequelize";

export default (sequelize) => {
  class User extends Model {}

  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      identifier: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          len: [3, 50],
        },
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          len: [3, 50],
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [8, 100],
        },
      },
      roleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Roles",
          key: "id",
        },
        defaultValue: 4,
      },
      newsletterAccepted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      termsAccepted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        validate: {
          isTrue(value) {
            if (!value) {
              throw new Error("Terms of service must be accepted.");
            }
          },
        },
      },
    },
    {
      sequelize,
      modelName: "User",
      tableName: "Users",
      timestamps: true,
    }
  );

  User.associate = (models) => {
    User.belongsTo(models.Role, {
      foreignKey: "roleId",
      as: "role",
    });

    User.hasMany(models.Patient, {
      foreignKey: "userId",
      as: "patients",
      onDelete: "CASCADE",
    });

    User.hasOne(models.UserSetting, {
      foreignKey: "userId",
      as: "userSettings",
      onDelete: "CASCADE",
    });
  };

  return User;
};
