"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyJwt = exports.createJwt = void 0;
var fs_1 = __importDefault(require("fs"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var privateKey = fs_1.default.readFileSync(__dirname + "../cryptography/id_rsa_priv.pem", "utf-8");
var publicKey = fs_1.default.readFileSync(__dirname + "../cryptography/id_rsa_pub.pem", "utf-8");
var createJwt = function (payload, privateKey, algorithm) {
    return jsonwebtoken_1.default.sign(payload, privateKey, { algorithm: algorithm });
};
exports.createJwt = createJwt;
var verifyJwt = function (signedJwt, publicKey, algorithm) {
    return jsonwebtoken_1.default.verify(signedJwt, publicKey, { algorithms: [algorithm] }, function (err, payload) {
        console.log(payload);
    });
};
exports.verifyJwt = verifyJwt;
