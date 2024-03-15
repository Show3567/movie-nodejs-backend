"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.encryptWithPrivateKey = exports.encryptWithPublicKey = void 0;
var node_crypto_1 = __importDefault(require("node:crypto"));
// * ~~~~~~~ PublicKey ~~~~~~~;
var encryptWithPublicKey = function (publicKey, message) {
    var bufferMessage = Buffer.from(message, "utf-8");
    return node_crypto_1.default.publicEncrypt(publicKey, bufferMessage);
};
exports.encryptWithPublicKey = encryptWithPublicKey;
// * ~~~~~~~ PrivateKey ~~~~~~~;
var encryptWithPrivateKey = function (privateKey, message) {
    var bufferMessage = Buffer.from(message, "utf-8");
    return node_crypto_1.default.privateEncrypt(privateKey, bufferMessage);
};
exports.encryptWithPrivateKey = encryptWithPrivateKey;
