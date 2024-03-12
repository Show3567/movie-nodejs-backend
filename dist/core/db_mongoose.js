"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToMongodb = void 0;
var dotenv_1 = __importDefault(require("dotenv"));
var mongoose_1 = __importDefault(require("mongoose"));
dotenv_1.default.config();
var connectToMongodb = function () {
    var db = process.env.DB || "";
    mongoose_1.default
        .connect(db)
        .then(function (_) {
        console.log("Connected to ".concat(db, "..."));
    })
        .catch(console.log);
};
exports.connectToMongodb = connectToMongodb;
