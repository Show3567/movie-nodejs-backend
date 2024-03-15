"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.packageOfDataToSend = void 0;
var fs_1 = __importDefault(require("fs"));
var encrypt_1 = require("./encrypt");
var hashMessage_1 = require("./hashMessage");
var myData = {
    firstname: "David",
    lastname: "Dong",
    ssn: "XXX-XXX-XXXX",
};
var privateKey = fs_1.default.readFileSync(__dirname + "/id_rsa_priv.pem", "utf-8");
var publicKey = fs_1.default.readFileSync(__dirname + "/id_rsa_pub.pem", "utf-8");
var signedMessage = (0, encrypt_1.encryptWithPublicKey)(publicKey, (0, hashMessage_1.hashMessage)(myData, "sha256"));
exports.packageOfDataToSend = {
    algorithm: "sha256",
    originalData: myData,
    signedAndEncryptedData: signedMessage,
};
