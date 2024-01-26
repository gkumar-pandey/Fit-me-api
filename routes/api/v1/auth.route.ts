import express, { Router } from "express";
import { loginHandler, signupHandler } from "../../../controllers";

const authRoute: Router = express.Router();

authRoute.post("/signup", signupHandler);
authRoute.post("/login", loginHandler);

export default authRoute;
