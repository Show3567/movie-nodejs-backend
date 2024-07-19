"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var user_service_1 = require("../auth/user.service");
var authCookiesRouter = express_1.default.Router();
authCookiesRouter.route("/signin").post(user_service_1.signIn);
authCookiesRouter.route("/signup").post(user_service_1.signUp);
exports.default = authCookiesRouter;
