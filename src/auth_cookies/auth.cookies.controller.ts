import express from "express";
import { signIn, signUp } from "../auth/user.service";

const authCookiesRouter = express.Router();

authCookiesRouter.route("/signin").post(signIn);
authCookiesRouter.route("/signup").post(signUp);

export default authCookiesRouter;
