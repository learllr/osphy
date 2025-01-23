"use strict";
import { DataTypes, Model } from "sequelize";

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
        type: DataTypes.STRING,
        allowNull: true,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      postalCode: {
        type: DataTypes.STRING,
        allowNull: true,
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
      },
      email: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      occupation: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      height: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      weight: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      handedness: {
        type: DataTypes.ENUM("Gaucher", "Droitier", "Ambidextre"),
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
