import express, { Router } from "express";
import authRoute from "./auth.route";

const v1Routes: Router = express.Router();

v1Routes.use("/auth", authRoute);

export default v1Routes;
