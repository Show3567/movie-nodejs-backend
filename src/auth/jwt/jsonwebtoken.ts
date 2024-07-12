import fs from "node:fs";
import jwt from "jsonwebtoken";
import { Repository } from "typeorm";
import { User } from "../entities/user.entity";

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
	token: string,
	publicKey: string,
	algorithm: jwt.Algorithm,
	userRepository: Repository<User>
) => {
	return jwt.verify(
		token,
		publicKey,
		{ algorithms: [algorithm] },
		(err, payload) => {
			console.log(payload);
		}
	);
};
