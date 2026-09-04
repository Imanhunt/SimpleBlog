import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { connectDB } from "./config/database";
import postRoutes from "./routes/postRoutes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "SimpleBlog API is running 🚀"
  });
});

app.get("/api/test", (req, res) => {
  res.json({
    success: true,
    message: "API is working perfectly 🚀"
  });
});

// Posts Routes
app.use("/posts", postRoutes);

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();