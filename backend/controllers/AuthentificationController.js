import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserDAO from "../dao/UserDAO.js";
import AuthentificationDAO from "../dao/AuthentificationDAO.js";
import UserSettingDAO from "../dao/UserSettingDAO.js";
import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

export const signup = async (req, res) => {
  try {
    const {
      identifier,
      firstName,
      lastName,
      email,
      password,
      newsletterAccepted,
      termsAccepted,
    } = req.body;

    const existingUser = await AuthentificationDAO.findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ error: "Cet email est déjà utilisé." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await UserDAO.createUser({
      identifier,
      firstName,
      lastName,
      email,
      password: hashedPassword,
      newsletterAccepted,
      termsAccepted,
    });

    // await UserSettingDAO.createUserSetting({
    //   userId: user.id,
    //   consultationDuration: 60,
    // });

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: "1h",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 1000,
      sameSite: "Strict",
    });
    res.status(201).json({ message: "Utilisateur créé avec succès" });
  } catch (error) {
    console.error("Erreur lors de l'inscription:", error);
    res
      .status(500)
      .json({ error: "Erreur lors de l'inscription de l'utilisateur" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await AuthentificationDAO.findUserByEmail(email);
    if (!user) {
      return res
        .status(400)
        .json({ error: "Email ou mot de passe incorrect." });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ error: "Email ou mot de passe incorrect." });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: "1h",
    });

    const {
      id,
      identifier,
      firstName,
      lastName,
      roleId,
      newsletterAccepted,
      createdAt,
    } = user;

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 1000,
      sameSite: "Strict",
    });

    res.status(200).json({
      message: "Connexion réussie",
      user: {
        id,
        identifier,
        email,
        firstName,
        lastName,
        roleId,
        newsletterAccepted,
        createdAt,
      },
      token,
    });
  } catch (error) {
    console.error("Erreur lors de la connexion:", error);
    res
      .status(500)
      .json({ error: "Erreur lors de la connexion de l'utilisateur" });
  }
};

export const logout = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Déconnexion réussie" });
};

export const requestPasswordReset = async (req, res) => {
  const { email } = req.body;
  const user = await AuthentificationDAO.findUserByEmail(email);

  if (!user) {
    return res.status(404).json({ message: "Utilisateur non trouvé" });
  }

  const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "1h" });

  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: user.email,
    subject: "Demande de réinitialisation de mot de passe",
    text: `Cliquez sur le lien suivant pour réinitialiser votre mot de passe : ${resetUrl}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res
        .status(500)
        .json({ message: "Erreur lors de l'envoi de l'email", error });
    }
    res.json({ message: "E-mail de réinitialisation envoyé" });
  });
};

export const resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await AuthentificationDAO.updateUserPassword(
      decoded.userId,
      hashedPassword
    );

    res.json({ message: "Mot de passe réinitialisé avec succès" });
  } catch (error) {
    res.status(400).json({ message: "Token invalide ou expiré" });
  }
};
