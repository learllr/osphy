import OpenAI from "openai";
import ConsultationDAO from "../dao/ConsultationDAO.js";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

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

export const generateDiagnosis = async (req, res) => {
  try {
    const {
      gender,
      age,
      weight,
      height,
      occupation,
      antecedents,
      symptoms,
      activities,
    } = req.body;

    const messages = [
      {
        role: "user",
        content: `
        Voici les informations d'un patient :
        - Sexe : ${gender}
        - Âge : ${age} ans
        - Poids : ${weight} kg
        - Taille : ${height} cm
        - Profession : ${occupation}
        - Antécédents : ${antecedents.join(", ")}
        - Symptômes : ${symptoms.plaint}, facteurs aggravants : ${
          symptoms.aggravatingFactors
        }, facteurs soulageants : ${
          symptoms.relievingFactors
        }, symptômes associés : ${symptoms.associatedSymptoms}
        - Activités : ${activities.join(", ")}

        Donne-moi les diagnostics potentiels et l'examen clinique à adopter.
        `,
      },
    ];
    console.log(messages);
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      store: true,
      messages,
    });

    const diagnosis = completion.choices[0].message.content;

    res.status(200).json({ diagnosis });
  } catch (error) {
    console.error("Erreur avec l'API OpenAI :", error);
    res
      .status(500)
      .json({ message: "Erreur lors de la génération du diagnostic." });
  }
};
