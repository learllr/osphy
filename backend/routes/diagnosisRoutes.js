import express from "express";
import {
  createDiagnosis,
  deleteDiagnosis,
  updateDiagnosis,
} from "../controllers/DiagnosisController.js";

const router = express.Router();

router.post("/", createDiagnosis);
router.put("/:id", updateDiagnosis);
router.delete("/:id", deleteDiagnosis);

export default router;
