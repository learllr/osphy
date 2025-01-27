import express from "express";
import {
  createAppointment,
  deleteAppointment,
  getAppointments,
  getAppointmentsByPatientId,
  updateAppointment,
} from "../controllers/AppointmentController.js";

const router = express.Router();

router.get("/", getAppointments);
router.get("/:id", getAppointmentsByPatientId);
router.post("/", createAppointment);
router.put("/:id", updateAppointment);
router.delete("/:id", deleteAppointment);

export default router;
