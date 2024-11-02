import express from "express";
import {
  getConsultationsByPatientId,
  createConsultation,
  deleteConsultationById,
} from "../controllers/ConsultationController.js";

const router = express.Router();

router.get("/:id", getConsultationsByPatientId);
router.post("/", createConsultation);
router.delete("/:id", deleteConsultationById);

export default router;
