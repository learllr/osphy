import ConsultationDAO from "../dao/ConsultationDAO.js";

export const getConsultationsByPatientId = async (req, res) => {
  try {
    const { id } = req.params;
    const consultations = await ConsultationDAO.findAllByPatientId(id);

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
    const consultation = await ConsultationDAO.create(req.body);
    res.status(201).json(consultation);
  } catch (error) {
    console.error("Erreur lors de l'ajout de la consultation:", error);
    res
      .status(500)
      .json({ message: "Erreur lors de l'ajout de la consultation." });
  }
};
