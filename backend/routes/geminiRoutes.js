import express from "express";

import {
  analyzeMedicine,
  chatWithAI
} from "../controllers/geminiController.js";

const router = express.Router();

router.post("/analyze", analyzeMedicine);

router.post("/chat", chatWithAI);

export default router;