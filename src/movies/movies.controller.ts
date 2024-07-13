import express from "express";
import passport from "passport";
import {
	getDetails,
	getMovieById,
	movieGetReqConvert,
} from "./movies.service";

const movieRouter = express.Router();

/**
 * @swagger
 * /api/v1/discover/movie:
 *   get:
 *     summary: Discover movies
 *     tags: [Movies]
 *     responses:
 *       200:
 *         description: A list of discovered movies
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 */
movieRouter
	.route("/discover/movie")
	.get(
		passport.authenticate("jwt", { session: false }),
		movieGetReqConvert("discover/movie")
	);
/**
 * @swagger
 * /api/v1/search/movie:
 *   get:
 *     summary: Search for movies
 *     tags: [Movies]
 *     responses:
 *       200:
 *         description: A list of movies matching the search criteria
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 */
movieRouter
	.route("/search/movie")
	.get(
		passport.authenticate("jwt", { session: false }),
		movieGetReqConvert("search/movie")
	);
/**
 * @swagger
 * /api/v1/movie/{id}:
 *   get:
 *     summary: Get movie by ID
 *     tags: [Movies]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Movie ID
 *     responses:
 *       200:
 *         description: A movie object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 */
movieRouter
	.route("/movie/:id")
	.get(
		passport.authenticate("jwt", { session: false }),
		getMovieById
	);
/**
 * @swagger
 * /api/v1/movie/{id}/credits:
 *   get:
 *     summary: Get movie credits by ID
 *     tags: [Movies]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Movie ID
 *     responses:
 *       200:
 *         description: Movie credits
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 */
movieRouter
	.route("/movie/:id/credits")
	.get(
		passport.authenticate("jwt", { session: false }),
		getDetails("credits")
	);
/**
 * @swagger
 * /api/v1/movie/{id}/images:
 *   get:
 *     summary: Get movie images by ID
 *     tags: [Movies]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Movie ID
 *     responses:
 *       200:
 *         description: Movie images
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 */
movieRouter
	.route("/movie/:id/images")
	.get(
		passport.authenticate("jwt", { session: false }),
		getDetails("images")
	);
/**
 * @swagger
 * /api/v1/movie/{id}/videos:
 *   get:
 *     summary: Get movie videos by ID
 *     tags: [Movies]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Movie ID
 *     responses:
 *       200:
 *         description: Movie videos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 */
movieRouter
	.route("/movie/:id/videos")
	.get(
		passport.authenticate("jwt", { session: false }),
		getDetails("videos")
	);

export default movieRouter;

// gateway, authservice, discoverservice, configservice, featureservices
