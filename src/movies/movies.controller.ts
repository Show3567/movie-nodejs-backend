import express, { RequestHandler } from "express";
import axios from "axios";
import passport from "passport";
import dotenv from "dotenv";

dotenv.config();
const userRouters = express.Router();
const tmdbBaseUrl = process.env.TMDB_BASE_URL;
const baseMovieImage = process.env.TMDB_BASE_MOVIE_IMG;
const discoverMoviePath = "discover/movie?";
const searchMoviePath = "search/movie?";
const discoverTvPath = "discover/tv?";
const moviePath = "movie";

const convertGet: RequestHandler = (req, res) => {
	const queryObj = { ...req.query } as { [key: string]: string };
};
