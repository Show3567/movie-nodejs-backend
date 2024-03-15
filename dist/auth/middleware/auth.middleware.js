"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuth = void 0;
var isAuth = function (req, res, next) {
    if (req.isAuthenticated()) {
        next();
    }
    else {
        res.status(401).json({ messgage: "You are not authorized!" });
    }
};
exports.isAuth = isAuth;
// export const isAdmin = (req, res, next) => {
// }
