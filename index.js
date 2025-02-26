import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// import routers
import usersRoutes from "./routes/users.js";
import listingRoutes from "./routes/listings.js";
import reviewsRoutes from "./routes/reviews.js";

dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const { PORT, BACKEND_URL, CORS_ORIGIN } = process.env;

app.use(cors({ origin: CORS_ORIGIN }));
app.use(express.json());
app.use(express.static("public"));
app.use("/public", express.static(path.join(__dirname, "public")));

app.get("/api", async (req, res) => {
  res.status(200).json({ message: "Welcome to miPlanta API" });
});

//Using routes
app.use("/api/users", usersRoutes);
app.use("/api/listings", listingRoutes);
app.use("/api/reviews", reviewsRoutes);

// processing unsupported routes
app.use((req, res) => {
  res.status(404).json({
    message: "Route not found",
  });
});

// start server
app.listen(PORT, () => {
  console.log(`Server is listening at ${BACKEND_URL}:${PORT}`);
});
