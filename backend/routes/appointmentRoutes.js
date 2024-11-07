import express from "express";
import {
  getAppointments,
  getAppointmentsByPatientId,
  create,
} from "../controllers/AppointmentController.js";

const router = express.Router();

router.get("/", getAppointments);
router.get("/:id", getAppointmentsByPatientId);
router.post("/", create);

export default router;
