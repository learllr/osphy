import express from "express";
import { subscribe } from "../controllers/NewsletterController.js";

const router = express.Router();

router.post("/", subscribe);

export default router;
