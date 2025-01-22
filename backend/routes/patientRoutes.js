import express from "express";
import {
  create,
  deletePatientByIdAndUserId,
  getAllPatients,
  getPatientById,
  update,
  updatePatientGynecology,
  updatePatientSleep,
} from "../controllers/PatientController.js";

const router = express.Router();

router.get("/", getAllPatients);
router.get("/:id", getPatientById);
router.post("/", create);
router.put("/:id", update);
router.delete("/:id", deletePatientByIdAndUserId);

router.put("/:id/gynecology", updatePatientGynecology);
router.put("/:id/sleep", updatePatientSleep);

export default router;
