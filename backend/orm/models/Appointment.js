"use strict";
import dayjs from "dayjs";
import { DataTypes, Model } from "sequelize";

export default (sequelize) => {
  class Appointment extends Model {}

  Appointment.init(
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
      type: {
        type: DataTypes.ENUM(
          "Suivi",
          "Première consultation",
          "Urgence",
          "Bilan",
          "Pédiatrique",
          "Autre"
        ),
        allowNull: false,
        defaultValue: "Suivi",
      },
      date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        get() {
          const rawValue = this.getDataValue("date");
          return rawValue ? dayjs(rawValue).format("DD/MM/YYYY") : null;
        },
        set(value) {
          this.setDataValue(
            "date",
            dayjs(value, "DD/MM/YYYY").format("YYYY-MM-DD")
          );
        },
      },
      startTime: {
        type: DataTypes.TIME,
        allowNull: false,
        get() {
          return this.getDataValue("startTime");
        },
        set(value) {
          this.setDataValue(
            "startTime",
            dayjs(value, "HH:mm").format("HH:mm:ss")
          );
        },
      },
      endTime: {
        type: DataTypes.TIME,
        allowNull: false,
        get() {
          return this.getDataValue("endTime");
        },
        set(value) {
          this.setDataValue(
            "endTime",
            dayjs(value, "HH:mm").format("HH:mm:ss")
          );
        },
      },
      status: {
        type: DataTypes.ENUM("Annulé", "En attente", "Confirmé"),
        defaultValue: "En attente",
        allowNull: false,
      },
      comment: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Appointment",
      tableName: "Appointments",
      timestamps: true,
    }
  );

  Appointment.associate = (models) => {
    Appointment.belongsTo(models.User, {
      foreignKey: "userId",
      as: "user",
    });
    Appointment.belongsTo(models.Patient, {
      foreignKey: "patientId",
      as: "patient",
    });
  };

  return Appointment;
};
