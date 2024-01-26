import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

import { connectDb } from "./config/db";
import routes from "./routes";

dotenv.config();
const app: Express = express();
app.use(express.json());
connectDb();

app.use("/", routes);

const PORT: Number | String = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running at PORT:${PORT}`);
});
