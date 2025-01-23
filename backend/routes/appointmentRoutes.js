import express from "express";
import {
  createAppointment,
  getAppointments,
  getAppointmentsByPatientId,
  updateAppointment,
} from "../controllers/AppointmentController.js";

const router = express.Router();

router.get("/", getAppointments);
router.get("/:id", getAppointmentsByPatientId);
router.post("/", createAppointment);
router.put("/:id", updateAppointment);

export default router;
