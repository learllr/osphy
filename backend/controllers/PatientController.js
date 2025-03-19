import { sanitizeInput } from "../../shared/utils/textUtils.js";
import PatientDAO from "../dao/PatientDAO.js";

export const getAllPatients = async (req, res) => {
  try {
    const userId = req.user.id;
    const patients = await PatientDAO.findAllPatientsByUserId(userId);
    res.status(200).json(patients);
  } catch (error) {
    console.error("Erreur lors de la récupération des patients:", error);
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération des patients." });
  }
};

export const getPatientById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const patient = await PatientDAO.findPatientByIdAndUserId(id, userId);
    if (!patient) {
      return res.status(404).json({ message: "Patient non trouvé." });
    }

    res.status(200).json(patient);
  } catch (error) {
    console.error("Erreur lors de la récupération du patient:", error);
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération du patient." });
  }
};

export const createPatient = async (req, res) => {
  try {
    const userId = req.user.id;
    const {
      gender,
      lastName,
      firstName,
      birthDate,
      address,
      postalCode,
      city,
      mobilePhone,
      email,
      occupation,
    } = req.body;

    const newPatient = await PatientDAO.createPatient({
      userId,
      gender,
      lastName,
      firstName,
      birthDate,
      address,
      postalCode,
      city,
      mobilePhone,
      email,
      occupation,
    });

    res.status(201).json(newPatient);
  } catch (error) {
    console.error("Erreur lors de la création du patient:", error);
    res.status(500).json({ message: "Erreur lors de la création du patient." });
  }
};

export const updatePatient = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const {
      gender,
      lastName,
      firstName,
      birthDate,
      address,
      postalCode,
      city,
      mobilePhone,
      email,
      occupation,
      weight,
      height,
      handedness,
      additionalInfo,
    } = req.body;

    const patient = await PatientDAO.findPatientByIdAndUserId(id, userId);
    if (!patient) {
      return res.status(404).json({ message: "Patient non trouvé." });
    }

    const updatedPatient = await PatientDAO.updatePatient(patient, {
      gender: sanitizeInput(gender),
      lastName: sanitizeInput(lastName),
      firstName: sanitizeInput(firstName),
      birthDate: sanitizeInput(birthDate),
      address: sanitizeInput(address),
      postalCode: sanitizeInput(postalCode),
      city: sanitizeInput(city),
      mobilePhone: sanitizeInput(mobilePhone),
      email: sanitizeInput(email),
      occupation: sanitizeInput(occupation),
      weight: sanitizeInput(weight),
      height: sanitizeInput(height),
      handedness: sanitizeInput(handedness),
      additionalInfo: sanitizeInput(additionalInfo),
    });

    res.status(200).json(updatedPatient);
  } catch (error) {
    console.error("Erreur lors de la mise à jour du patient:", error);
    res
      .status(500)
      .json({ message: "Erreur lors de la mise à jour du patient." });
  }
};

export const deletePatientByIdAndUserId = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const patient = await PatientDAO.findPatientByIdAndUserId(id, userId);
    if (!patient) {
      return res.status(404).json({ message: "Patient non trouvé." });
    }

    await PatientDAO.deletePatient(patient);
    res.status(204).send();
  } catch (error) {
    console.error("Erreur lors de la suppression du patient:", error);
    res
      .status(500)
      .json({ message: "Erreur lors de la suppression du patient." });
  }
};

/*
----- Activités du patient -----
*/

export const createPatientActivity = async (req, res) => {
  try {
    const { patientId } = req.params;
    const { activity, temporalInfo } = req.body;

    const newActivity = await PatientDAO.createActivity({
      patientId,
      activity: sanitizeInput(activity),
      temporalInfo: sanitizeInput(temporalInfo),
    });

    res.status(201).json(newActivity);
  } catch (error) {
    console.error("❌ Erreur lors de l'ajout d'une activité:", error);
    res.status(500).json({ message: "Erreur lors de l'ajout de l'activité." });
  }
};

export const getPatientActivities = async (req, res) => {
  try {
    const { patientId } = req.params;

    const activities = await PatientDAO.findActivitiesByPatientId(patientId);

    if (!activities) {
      return res
        .status(404)
        .json({ message: "Aucune activité trouvée pour ce patient." });
    }

    res.status(200).json(activities);
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des activités du patient:",
      error
    );
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération des activités." });
  }
};

export const updatePatientActivity = async (req, res) => {
  try {
    const { patientId, activityId } = req.params;
    const { activity, temporalInfo } = req.body;

    const updatedActivityData = {
      activity,
      temporalInfo,
    };

    const existingActivity = await PatientDAO.findActivityById(activityId);

    let updatedActivity;
    if (existingActivity) {
      updatedActivity = await PatientDAO.updateActivity(
        activityId,
        updatedActivityData
      );
    } else {
      updatedActivity = await PatientDAO.createActivity({
        patientId,
        ...updatedActivityData,
      });
    }

    res.status(200).json(updatedActivity);
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'activité :", error);
    res
      .status(500)
      .json({ message: "Erreur lors de la mise à jour de l'activité." });
  }
};

export const deletePatientActivity = async (req, res) => {
  try {
    const { activityId } = req.params;

    await PatientDAO.deleteActivity(activityId);
    res.status(204).send();
  } catch (error) {
    console.error("Erreur lors de la suppression de l'activité :", error);
    res
      .status(500)
      .json({ message: "Erreur lors de la suppression de l'activité." });
  }
};

/*
----- Antécédents du patient -----
*/

export const createPatientAntecedent = async (req, res) => {
  try {
    const { patientId } = req.params;
    const { category, antecedent, year } = req.body;

    const newAntecedent = await PatientDAO.createAntecedent({
      patientId,
      category: sanitizeInput(category) || "Traumatique",
      year: sanitizeInput(year),
      antecedent: sanitizeInput(antecedent),
    });

    res.status(201).json(newAntecedent);
  } catch (error) {
    console.error("Erreur lors de l'ajout d'un antécédent :", error);
    res
      .status(500)
      .json({ message: "Erreur lors de l'ajout de l'antécédent." });
  }
};

export const getPatientAntecedents = async (req, res) => {
  try {
    const { patientId } = req.params;

    const antecedents = await PatientDAO.findAntecedentsByPatientId(patientId);

    res.status(200).json(antecedents);
  } catch (error) {
    console.error("Erreur lors de la récupération des antécédents :", error);
    res.status(500).json({
      message: "Erreur lors de la récupération des antécédents.",
    });
  }
};

export const updatePatientAntecedent = async (req, res) => {
  try {
    const { antecedentId } = req.params;
    const { category, antecedent, year } = req.body;

    const updatedAntecedent = await PatientDAO.updateAntecedent(antecedentId, {
      category: sanitizeInput(category) || "Traumatique",
      year: sanitizeInput(year),
      antecedent: sanitizeInput(antecedent),
    });

    res.status(200).json(updatedAntecedent);
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'antécédent :", error);
    res.status(500).json({
      message: "Erreur lors de la mise à jour de l'antécédent.",
    });
  }
};

export const deletePatientAntecedent = async (req, res) => {
  try {
    const { antecedentId } = req.params;

    await PatientDAO.deleteAntecedent(antecedentId);
    res.status(204).send();
  } catch (error) {
    console.error("Erreur lors de la suppression de l'antécédent :", error);
    res.status(500).json({
      message: "Erreur lors de la suppression de l'antécédent.",
    });
  }
};

/*
----- Contre-indications du patient -----
*/

export const createPatientContraindication = async (req, res) => {
  try {
    const { patientId } = req.params;
    const { contraindication, temporalInfo } = req.body;

    const newContraindication = await PatientDAO.createContraindication({
      patientId,
      contraindication: sanitizeInput(contraindication),
      temporalInfo: sanitizeInput(temporalInfo),
    });

    res.status(201).json(newContraindication);
  } catch (error) {
    console.error("Erreur lors de l'ajout d'une contre-indication:", error);
    res
      .status(500)
      .json({ message: "Erreur lors de l'ajout de la contre-indication." });
  }
};

export const getPatientContraindications = async (req, res) => {
  try {
    const { patientId } = req.params;

    const contraindications = await PatientDAO.findContraindicationsByPatientId(
      patientId
    );

    res.status(200).json(contraindications);
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des contre-indications:",
      error
    );
    res.status(500).json({
      message: "Erreur lors de la récupération des contre-indications.",
    });
  }
};

export const updatePatientContraindication = async (req, res) => {
  try {
    const { contraindicationId } = req.params;
    const { value, temporalInfo } = req.body;

    const updatedContraindication = await PatientDAO.updateContraindication(
      contraindicationId,
      {
        contraindication: sanitizeInput(value),
        temporalInfo: sanitizeInput(temporalInfo),
      }
    );

    res.status(200).json(updatedContraindication);
  } catch (error) {
    console.error(
      "Erreur lors de la mise à jour de la contre-indication:",
      error
    );
    res.status(500).json({
      message: "Erreur lors de la mise à jour de la contre-indication.",
    });
  }
};

export const deletePatientContraindication = async (req, res) => {
  try {
    const { contraindicationId } = req.params;

    await PatientDAO.deleteContraindication(contraindicationId);
    res.status(204).send();
  } catch (error) {
    console.error(
      "Erreur lors de la suppression de la contre-indication:",
      error
    );
    res.status(500).json({
      message: "Erreur lors de la suppression de la contre-indication.",
    });
  }
};

/*
  ----- Gynécologie du patient -----
  */

export const updatePatientGynecology = async (req, res) => {
  try {
    const { patientId } = req.params;
    const userId = req.user.id;
    const { period, menopause, contraception, followUp } = req.body;

    const updatedGynecologyData = {
      period: sanitizeInput(period),
      menopause: sanitizeInput(menopause),
      contraception: sanitizeInput(contraception),
      followUp: sanitizeInput(followUp),
    };

    const patient = await PatientDAO.findPatientByIdAndUserId(
      patientId,
      userId
    );
    if (!patient) {
      return res.status(404).json({ message: "Patient non trouvé." });
    }

    const existingGynecology = await PatientDAO.findGynecologyByPatientId(
      patient.id
    );

    let updatedGynecology;
    if (existingGynecology) {
      updatedGynecology = await PatientDAO.updateGynecology(
        patient.id,
        updatedGynecologyData
      );
    } else {
      updatedGynecology = await PatientDAO.createGynecology(
        patient.id,
        updatedGynecologyData
      );
    }

    res.status(200).json(updatedGynecology);
  } catch (error) {
    console.error("Erreur lors de la mise à jour de la gynécologie:", error);
    res
      .status(500)
      .json({ message: "Erreur lors de la mise à jour de la gynécologie." });
  }
};

/*
  ----- Sommeil du patient -----
  */

export const updatePatientSleep = async (req, res) => {
  try {
    const { patientId } = req.params;
    const userId = req.user.id;
    const { sleepQuality, sleepDuration, restorativeSleep } = req.body;

    const updatedSleepData = {
      sleepQuality: sanitizeInput(sleepQuality),
      sleepDuration: sanitizeInput(sleepDuration),
      restorativeSleep: sanitizeInput(restorativeSleep),
    };

    const patient = await PatientDAO.findPatientByIdAndUserId(
      patientId,
      userId
    );
    if (!patient) {
      return res.status(404).json({ message: "Patient non trouvé." });
    }

    const existingSleepData = await PatientDAO.findSleepByPatientId(patient.id);

    let updatedSleep;
    if (existingSleepData) {
      updatedSleep = await PatientDAO.updateSleep(patient.id, updatedSleepData);
    } else {
      updatedSleep = await PatientDAO.createSleep(patient.id, updatedSleepData);
    }

    res.status(200).json(updatedSleep);
  } catch (error) {
    console.error("Erreur lors de la mise à jour du sommeil:", error);
    res
      .status(500)
      .json({ message: "Erreur lors de la mise à jour du sommeil." });
  }
};
