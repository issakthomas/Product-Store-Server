import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { connectDB } from "./config/db.js";
import productRoute from "./routes/product.route.js";

dotenv.config();

const app = express();
app.use(cors({ origin: "https://productstorebyissak.vercel.app" }));
app.use(express.json());
app.use("/products", productRoute);

const PORT = process.env.PORT || 4000;

app.listen(PORT, async () => {
  await connectDB();
  console.log("Server started!");
});