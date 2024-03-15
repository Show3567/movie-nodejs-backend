import express, { Express } from "express";
import userRouters from "../auth/user.controller";
import universityRouter from "../java/javahw.controller";

export const routersConfig = (app: Express) => {
	app.use(express.json());
	app.use("/api/v1/auth", userRouters);
	// app.use("/api/v1/movies");
	app.use("/api/v1/universities", universityRouter);
};
