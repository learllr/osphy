import express from "express";
import {
  createPatient,
  createPatientActivity,
  createPatientAntecedent,
  createPatientContraindication,
  deletePatientActivity,
  deletePatientAntecedent,
  deletePatientByIdAndUserId,
  deletePatientContraindication,
  getAllPatients,
  getPatientActivities,
  getPatientAntecedents,
  getPatientById,
  getPatientContraindications,
  updatePatient,
  updatePatientActivity,
  updatePatientAntecedent,
  updatePatientContraindication,
  updatePatientGynecology,
  updatePatientSleep,
} from "../controllers/PatientController.js";

const router = express.Router();

router.get("/", getAllPatients);
router.get("/:id", getPatientById);
router.post("/", createPatient);
router.put("/:id", updatePatient);
router.delete("/:id", deletePatientByIdAndUserId);

// Activités du patient
router.post("/:patientId/activity", createPatientActivity);
router.get("/:patientId/activities", getPatientActivities);
router.put("/:patientId/activity/:activityId", updatePatientActivity);
router.delete("/:patientId/activity/:activityId", deletePatientActivity);

// Antécédents du patient
router.post("/:patientId/antecedent", createPatientAntecedent);
router.get("/:patientId/antecedents", getPatientAntecedents);
router.put("/:patientId/antecedent/:antecedentId", updatePatientAntecedent);
router.delete("/:patientId/antecedent/:antecedentId", deletePatientAntecedent);

// Contre-indications du patient
router.post("/:patientId/contraindication", createPatientContraindication);
router.get("/:patientId/contraindications", getPatientContraindications);
router.put(
  "/:patientId/contraindication/:contraindicationId",
  updatePatientContraindication
);
router.delete(
  "/:patientId/contraindication/:contraindicationId",
  deletePatientContraindication
);

// Gynécologie du patient
router.put("/:patientId/gynecology", updatePatientGynecology);

// Sommeil du patient
router.put("/:patientId/sleep", updatePatientSleep);

export default router;
