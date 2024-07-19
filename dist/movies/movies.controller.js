"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var passport_1 = __importDefault(require("passport"));
var movies_service_1 = require("./movies.service");
var movieRouter = express_1.default.Router();
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
    .get(passport_1.default.authenticate("jwt", { session: false }), (0, movies_service_1.movieGetReqConvert)("discover/movie"));
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
    .get(passport_1.default.authenticate("jwt", { session: false }), (0, movies_service_1.movieGetReqConvert)("search/movie"));
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
    .get(passport_1.default.authenticate("jwt", { session: false }), movies_service_1.getMovieById);
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
    .get(passport_1.default.authenticate("jwt", { session: false }), (0, movies_service_1.getDetails)("credits"));
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
    .get(passport_1.default.authenticate("jwt", { session: false }), (0, movies_service_1.getDetails)("images"));
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
    .get(passport_1.default.authenticate("jwt", { session: false }), (0, movies_service_1.getDetails)("videos"));
exports.default = movieRouter;
// gateway, authservice, discoverservice, configservice, featureservices
