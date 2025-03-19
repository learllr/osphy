import express from "express";
import {
  createPatientPregnancy,
  deletePatientPregnancy,
  getPatientPregnancies,
  updatePatientPregnancy,
} from "../controllers/PregnancyPatientController.js";

const router = express.Router();

router.post("/:patientId", createPatientPregnancy);
router.get("/:patientId", getPatientPregnancies);
router.put("/:patientId/:pregnancyId", updatePatientPregnancy);
router.delete("/:patientId/:pregnancyId", deletePatientPregnancy);

export default router;
