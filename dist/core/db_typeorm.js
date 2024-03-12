"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
var dotenv_1 = __importDefault(require("dotenv"));
var typeorm_1 = require("typeorm");
var user_entity_1 = require("../auth/entities/user.entity");
dotenv_1.default.config();
exports.AppDataSource = new typeorm_1.DataSource({
    type: "mongodb",
    url: process.env.MODB_URL,
    useUnifiedTopology: true,
    useNewUrlParser: true,
    entities: [user_entity_1.User],
    synchronize: true,
});
var TypeOrmDbConnection = function () {
    exports.AppDataSource.initialize()
        .then(function () { return console.log("connection successful!"); })
        .catch(function (error) { return console.log(error); });
};
exports.default = TypeOrmDbConnection;
