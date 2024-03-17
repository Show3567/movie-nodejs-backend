"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
var ApiError_1 = require("./ApiError");
function errorHandler(err, req, res, next) {
    if (err instanceof ApiError_1.ApiError) {
        console.error(err);
        res.status(err.statusCode).json({ error: err.message });
    }
    else {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
}
exports.errorHandler = errorHandler;
