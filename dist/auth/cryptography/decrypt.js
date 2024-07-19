"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decryptWithPrivateKey = exports.decryptWithPublicKey = void 0;
var node_crypto_1 = __importDefault(require("node:crypto"));
// * ~~~~~~~ PublicKey ~~~~~~~;
var decryptWithPublicKey = function (publicKey, encryptedMessage) {
    return node_crypto_1.default.publicDecrypt(publicKey, encryptedMessage);
};
exports.decryptWithPublicKey = decryptWithPublicKey;
// * ~~~~~~~ PrivateKey ~~~~~~~;
var decryptWithPrivateKey = function (privateKey, encryptedMessage) {
    return node_crypto_1.default.privateDecrypt(privateKey, encryptedMessage);
};
exports.decryptWithPrivateKey = decryptWithPrivateKey;
