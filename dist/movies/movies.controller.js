"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var userRouters = express_1.default.Router();
var tmdbBaseUrl = process.env.TMDB_BASE_URL;
var baseMovieImage = process.env.TMDB_BASE_MOVIE_IMG;
var discoverMoviePath = "discover/movie?";
var searchMoviePath = "search/movie?";
var discoverTvPath = "discover/tv?";
var moviePath = "movie";
var convertGet = function (req, res) {
    var queryObj = __assign({}, req.query);
};
