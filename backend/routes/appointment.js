import express from "express";
import db from "../orm/models/index.js";

const router = express.Router();
const { Appointment } = db;

/*
----- CRÉER UN RENDEZ-VOUS -----
*/
router.post("/appointments", async (req, res) => {
  try {
    const { title, description, start, end } = req.body;
    const userId = req.user.id;

    const newAppointment = await Appointment.create({
      title,
      description,
      start,
      end,
      userId,
    });

    res.status(201).json({
      message: "Rendez-vous créé avec succès",
      appointment: newAppointment,
    });
  } catch (error) {
    console.error("Erreur lors de la création du rendez-vous:", error);
    res
      .status(500)
      .json({ error: "Erreur lors de la création du rendez-vous" });
  }
});

/*
----- RÉCUPÉRER LES RENDEZ-VOUS D'UN UTILISATEUR -----
*/
router.get("/appointments", async (req, res) => {
  try {
    const userId = req.user.id;

    const appointments = await Appointment.findAll({
      where: { userId },
      order: [["start", "ASC"]],
    });

    res.status(200).json(appointments);
  } catch (error) {
    console.error("Erreur lors de la récupération des rendez-vous:", error);
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération des rendez-vous" });
  }
});

/*
----- METTRE À JOUR UN RENDEZ-VOUS -----
*/
router.put("/appointments/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, start, end } = req.body;
    const userId = req.user.id;

    const appointment = await Appointment.findOne({ where: { id, userId } });

    if (!appointment) {
      return res.status(404).json({ error: "Rendez-vous non trouvé." });
    }

    appointment.title = title || appointment.title;
    appointment.description = description || appointment.description;
    appointment.start = start || appointment.start;
    appointment.end = end || appointment.end;

    await appointment.save();

    res.status(200).json({
      message: "Rendez-vous mis à jour avec succès",
      appointment,
    });
  } catch (error) {
    console.error("Erreur lors de la mise à jour du rendez-vous:", error);
    res
      .status(500)
      .json({ error: "Erreur lors de la mise à jour du rendez-vous" });
  }
});

/*
----- SUPPRIMER UN RENDEZ-VOUS -----
*/
router.delete("/appointments/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const appointment = await Appointment.findOne({ where: { id, userId } });

    if (!appointment) {
      return res.status(404).json({ error: "Rendez-vous non trouvé." });
    }

    await appointment.destroy();

    res.status(200).json({ message: "Rendez-vous supprimé avec succès" });
  } catch (error) {
    console.error("Erreur lors de la suppression du rendez-vous:", error);
    res
      .status(500)
      .json({ error: "Erreur lors de la suppression du rendez-vous" });
  }
});

export default router;
