import express from "express";
import passport from "passport";
import { getMovieById, movieGetReqConvert } from "./movies.service";

const movieRouter = express.Router();

movieRouter
	.route("/discover/movie")
	.get(
		passport.authenticate("jwt", { session: false }),
		movieGetReqConvert("discover/movie")
	);
movieRouter
	.route("/search/movie")
	.get(
		passport.authenticate("jwt", { session: false }),
		movieGetReqConvert("search/movie")
	);
movieRouter
	.route("/movie/:id")
	.get(
		passport.authenticate("jwt", { session: false }),
		getMovieById
	);

export default movieRouter;
