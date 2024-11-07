import NewsletterDAO from "../dao/NewsletterDAO.js";

export default class NewsletterController {
  static async subscribe(req, res) {
    try {
      const subscriptionData = req.body;
      const newSubscription = await NewsletterDAO.create(subscriptionData);
      res.status(201).json({ message: "Inscription réussie!", data: newSubscription });
    } catch (error) {
      console.error("Erreur lors de l'inscription à la newsletter :", error);
      res.status(500).json({ message: "Erreur lors de l'inscription." });
    }
  }
}