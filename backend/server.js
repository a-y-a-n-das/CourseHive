import dotenv from "dotenv"
dotenv.config();

import express from "express"
import cors from 'cors';
import mongoose from "mongoose";
import router from "./routes/routes.js"

const app = express();

// app.use(cors({origin: ["http://localhost:5173", "https://npm-app.duckdns.org"],

// methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//   allowedHeaders: ["Content-Type", "Authorization"],
// }));

app.use(cors());

app.use(express.json())

app.use("/api", router)

const port = process.env.PORT
const mongoDb_url = process.env.MONGODB_URL;

mongoose
  .connect(mongoDb_url)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// app.listen(port, "0.0.0.0", () => console.log('Server started on port '+ port));
app.listen(port, () => console.log('Server started on port '+ port));



