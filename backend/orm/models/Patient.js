"use strict";
import { Model, DataTypes } from "sequelize";

export default (sequelize) => {
  class Patient extends Model {}

  Patient.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      civility: {
        type: DataTypes.ENUM('Mr', 'Mrs', 'Miss'),
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          len: [2, 100],
        },
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          len: [2, 100],
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
      address: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      postalCode: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          is: /^\d{5}$/,
        },
      },
      city: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      addressComplement: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      mobilePhone: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          is: /^[0-9]{10}$/,
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          isEmail: true,
        },
      },
      occupation: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      boysCount: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      girlsCount: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      height: {
        type: DataTypes.FLOAT,
        allowNull: true,
        validate: {
          min: 0,
        },
      },
      weight: {
        type: DataTypes.FLOAT,
        allowNull: true,
        validate: {
          min: 0,
        },
      },
      handedness: {
        type: DataTypes.ENUM('Gaucher', 'Droitier', 'Ambidextre'),
        allowNull: true,
      },
      medicalTreatments: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      additionalInfo: {
        type: DataTypes.TEXT,
        allowNull: true,
      }
    },
    {
      sequelize,
      modelName: "Patient",
      tableName: "Patients",
      timestamps: true,
    }
  );

  Patient.associate = (models) => {
    Patient.hasMany(models.Consultation, {
      foreignKey: "patientId",
      as: "consultations",
      onDelete: "CASCADE",
    });
  };

  return Patient;
};
