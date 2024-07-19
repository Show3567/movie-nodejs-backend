"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var node_crypto_1 = __importDefault(require("node:crypto"));
var node_fs_1 = require("node:fs");
var node_path_1 = require("node:path");
(function genKeyPair() {
    var keyPair = node_crypto_1.default.generateKeyPairSync("rsa", {
        modulusLength: 4096,
        publicKeyEncoding: {
            type: "spki", // Recommended to use 'spki' for public keys
            format: "pem",
        },
        privateKeyEncoding: {
            type: "pkcs8", // Recommended to use 'pkcs8' for private keys
            format: "pem",
        },
    });
    var dirName = __dirname; // Path where the files will be saved
    // Write the public key to a file
    (0, node_fs_1.writeFileSync)((0, node_path_1.join)(dirName, "id_rsa_pub.pem"), keyPair.publicKey);
    // Similarly, write the private key if needed
    (0, node_fs_1.writeFileSync)((0, node_path_1.join)(dirName, "id_rsa_priv.pem"), keyPair.privateKey);
})();
