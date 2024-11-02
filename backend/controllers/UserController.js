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

export const updateUser = async (req, res) => {
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

    const user = await UserDAO.getUserById(userId);
    if (!user) {
      return res.status(404).json({ error: "Utilisateur non trouvé." });
    }

    const updatedUser = await UserDAO.updateUser(user, {
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

export const createUser = async (req, res) => {
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

    const user = await UserDAO.createUser({
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

    // await UserSettingDAO.createUserSetting({
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

export const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await UserDAO.getUserById(userId);
    if (!user) {
      return res.status(404).json({ error: "Utilisateur non trouvé." });
    }

    await UserDAO.deleteUser(user);
    res.status(200).json({ message: "Utilisateur supprimé avec succès" });
  } catch (error) {
    console.error("Erreur lors de la suppression de l'utilisateur:", error);
    res
      .status(500)
      .json({ error: "Erreur lors de la suppression de l'utilisateur" });
  }
};
