"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getKey = void 0;
var node_fs_1 = __importDefault(require("node:fs"));
var node_path_1 = __importDefault(require("node:path"));
var node_crypto_1 = __importDefault(require("node:crypto"));
var decrypt_1 = require("./decrypt");
var signMessage_1 = require("./signMessage");
var hashMessage_1 = require("./hashMessage");
var hash = node_crypto_1.default.createHash(signMessage_1.packageOfDataToSend.algorithm);
var privateKey = node_fs_1.default.readFileSync(__dirname + "/id_rsa_priv.pem", "utf-8");
var publicKey = node_fs_1.default.readFileSync(__dirname + "/id_rsa_pub.pem", "utf-8");
// * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ decrypt message;
var decryptedMessage = (0, decrypt_1.decryptWithPrivateKey)(privateKey, signMessage_1.packageOfDataToSend.signedAndEncryptedData);
var decryptedMessageHex = decryptedMessage.toString();
// * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ hash Original message;
var hashOfOriginalHex = (0, hashMessage_1.hashMessage)(JSON.stringify(signMessage_1.packageOfDataToSend.originalData), signMessage_1.packageOfDataToSend.algorithm);
// * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ compare OriginHex and decryptoHex;
// if (hashOfOriginalHex === decryptedMessageHex) {
// 	console.log("success");
// } else {
// 	console.log("No no no...");
// }
var fileExistsInFolder = function (fileName) {
    var filePath = node_path_1.default.join(__dirname, "/id_rsa_".concat(fileName, ".pem"));
    return node_fs_1.default.existsSync(filePath);
};
var getKey = function (fileName) {
    var fileExist = fileExistsInFolder(fileName);
    var key = fileExist
        ? node_fs_1.default.readFileSync(__dirname + "/id_rsa_".concat(fileName, ".pem"), "utf-8")
        : process.env.JWT_SECRET;
    var algorithm = fileExist ? "RS256" : "HS256";
    return { key: key, algorithm: algorithm };
};
exports.getKey = getKey;
