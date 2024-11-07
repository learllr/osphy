import { hash } from "bcrypt";
import UserDAO from "../dao/UserDAO.js";
import UserSettingDAO from "../dao/UserSettingDAO.js";

export const getProfile = async (req, res) => {
  try {
    const user = await UserDAO.getUserById(req.user.id);
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
};

export const update = async (req, res) => {
  try {
    const { firstName, lastName, email, newsletterAccepted, termsAccepted } =
      req.body;
    const userId = req.params.id;

    const user = await UserDAO.getUserById(userId);
    if (!user) {
      return res.status(404).json({ error: "Utilisateur non trouvé." });
    }

    const updatedUser = await UserDAO.update(user, {
      firstName: firstName || user.firstName,
      lastName: lastName || user.lastName,
      email: email || user.email,
      newsletterAccepted: newsletterAccepted ?? user.newsletterAccepted,
      termsAccepted: termsAccepted ?? user.termsAccepted,
    });

    res.status(200).json({
      message: "Informations de l'utilisateur mises à jour avec succès",
      user: updatedUser,
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
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await UserDAO.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    console.error("Erreur lors de la récupération des utilisateurs:", error);
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération des utilisateurs." });
  }
};

export const create = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      roleId,
      newsletterAccepted,
      termsAccepted,
    } = req.body;

    const finalTermsAccepted =
      termsAccepted !== undefined ? termsAccepted : true;
    const hashedPassword = await hash(password, 10);

    const user = await UserDAO.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      roleId,
      newsletterAccepted,
      termsAccepted: finalTermsAccepted,
    });

    // await UserSettingDAO.create({
    //   userId: user.id,
    //   consultationDuration: 60,
    // });

    res.status(201).json({ message: "Utilisateur créé avec succès", user });
  } catch (error) {
    console.error("Erreur lors de la création de l'utilisateur:", error);
    res
      .status(500)
      .json({ error: "Erreur lors de la création de l'utilisateur" });
  }
};

export const delete = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await UserDAO.getUserById(userId);
    if (!user) {
      return res.status(404).json({ error: "Utilisateur non trouvé." });
    }

    await UserDAO.delete(user);
    res.status(200).json({ message: "Utilisateur supprimé avec succès" });
  } catch (error) {
    console.error("Erreur lors de la suppression de l'utilisateur:", error);
    res
      .status(500)
      .json({ error: "Erreur lors de la suppression de l'utilisateur" });
  }
};
