import ConsultationDAO from "../dao/ConsultationDAO.js";

export const getConsultationsByPatientId = async (req, res) => {
  try {
    const { id } = req.params;
    const consultations = await ConsultationDAO.findAllConsultationByPatientId(
      id
    );

    res.status(200).json(consultations);
  } catch (error) {
    console.error("Erreur lors de la récupération des consultations:", error);
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération des consultations." });
  }
};

export const createConsultation = async (req, res) => {
  try {
    const consultation = await ConsultationDAO.createConsultation(req.body);
    res.status(201).json(consultation);
  } catch (error) {
    console.error("Erreur lors de l'ajout de la consultation:", error);
    res
      .status(500)
      .json({ message: "Erreur lors de l'ajout de la consultation." });
  }
};

export const deleteConsultationById = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await ConsultationDAO.deleteConsultationById(id);

    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: "Consultation non trouvée." });
    }
  } catch (error) {
    console.error("Erreur lors de la suppression de la consultation:", error);
    res
      .status(500)
      .json({ message: "Erreur lors de la suppression de la consultation." });
  }
};

export const updateConsultationById = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const updated = await ConsultationDAO.updateConsultationById(
      id,
      updatedData
    );

    if (updated) {
      res
        .status(200)
        .json({ message: "Consultation mise à jour avec succès." });
    } else {
      res.status(404).json({ message: "Consultation non trouvée." });
    }
  } catch (error) {
    console.error("Erreur lors de la mise à jour de la consultation :", error);
    res.status(500).json({
      message: "Erreur lors de la mise à jour de la consultation.",
    });
  }
};
