import crypto from "node:crypto";
const hash = crypto.createHash("sha256");
import fs, { writeFileSync } from "fs";
import { join } from "path";
import { encryptWithPublicKey } from "./encrypt";
import { decryptWithPrivateKey } from "./decrypt";

const myData = {
	firstname: "David",
	lastname: "Dong",
	ssn: "XXX-XXX-XXXX",
};

hash.update(JSON.stringify(myData));

const hashedData = hash.digest("hex");

const privateKey = fs.readFileSync(
	__dirname + "/id_rsa_priv.pem",
	"utf-8"
);
const publicKey = fs.readFileSync(
	__dirname + "/id_rsa_pub.pem",
	"utf-8"
);

const signedMessage = encryptWithPublicKey(publicKey, hashedData);

export const packageOfDataToSend = {
	algorithm: "sha256",
	originalData: myData,
	signedAndEncryptedData: signedMessage,
};
