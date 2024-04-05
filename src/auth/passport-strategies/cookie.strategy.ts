import { CookieStrategy } from "passport-cookie";
import jwt from "jsonwebtoken";
import { Repository } from "typeorm";
import "../../core/evnConfig";

import { User } from "../entities/user.entity";
import { AppDataSource } from "../../core/typeOrmConfig";
import { getKey } from "../cryptography/verifyIdentitiy";
import { Algorithm } from "jsonwebtoken";
import { DoneCallback } from "passport";

const { key, algorithm } = getKey("pub");

const options = {
	algorithms: [algorithm as Algorithm],
	ignoreExpiration: true,
};

const strategyCreator = (options: any) => {
	return new CookieStrategy((token: string, done: DoneCallback) => {
		jwt.verify(token, key, options, (err, payload) => {});
	});
};

export const useJwtStrategy = (passport: any) => {
	passport.use("cookie", strategyCreator(options));
};
