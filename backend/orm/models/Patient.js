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
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      gender: {
        type: DataTypes.ENUM("Homme", "Femme"),
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
        type: DataTypes.ENUM("Gaucher", "Droitier", "Ambidextre"),
        allowNull: true,
      },
      medicalTreatments: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      additionalInfo: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Patient",
      tableName: "Patients",
      timestamps: true,
    }
  );

  Patient.associate = (models) => {
    Patient.belongsTo(models.User, {
      foreignKey: "userId",
      as: "user",
      onDelete: "CASCADE",
    });

    Patient.hasMany(models.Consultation, {
      foreignKey: "patientId",
      as: "consultations",
      onDelete: "CASCADE",
    });

    Patient.hasMany(models.PatientActivity, {
      foreignKey: "patientId",
      as: "activities",
      onDelete: "CASCADE",
    });

    Patient.hasMany(models.PatientAntecedent, {
      foreignKey: "patientId",
      as: "antecedents",
      onDelete: "CASCADE",
    });

    Patient.hasMany(models.PatientContraindication, {
      foreignKey: "patientId",
      as: "contraindications",
      onDelete: "CASCADE",
    });

    Patient.hasOne(models.PatientGynecology, {
      foreignKey: "patientId",
      as: "gynecology",
      onDelete: "CASCADE",
    });

    Patient.hasMany(models.PatientPractitioner, {
      foreignKey: "patientId",
      as: "practitioners",
      onDelete: "CASCADE",
    });

    Patient.hasMany(models.PatientPregnancy, {
      foreignKey: "patientId",
      as: "pregnancies",
      onDelete: "CASCADE",
    });

    Patient.hasOne(models.PatientSleep, {
      foreignKey: "patientId",
      as: "sleep",
      onDelete: "CASCADE",
    });

    Patient.hasMany(models.PatientWarning, {
      foreignKey: "patientId",
      as: "warnings",
      onDelete: "CASCADE",
    });
  };

  return Patient;
};
