import express from "express";
import {
  getConsultationsByPatientId,
  createConsultation,
} from "../controllers/ConsultationController.js";

const router = express.Router();

router.get("/:id", getConsultationsByPatientId);
router.post("/", createConsultation);

export default router;
