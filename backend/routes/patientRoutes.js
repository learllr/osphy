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

// Gynécologie du patient
router.put("/:patientId/gynecology", updatePatientGynecology);

// Sommeil du patient
router.put("/:patientId/sleep", updatePatientSleep);

export default router;
