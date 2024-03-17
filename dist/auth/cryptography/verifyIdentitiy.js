"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var node_crypto_1 = __importDefault(require("node:crypto"));
var decrypt_1 = require("./decrypt");
var signMessage_1 = require("./signMessage");
var hashMessage_1 = require("./hashMessage");
var hash = node_crypto_1.default.createHash(signMessage_1.packageOfDataToSend.algorithm);
var privateKey = fs_1.default.readFileSync(__dirname + "/id_rsa_priv.pem", "utf-8");
var publicKey = fs_1.default.readFileSync(__dirname + "/id_rsa_pub.pem", "utf-8");
// * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ decrypt message;
var decryptedMessage = (0, decrypt_1.decryptWithPrivateKey)(privateKey, signMessage_1.packageOfDataToSend.signedAndEncryptedData);
var decryptedMessageHex = decryptedMessage.toString();
// * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ hash Original message;
var hashOfOriginalHex = (0, hashMessage_1.hashMessage)(JSON.stringify(signMessage_1.packageOfDataToSend.originalData), signMessage_1.packageOfDataToSend.algorithm);
// * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ compare OriginHex and decryptoHex;
if (hashOfOriginalHex === decryptedMessageHex) {
    console.log("success");
}
else {
    console.log("No no no...");
}
