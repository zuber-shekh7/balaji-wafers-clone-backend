import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import { connectToDB } from "./src/api/v1/config/db.js";

import * as v1 from "./src/api/v1/routes/index.js";

dotenv.config();

const app = express();

try {
  await connectToDB();
} catch (err) {
  process.exit(1);
}

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", v1.coreRoutes);
app.use("/api/v1/users", v1.userRoutes);
app.use("/api/v1/categories", v1.categoryRoutes);

export default app;
