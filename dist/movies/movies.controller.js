"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var passport_1 = __importDefault(require("passport"));
var movies_service_1 = require("./movies.service");
var movieRouter = express_1.default.Router();
movieRouter
    .route("/discover/movie")
    .get(passport_1.default.authenticate("jwt", { session: false }), (0, movies_service_1.movieGetReqConvert)("discover/movie"));
movieRouter
    .route("/search/movie")
    .get(passport_1.default.authenticate("jwt", { session: false }), (0, movies_service_1.movieGetReqConvert)("search/movie"));
movieRouter
    .route("/movie/:id")
    .get(passport_1.default.authenticate("jwt", { session: false }), movies_service_1.getMovieById);
movieRouter
    .route("/movie/:id/credits")
    .get(passport_1.default.authenticate("jwt", { session: false }), (0, movies_service_1.getDetails)("credits"));
movieRouter
    .route("/movie/:id/images")
    .get(passport_1.default.authenticate("jwt", { session: false }), (0, movies_service_1.getDetails)("images"));
movieRouter
    .route("/movie/:id/videos")
    .get(passport_1.default.authenticate("jwt", { session: false }), (0, movies_service_1.getDetails)("videos"));
exports.default = movieRouter;
