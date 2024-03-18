"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authConfig = void 0;
var passport_1 = __importDefault(require("passport"));
var express_session_1 = __importDefault(require("express-session"));
require("./evnConfig");
var connect_mongodb_session_1 = __importDefault(require("connect-mongodb-session"));
// import "../auth/cryptography/main"; // test;
// import "../auth/cryptography/createKeypair"; // create pem;
require("../auth/passport-strategies/local.strategy");
var jwt_strategy_1 = require("../auth/passport-strategies/jwt.strategy");
var authConfig = function (app) {
    // load jwt strategy;
    (0, jwt_strategy_1.useJwtStrategy)(passport_1.default);
    // connect db;
    var MongoDBStore = (0, connect_mongodb_session_1.default)(express_session_1.default);
    // create session for local strategy;
    var store = new MongoDBStore({
        uri: process.env.MODB_URL || "",
        collection: "mongoDB_Session",
    });
    store.on("error", function (error) {
        console.error(error);
    });
    app.use((0, express_session_1.default)({
        store: store,
        secret: process.env.JWT_SECRET || "",
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: true,
            maxAge: 1000 * 3600 * 24,
        },
    }));
    // init passport;
    app.use(passport_1.default.initialize());
    app.use(passport_1.default.session());
};
exports.authConfig = authConfig;
