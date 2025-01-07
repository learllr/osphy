import express from "express";
import {
  createConsultation,
  deleteConsultationById,
  generateDiagnosis,
  getConsultationsByPatientId,
  updateConsultationById,
} from "../controllers/ConsultationController.js";

const router = express.Router();

router.get("/:id", getConsultationsByPatientId);
router.post("/", createConsultation);
router.delete("/:id", deleteConsultationById);
router.put("/:id", updateConsultationById);

router.post("/diagnosis", generateDiagnosis);

export default router;
