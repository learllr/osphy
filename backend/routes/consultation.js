import express from "express";
import db from "../orm/models/index.js";

const { Consultation } = db;

const router = express.Router();

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const consultations = await Consultation.findAll({
      where: { patientId: id },
    });

    if (!consultations) {
      return res.status(404).json({ message: "Aucune consultation trouvée." });
    }
    res.status(200).json(consultations);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération des consultations." });
  }
});

export default router;
