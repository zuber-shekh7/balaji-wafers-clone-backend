import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";

import * as v1 from "./src/api/v1/routes/index.js";

dotenv.config();

const app = express();

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

app.use("/api/v1", v1.coreRoutes);

export default app;