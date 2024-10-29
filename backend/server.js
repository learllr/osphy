import express from "express";
import db from "./orm/models/index.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import { authenticateToken } from "./middlewares/authMiddleware.js";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/user.js";
import appointmentRoutes from "./routes/appointment.js";
import patientRoutes from "./routes/patient.js";
import consultationRoutes from "./routes/consultation.js";

const app = express();
const port = process.env.PORT || 5000;
const frontendUrl = "http://localhost:5173";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const corsOptions = {
  origin: frontendUrl,
  credentials: true,
};

app.use(cors(corsOptions));
app.use(cookieParser());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", frontendUrl);
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

app.use("/api/auth", authRoutes);
app.use("/api/user", authenticateToken, userRoutes);
app.use("/api/appointment", authenticateToken, appointmentRoutes);
app.use("/api/patient", authenticateToken, patientRoutes);
app.use("/api/consultation", authenticateToken, consultationRoutes);

db.sequelize
  .sync()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });
