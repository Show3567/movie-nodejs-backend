import express, { Express } from "express";
import userRouters from "../auth/user.controller";
import universityRouter from "../java/javahw.controller";
import movieRouter from "../movies/movies.controller";

export const routersConfig = (app: Express) => {
	app.use(express.json());
	app.use("/api/v1/auth", userRouters);
	// * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ movie router;
	app.use("/api/v1/", movieRouter);
	app.use("/api/v1/universities", universityRouter);
};
