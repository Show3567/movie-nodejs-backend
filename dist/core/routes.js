"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routersConfig = void 0;
var express_1 = __importDefault(require("express"));
var user_controller_1 = __importDefault(require("../auth/user.controller"));
var javahw_controller_1 = __importDefault(require("../java/javahw.controller"));
var routersConfig = function (app) {
    app.use(express_1.default.json());
    app.use("/api/v1/auth", user_controller_1.default);
    app.use("/api/v1/universities", javahw_controller_1.default);
};
exports.routersConfig = routersConfig;
