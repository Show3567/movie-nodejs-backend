import express, { RequestHandler } from "express";
import axios from "axios";
import passport from "passport";
import dotenv from "dotenv";

dotenv.config();
const movieRouter = express.Router();

const tmdbBaseUrl = process.env.TMDB_BASE_URL;
const baseMovieImage = process.env.TMDB_BASE_MOVIE_IMG;
const discoverMoviePath = "discover/movie";
const searchMoviePath = "search/movie";
const discoverTvPath = "discover/tv?";
const moviePath = "movie";
const tmdb_key = process.env.TMDB_KEY;

const movieGetReqConvert = (PATH: string): RequestHandler => {
	return async (req, res) => {
		const queryObj = { ...req.query } as { [key: string]: string };

		const url = Object.entries(queryObj).reduce(
			(acc, [key, value]) => `${acc}&${key}=${value}`,
			`${tmdbBaseUrl}/${PATH}?api_key=${tmdb_key}`
		);

		const result = await axios.get(url).then((ele) => ele.data);
		res.status(200).json(result);
	};
};

movieRouter
	.route("/discover/movie")
	.get(
		passport.authenticate("jwt", { session: false }),
		movieGetReqConvert(discoverMoviePath)
	);
movieRouter
	.route("/search/movie")
	.get(
		passport.authenticate("jwt", { session: false }),
		movieGetReqConvert(searchMoviePath)
	);

export default movieRouter;
