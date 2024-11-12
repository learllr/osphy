import express from "express";
import {
  getAllPatients,
  getPatientById,
  create,
  update,
  deletePatientByIdAndUserId,
} from "../controllers/PatientController.js";

const router = express.Router();

router.get("/", getAllPatients);
router.get("/:id", getPatientById);
router.post("/", create);
router.put("/:id", update);
router.delete("/:id", deletePatientByIdAndUserId);

export default router;
