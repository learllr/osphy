import express from "express";
import {
  createPatient,
  createPatientActivity,
  deletePatientActivity,
  deletePatientByIdAndUserId,
  getAllPatients,
  getPatientActivities,
  getPatientById,
  updatePatient,
  updatePatientActivity,
  updatePatientGynecology,
  updatePatientSleep,
  createPatientContraindication,
  getPatientContraindications,
  updatePatientContraindication,
  deletePatientContraindication,
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
