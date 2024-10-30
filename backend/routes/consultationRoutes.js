import express from "express";
import { getConsultationsByPatientId } from "../controllers/ConsultationController.js";

const router = express.Router();

router.get("/:id", getConsultationsByPatientId);

export default router;
