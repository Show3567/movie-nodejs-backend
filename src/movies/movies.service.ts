import { RequestHandler } from "express";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const tmdbBaseUrl = process.env.TMDB_BASE_URL;
const baseMovieImage = process.env.TMDB_BASE_MOVIE_IMG;
const discoverMoviePath = "discover/movie";
const searchMoviePath = "search/movie";
const discoverTvPath = "discover/tv?";
const moviePath = "movie";
const tmdb_key = process.env.TMDB_KEY;

export const movieGetReqConvert = (PATH: string): RequestHandler => {
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

export const getMovieById: RequestHandler = async (req, res) => {
	const url = `${tmdbBaseUrl}/${moviePath}/${req.params.id}?api_key=${tmdb_key}`;
	const result = await axios.get(url).then((ele) => ele.data);
	res.status(200).json(result);
};

export const getDetails = (PATH: string): RequestHandler => {
	return async (req, res) => {
		const id = req.params.id;

		if (id) {
			const url = `${tmdbBaseUrl}/${moviePath}/${id}/${PATH}?api_key=${tmdb_key}`;
			const result = await axios.get(url).then((ele) => ele.data);
			res.status(200).json(result);
		} else {
			// expected err;
			res.status(404).json({ message: "Cannot found this id" });
		}
	};
};
