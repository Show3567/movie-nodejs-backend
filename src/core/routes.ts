import express, { Express } from "express";
import cors from "cors";
import userRouters from "../auth/user.controller";
import universityRouter from "../java/javahw.controller";
import movieRouter from "../movies/movies.controller";

export const routersConfig = (app: Express) => {
	app.use(express.json());
	app.use(cors());

	app.use("/api/v1/auth", userRouters); // localhost:5566/api/v1/auth/signin
	// * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ movie router;
	app.use("/api/v1/", movieRouter);
	app.use("/api/v1/universities", universityRouter);
};
