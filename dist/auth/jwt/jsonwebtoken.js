"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyJwt = exports.createJwt = void 0;
var node_fs_1 = __importDefault(require("node:fs"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var privateKey = node_fs_1.default.readFileSync(__dirname + "../cryptography/id_rsa_priv.pem", "utf-8");
var publicKey = node_fs_1.default.readFileSync(__dirname + "../cryptography/id_rsa_pub.pem", "utf-8");
var createJwt = function (payload, privateKey, algorithm) {
    return jsonwebtoken_1.default.sign(payload, privateKey, { algorithm: algorithm });
};
exports.createJwt = createJwt;
var verifyJwt = function (token, publicKey, algorithm, userRepository) {
    return jsonwebtoken_1.default.verify(token, publicKey, { algorithms: [algorithm] }, function (err, payload) {
        console.log(payload);
    });
};
exports.verifyJwt = verifyJwt;
