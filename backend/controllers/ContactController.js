import ContactDAO from "../dao/ContactDAO.js";

export default class ContactController {
  static async createContact(req, res) {
    try {
      const contactData = req.body;
      const newContact = await ContactDAO.createContact(contactData);
      res.status(201).json({ message: "Message envoyé avec succès!", data: newContact });
    } catch (error) {
      console.error("Erreur lors de l'envoi du message :", error);
      res.status(500).json({ message: "Erreur lors de l’envoi du message." });
    }
  }
}
