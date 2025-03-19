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
  ----- Activités du patient -----
  */

  static async findActivitiesByPatientId(patientId) {
    return await PatientActivity.findAll({
      where: { patientId },
      attributes: ["id", "activity", "temporalInfo"],
    });
  }

  static async findActivityById(activityId) {
    return await PatientActivity.findOne({
      where: { id: activityId },
    });
  }

  static async createActivity(activityData) {
    const activity = await PatientActivity.create(activityData);

    return await PatientActivity.findOne({
      where: { id: activity.id },
      attributes: ["id", "activity", "temporalInfo"],
    });
  }

  static async updateActivity(activityId, updatedData) {
    const [updatedCount] = await PatientActivity.update(updatedData, {
      where: { id: activityId },
    });

    if (updatedCount === 0) {
      console.error("Aucune ligne mise à jour !");
      return null;
    }

    const updatedActivity = await PatientActivity.findOne({
      where: { id: activityId },
    });

    return updatedActivity;
  }

  static async deleteActivity(activityId) {
    return await PatientActivity.destroy({
      where: { id: activityId },
    });
  }

  /*
  ----- Antécédents du patient -----
  */

  static async findAntecedentsByPatientId(patientId) {
    return await PatientAntecedent.findAll({
      where: { patientId },
      attributes: ["id", "category", "antecedent", "year"],
    });
  }

  static async createAntecedent(antecedentData) {
    const antecedent = await PatientAntecedent.create(antecedentData);

    return await PatientAntecedent.findOne({
      where: { id: antecedent.id },
      attributes: ["id", "category", "antecedent", "year"],
    });
  }

  static async updateAntecedent(antecedentId, updatedData) {
    const [updatedCount] = await PatientAntecedent.update(updatedData, {
      where: { id: antecedentId },
    });

    if (updatedCount === 0) {
      console.error("Aucune ligne mise à jour !");
      return null;
    }

    return await PatientAntecedent.findOne({
      where: { id: antecedentId },
      attributes: ["id", "category", "antecedent", "year"],
    });
  }

  static async deleteAntecedent(antecedentId) {
    return await PatientAntecedent.destroy({
      where: { id: antecedentId },
    });
  }

  /*
  ----- Contre-indications du patient -----
  */

  static async findContraindicationsByPatientId(patientId) {
    return await PatientContraindication.findAll({
      where: { patientId },
      attributes: ["id", "contraindication", "temporalInfo"],
    });
  }

  static async createContraindication(contraindicationData) {
    const contraindication = await PatientContraindication.create(
      contraindicationData
    );

    return await PatientContraindication.findOne({
      where: { id: contraindication.id },
      attributes: ["id", "contraindication", "temporalInfo"],
    });
  }

  static async updateContraindication(contraindicationId, updatedData) {
    const [updatedCount] = await PatientContraindication.update(updatedData, {
      where: { id: contraindicationId },
    });

    if (updatedCount === 0) {
      console.error("Aucune ligne mise à jour !");
      return null;
    }

    return await PatientContraindication.findOne({
      where: { id: contraindicationId },
    });
  }

  static async deleteContraindication(contraindicationId) {
    return await PatientContraindication.destroy({
      where: { id: contraindicationId },
    });
  }

  /*
  ----- Gynécologie du patient -----
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

  /*
  ----- Sommeil du patient -----
  */

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
