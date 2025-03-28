import OpenAI from "openai";
import DiagnosisDAO from "../dao/DiagnosisDAO.js";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const createDiagnosis = async (req, res) => {
  try {
    const {
      id,
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
        }, symptômes associés : ${
          symptoms.associatedSymptoms
        }, type de douleur : ${symptoms.painType}
          - Activités : ${activities.join(", ")}
    
          Génère un JSON contenant :
          - Un diagnostic différentiel sous forme de texte, avec les noms médicaux entourés des balises <strong></strong>.
          - Une liste de tous les examens cliniques ostéopathiques à adopter, incluant :
            - Nom du test
            - Description du test
            - Checked: false

          **Exemple de réponse attendue :**
          {
            "summary": "Le patient présente une douleur à l'épaule droite. Le diagnostic différentiel inclut une <strong>tendinite de la coiffe des rotateurs</strong>, une <strong>bursite sous-acromiale</strong> et une <strong>capsulite rétractile</strong>.",
            "exams": [
              {
                "name": "Test de Neer",
                "description": "Cet examen vise à évaluer la présence d'une bursite sous-acromiale en provoquant une compression sous l'acromion.",
                "checked": false
              },
            ]
          }
    
          Réponds uniquement avec un JSON valide.
        `,
      },
    ];

    console.log("messages", messages);
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages,
      response_format: { type: "json_object" },
    });

    let diagnosis;
    try {
      diagnosis = JSON.parse(completion.choices[0].message.content);
    } catch (error) {
      console.error("Erreur de parsing du JSON OpenAI :", error);
      return res
        .status(500)
        .json({ message: "Erreur de format JSON du diagnostic." });
    }

    const updated = await DiagnosisDAO.createDiagnosis(id, diagnosis);

    if (updated) {
      res.status(200).json({
        message: "Diagnostic généré et enregistré avec succès.",
        diagnosis,
      });
    } else {
      res.status(404).json({
        message: "Consultation non trouvée. Diagnostic non enregistré.",
      });
    }
  } catch (error) {
    console.error("Erreur avec l'API OpenAI :", error);
    res
      .status(500)
      .json({ message: "Erreur lors de la génération du diagnostic." });
  }
};

export const updateDiagnosis = async (req, res) => {
  try {
    const { id } = req.params;
    const { summary, exams } = req.body;

    const updated = await DiagnosisDAO.updateDiagnosis(id, { summary, exams });

    if (updated) {
      res.status(200).json({ message: "Diagnostic mis à jour avec succès." });
    } else {
      res.status(404).json({ message: "Diagnostic non trouvé." });
    }
  } catch (error) {
    console.error("Erreur lors de la mise à jour du diagnostic :", error);
    res.status(500).json({ message: "Erreur serveur." });
  }
};

export const deleteDiagnosis = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await DiagnosisDAO.deleteDiagnosis(id);

    if (deleted) {
      res.status(200).json({ message: "Diagnostic supprimé avec succès." });
    } else {
      res.status(404).json({ message: "Diagnostic non trouvé." });
    }
  } catch (error) {
    console.error("Erreur lors de la suppression du diagnostic :", error);
    res.status(500).json({ message: "Erreur serveur." });
  }
};
