"use strict";
import { Model, DataTypes } from "sequelize";
import { compare, hash } from "bcrypt";

export default (sequelize) => {
  class User extends Model {
    async validatePassword(password) {
      return await compare(password, this.password);
    }
  }

  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
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
      postalCode: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          is: /^\d{5}$/,
        },
      },
      birthDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        validate: {
          isDate: true,
          isBefore: new Date().toISOString().split("T")[0],
        },
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
      hooks: {
        beforeCreate: async (user) => {
          if (user.password) {
            user.password = await hash(user.password, 10);
          }
        },
        beforeUpdate: async (user) => {
          if (user.changed("password")) {
            user.password = await hash(user.password, 10);
          }
        },
      },
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
  };

  return User;
};
