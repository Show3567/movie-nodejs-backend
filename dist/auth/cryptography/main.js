"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var encrypt_1 = require("./encrypt");
var decrypt_1 = require("./decrypt");
// * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ encrypted;
var publicKey = fs_1.default.readFileSync(__dirname + "/id_rsa_pub.pem", "utf-8");
var encryptedMessage = (0, encrypt_1.encryptWithPublicKey)(publicKey, "Super secret message");
console.log(encryptedMessage.toString());
// * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ decrypted;
var privateKey = fs_1.default.readFileSync(__dirname + "/id_rsa_priv.pem", "utf-8");
var decryptedMessage = (0, decrypt_1.decryptWithPrivateKey)(privateKey, encryptedMessage);
console.log(decryptedMessage.toString());
