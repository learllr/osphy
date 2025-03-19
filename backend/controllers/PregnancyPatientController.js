import { sanitizeInput } from "../../shared/utils/textUtils.js";
import PregnancyPatientDAO from "../dao/PregnancyPatientDAO.js";

export const createPatientPregnancy = async (req, res) => {
  try {
    const { patientId } = req.params;
    const { gender, deliveryMethod, epidural } = req.body;

    const newPregnancy = await PregnancyPatientDAO.createPregnancy({
      patientId,
      gender: sanitizeInput(gender) || "Garçon",
      deliveryMethod: sanitizeInput(deliveryMethod) || "Voie basse",
      epidural: sanitizeInput(epidural) || true,
    });

    res.status(201).json(newPregnancy);
  } catch (error) {
    console.error("Erreur lors de l'ajout d'une grossesse :", error);
    res
      .status(500)
      .json({ message: "Erreur lors de l'ajout de la grossesse." });
  }
};

export const getPatientPregnancies = async (req, res) => {
  try {
    const { patientId } = req.params;

    const pregnancies = await PregnancyPatientDAO.findPregnanciesByPatientId(
      patientId
    );

    res.status(200).json(pregnancies);
  } catch (error) {
    console.error("Erreur lors de la récupération des grossesses :", error);
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération des grossesses." });
  }
};

export const updatePatientPregnancy = async (req, res) => {
  try {
    const { pregnancyId } = req.params;
    const { gender, deliveryMethod, epidural } = req.body;

    const updatedPregnancy = await PregnancyPatientDAO.updatePregnancy(
      pregnancyId,
      {
        gender: sanitizeInput(gender) || "Garçon",
        deliveryMethod: sanitizeInput(deliveryMethod) || "Voie basse",
        epidural: sanitizeInput(epidural) || true,
      }
    );

    res.status(200).json(updatedPregnancy);
  } catch (error) {
    console.error("Erreur lors de la mise à jour de la grossesse :", error);
    res
      .status(500)
      .json({ message: "Erreur lors de la mise à jour de la grossesse." });
  }
};

export const deletePatientPregnancy = async (req, res) => {
  try {
    const { pregnancyId } = req.params;

    await PregnancyPatientDAO.deletePregnancy(pregnancyId);
    res.status(204).send();
  } catch (error) {
    console.error("Erreur lors de la suppression de la grossesse :", error);
    res
      .status(500)
      .json({ message: "Erreur lors de la suppression de la grossesse." });
  }
};
