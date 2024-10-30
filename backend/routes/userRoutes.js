import express from "express";
import {
  getProfile,
  updateUser,
  getAllUsers,
  createUser,
  deleteUser,
} from "../controllers/UserController.js";

const router = express.Router();

router.get("/profile", getProfile);
router.put("/update/:id", updateUser);
router.get("/all", getAllUsers);
router.post("/add", createUser);
router.delete("/delete/:id", deleteUser);

export default router;
