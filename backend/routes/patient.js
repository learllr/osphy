import express from "express";
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

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const userId = req.user.id;

    const patients = await Patient.findAll({
      where: { userId },
      attributes: ["id", "gender", "lastName", "firstName", "birthDate"],
    });

    res.status(200).json(patients);
  } catch (error) {
    console.error("Erreur lors de la récupération des patients:", error);
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération des patients." });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    console.log("id", id);
    console.log("userId", userId);

    const patient = await Patient.findOne({
      where: { id, userId },
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
        "medicalTreatments",
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
          attributes: ["id", "antecedent", "temporalInfo"],
        },
        {
          model: PatientContraindication,
          as: "contraindications",
          attributes: ["id", "contraindication", "temporalInfo"],
        },
        {
          model: PatientGynecology,
          as: "gynecology",
          attributes: ["period", "menopause", "contraception"],
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
});

router.post("/", async (req, res) => {
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

    const newPatient = await Patient.create({
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
});

router.put("/:id", async (req, res) => {
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
    } = req.body;

    const patient = await Patient.findOne({ where: { id, userId } });
    if (!patient) {
      return res.status(404).json({ message: "Patient non trouvé." });
    }

    await patient.update({
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
    res.status(200).json(patient);
  } catch (error) {
    console.error("Erreur lors de la mise à jour du patient:", error);
    res
      .status(500)
      .json({ message: "Erreur lors de la mise à jour du patient." });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const patient = await Patient.findOne({ where: { id, userId } });
    if (!patient) {
      return res.status(404).json({ message: "Patient non trouvé." });
    }

    await patient.destroy();
    res.status(204).send();
  } catch (error) {
    console.error("Erreur lors de la suppression du patient:", error);
    res
      .status(500)
      .json({ message: "Erreur lors de la suppression du patient." });
  }
});

export default router;
