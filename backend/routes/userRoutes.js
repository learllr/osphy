import express from "express";
import {
  getProfile,
  update,
  getAllUsers,
  create,
  delete,
} from "../controllers/UserController.js";
import {
  getUserSettings,
  update,
} from "../controllers/UserSettingController.js";

const router = express.Router();

router.get("/profile", getProfile);
router.put("/update/:id", update);
router.get("/all", getAllUsers);
router.post("/add", create);
router.delete("/delete/:id", delete);

router.get("/settings", getUserSettings);
router.put("/settings", update);

export default router;
