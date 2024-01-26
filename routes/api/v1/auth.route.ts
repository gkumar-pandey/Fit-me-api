import express, { Router } from "express";
import { loginHandler, signupHandler } from "../../../controllers";

const authRoute: Router = express.Router();

authRoute.use("/signup", signupHandler);
authRoute.use("/login", loginHandler);

export default authRoute;
