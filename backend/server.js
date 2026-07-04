import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import geminiRoutes from "./routes/geminiRoutes.js";

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json({ limit: "20mb" }));

app.use(express.urlencoded({ extended: true }));

app.use("/api/gemini", geminiRoutes);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "MediMind AI Backend Running 🚀",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `🚀 Server running on http://localhost:${PORT}`
  );
});