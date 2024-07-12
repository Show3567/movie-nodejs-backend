import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { decryptWithPrivateKey } from "./decrypt";
import { packageOfDataToSend } from "./signMessage";
import { hashMessage } from "./hashMessage";
import { Algorithm, Secret } from "jsonwebtoken";

const hash = crypto.createHash(packageOfDataToSend.algorithm);

const privateKey = fs.readFileSync(
	__dirname + "/id_rsa_priv.pem",
	"utf-8"
);
const publicKey = fs.readFileSync(
	__dirname + "/id_rsa_pub.pem",
	"utf-8"
);

// * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ decrypt message;
const decryptedMessage = decryptWithPrivateKey(
	privateKey,
	packageOfDataToSend.signedAndEncryptedData
);
const decryptedMessageHex = decryptedMessage.toString();

// * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ hash Original message;
const hashOfOriginalHex = hashMessage(
	JSON.stringify(packageOfDataToSend.originalData),
	packageOfDataToSend.algorithm
);

// * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ compare OriginHex and decryptoHex;
// if (hashOfOriginalHex === decryptedMessageHex) {
// 	console.log("success");
// } else {
// 	console.log("No no no...");
// }

const fileExistsInFolder = (fileName: "priv" | "pub") => {
	const filePath = path.join(__dirname, `/id_rsa_${fileName}.pem`);
	return fs.existsSync(filePath);
};

export const getKey = (
	fileName: "priv" | "pub"
): { key: Secret; algorithm: Algorithm } => {
	const fileExist = fileExistsInFolder(fileName);
	const key = fileExist
		? fs.readFileSync(__dirname + `/id_rsa_${fileName}.pem`, "utf-8")
		: (process.env.JWT_SECRET as Secret);
	const algorithm = fileExist ? "RS256" : "HS256";

	return { key, algorithm };
};
