import express from "express";
import {
  getConsultationsByPatientId,
  createConsultation,
  deleteConsultationById,
  generateDiagnosis,
} from "../controllers/ConsultationController.js";

const router = express.Router();

router.get("/:id", getConsultationsByPatientId);
router.post("/", createConsultation);
router.delete("/:id", deleteConsultationById);

router.post("/diagnosis", generateDiagnosis);

export default router;
