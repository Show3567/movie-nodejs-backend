"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = errorHandler;
var ApiError_1 = require("./ApiError");
var loggerConfig_1 = __importStar(require("../core/loggerConfig"));
function errorHandler(err, req, res, next) {
    if (err instanceof ApiError_1.ApiError) {
        loggerConfig_1.default.error((0, loggerConfig_1.loggerErr)("errorHandler", err.statusCode, err.message, err));
        res.status(err.statusCode).json({ error: err.message });
    }
    else {
        loggerConfig_1.default.error((0, loggerConfig_1.loggerErr)("errorHandler", 500, "Internal Server Error", err));
        res.status(500).json({ error: "Internal Server Error" });
    }
}
