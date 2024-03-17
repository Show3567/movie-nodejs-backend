"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashMessage = void 0;
var node_crypto_1 = __importDefault(require("node:crypto"));
var hashMessage = function (message, algorithm) {
    var hash = node_crypto_1.default.createHash(algorithm);
    hash.update(JSON.stringify(message));
    return hash.digest("hex");
};
exports.hashMessage = hashMessage;
