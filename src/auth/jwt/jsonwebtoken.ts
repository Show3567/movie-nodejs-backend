import fs from "fs";
import jwt from "jsonwebtoken";

const privateKey = fs.readFileSync(
	__dirname + "../cryptography/id_rsa_priv.pem",
	"utf-8"
);
const publicKey = fs.readFileSync(
	__dirname + "../cryptography/id_rsa_pub.pem",
	"utf-8"
);

export const createJwt = (
	payload: { [key: string]: any },
	privateKey: string,
	algorithm: jwt.Algorithm
) => {
	return jwt.sign(payload, privateKey, { algorithm });
};

export const verifyJwt = (
	signedJwt: string,
	publicKey: string,
	algorithm: jwt.Algorithm
) => {
	return jwt.verify(
		signedJwt,
		publicKey,
		{ algorithms: [algorithm] },
		(err, payload) => {
			console.log(payload);
		}
	);
};
