import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import AuthentificationDAO from "../dao/AuthentificationDAO.js";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

export const signup = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      postalCode,
      birthDate,
      newsletter,
      terms,
    } = req.body;

    const existingUser = await AuthentificationDAO.findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ error: "Cet email est déjà utilisé." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await AuthentificationDAO.createUser({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      postalCode,
      birthDate,
      newsletterAccepted: newsletter,
      termsAccepted: terms,
    });

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
      firstName,
      lastName,
      roleId,
      postalCode,
      birthDate,
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
        email,
        firstName,
        lastName,
        roleId,
        postalCode,
        birthDate,
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