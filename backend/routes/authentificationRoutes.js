import express from "express";
import {
  signup,
  login,
  logout,
} from "../controllers/AuthentificationController.js";
import {
  requestPasswordReset,
  resetPassword,
} from "../controllers/AuthentificationController.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

router.post("/request-password-reset", requestPasswordReset);
router.post("/reset-password", resetPassword);

export default router;
