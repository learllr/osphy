import express from "express";
import {
  getProfile,
  updateUser,
  getAllUsers,
  createUser,
  deleteUser,
} from "../controllers/UserController.js";
import { updateUserSettings } from "../controllers/UserSettingController.js";

const router = express.Router();

router.get("/profile", getProfile);
router.put("/update/:id", updateUser);
router.get("/all", getAllUsers);
router.post("/add", createUser);
router.delete("/delete/:id", deleteUser);

router.put("/settings", updateUserSettings);

export default router;
