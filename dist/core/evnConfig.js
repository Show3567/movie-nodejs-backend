"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var node_path_1 = __importDefault(require("node:path"));
var dotenv_1 = __importDefault(require("dotenv"));
var evnPath = process.env.NODE_ENV === "production" ? ".env.production" : ".env";
dotenv_1.default.config({
    path: node_path_1.default.resolve(__dirname, "../../", evnPath),
});
