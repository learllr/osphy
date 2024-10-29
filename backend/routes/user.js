import express from "express";
import db from "../orm/models/index.js";
import { hash } from "bcrypt";

const router = express.Router();
const { User } = db;

/*
----- RÉCUPÉRER LE PROFIL DE L'UTILISATEUR CONNECTÉ -----
*/
router.get("/profile", async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: [
        "id",
        "firstName",
        "lastName",
        "email",
        "roleId",
        "postalCode",
        "birthDate",
        "newsletterAccepted",
        "termsAccepted",
      ],
    });
    res.status(200).json(user);
  } catch (error) {
    console.error(
      "Erreur lors de la récupération du profil de l'utilisateur:",
      error
    );
    res.status(500).json({
      error: "Erreur lors de la récupération du profil de l'utilisateur.",
    });
  }
});

/*
----- MISE À JOUR DES INFORMATIONS DE L'UTILISATEUR (Profil de l'utilisateur authentifié) -----
*/
router.put("/update/:id", async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      postalCode,
      birthDate,
      newsletterAccepted,
      termsAccepted,
    } = req.body;
    const userId = req.params.id;

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: "Utilisateur non trouvé." });
    }

    await user.update({
      firstName: firstName || user.firstName,
      lastName: lastName || user.lastName,
      email: email || user.email,
      postalCode: postalCode || user.postalCode,
      birthDate: birthDate || user.birthDate,
      newsletterAccepted: newsletterAccepted ?? user.newsletterAccepted,
      termsAccepted: termsAccepted ?? user.termsAccepted,
    });

    res.status(200).json({
      message: "Informations de l'utilisateur mises à jour avec succès",
      user,
    });
  } catch (error) {
    console.error(
      "Erreur lors de la mise à jour des informations de l'utilisateur:",
      error
    );
    res.status(500).json({
      error: "Erreur lors de la mise à jour des informations de l'utilisateur",
    });
  }
});

/*
----- RÉCUPÉRER TOUS LES UTILISATEURS (Administration) -----
*/
router.get("/all", async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: [
        "id",
        "firstName",
        "lastName",
        "email",
        "roleId",
        "postalCode",
        "birthDate",
        "newsletterAccepted",
        "termsAccepted",
      ],
    });
    res.status(200).json(users);
  } catch (error) {
    console.error("Erreur lors de la récupération des utilisateurs:", error);
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération des utilisateurs." });
  }
});

/*
----- AJOUTER UN UTILISATEUR (Administration) -----
*/
router.post("/add", async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      roleId,
      postalCode,
      birthDate,
      newsletterAccepted,
      termsAccepted,
    } = req.body;

    const finalTermsAccepted =
      termsAccepted !== undefined ? termsAccepted : true;

    const hashedPassword = await hash(password, 10);

    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      roleId,
      postalCode,
      birthDate,
      newsletterAccepted,
      termsAccepted: finalTermsAccepted,
    });

    res.status(201).json({ message: "Utilisateur créé avec succès", user });
  } catch (error) {
    console.error("Erreur lors de la création de l'utilisateur:", error);
    res
      .status(500)
      .json({ error: "Erreur lors de la création de l'utilisateur" });
  }
});

/*
----- SUPPRIMER UN UTILISATEUR (Administration) -----
*/
router.delete("/delete/:id", async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: "Utilisateur non trouvé." });
    }

    await user.destroy();
    res.status(200).json({ message: "Utilisateur supprimé avec succès" });
  } catch (error) {
    console.error("Erreur lors de la suppression de l'utilisateur:", error);
    res
      .status(500)
      .json({ error: "Erreur lors de la suppression de l'utilisateur" });
  }
});

export default router;
