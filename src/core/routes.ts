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

// www.movie.com/api/v3/products
// www.movie.com/api/v3/products?id=12&local=sdfs
// get post, post vs. get, put vs. patch
// payload, check dto
// status code

// graphql: post, static www.movie.com/api/v3/
// query vs. mutation
