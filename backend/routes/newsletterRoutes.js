import express from "express";
import NewsletterController from "../controllers/NewsletterController.js";

const router = express.Router();

router.post("/", NewsletterController.subscribe);

export default router;
