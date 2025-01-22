import db from "../orm/models/index.js";

const {
  Patient,
  PatientActivity,
  PatientAntecedent,
  PatientContraindication,
  PatientGynecology,
  PatientPractitioner,
  PatientPregnancy,
  PatientSleep,
  PatientWarning,
} = db;

export default class PatientDAO {
  static async findAllPatientsByUserId(userId) {
    return await Patient.findAll({
      where: { userId },
      attributes: ["id", "gender", "lastName", "firstName", "birthDate"],
    });
  }

  static async findPatientByIdAndUserId(patientId, userId) {
    return await Patient.findOne({
      where: { id: patientId, userId },
      attributes: [
        "id",
        "gender",
        "lastName",
        "firstName",
        "birthDate",
        "address",
        "postalCode",
        "city",
        "mobilePhone",
        "email",
        "occupation",
        "height",
        "weight",
        "handedness",
        "additionalInfo",
      ],
      include: [
        {
          model: PatientActivity,
          as: "activities",
          attributes: ["id", "activity", "temporalInfo"],
        },
        {
          model: PatientAntecedent,
          as: "antecedents",
          attributes: ["id", "category", "antecedent", "year"],
        },
        {
          model: PatientContraindication,
          as: "contraindications",
          attributes: ["id", "contraindication", "temporalInfo"],
        },
        {
          model: PatientGynecology,
          as: "gynecology",
          attributes: ["period", "menopause", "contraception", "followUp"],
        },
        {
          model: PatientPractitioner,
          as: "practitioners",
          attributes: ["id", "profession", "fullName"],
        },
        {
          model: PatientPregnancy,
          as: "pregnancies",
          attributes: ["id", "gender", "deliveryMethod", "epidural"],
        },
        {
          model: PatientSleep,
          as: "sleep",
          attributes: ["sleepQuality", "sleepDuration", "restorativeSleep"],
        },
        {
          model: PatientWarning,
          as: "warnings",
          attributes: ["id", "warning"],
        },
      ],
    });
  }

  static async createPatient(patientData) {
    return await Patient.create(patientData);
  }

  static async updatePatient(patient, updatedData) {
    return await patient.update(updatedData);
  }

  static async deletePatient(patient) {
    return await patient.destroy();
  }

  /*
  ----- Informations du patient -----
  */

  static async findGynecologyByPatientId(patientId) {
    return await PatientGynecology.findOne({
      where: { patientId },
    });
  }

  static async updateGynecology(patientId, gynecologyData) {
    return await PatientGynecology.update(gynecologyData, {
      where: { patientId },
    });
  }

  static async createGynecology(patientId, gynecologyData) {
    return await PatientGynecology.create({
      patientId,
      ...gynecologyData,
    });
  }

  static async findSleepByPatientId(patientId) {
    return await PatientSleep.findOne({
      where: { patientId },
    });
  }

  static async updateSleep(patientId, sleepData) {
    return await PatientSleep.update(sleepData, {
      where: { patientId },
      returning: true,
    });
  }

  static async createSleep(patientId, sleepData) {
    return await PatientSleep.create({
      patientId,
      ...sleepData,
    });
  }
}
