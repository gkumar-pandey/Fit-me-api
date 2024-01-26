import express, { Router } from "express";
import apiRoutes from "./api";
const routes: Router = express.Router();

routes.use("/api", apiRoutes);
export default routes;
