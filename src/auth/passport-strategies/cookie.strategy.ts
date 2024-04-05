import { CookieStrategy } from "passport-cookie";
import jwt, { Algorithm, Jwt, VerifyOptions } from "jsonwebtoken";
import { DoneCallback } from "passport";
import "../../core/evnConfig";

import { User } from "../entities/user.entity";
import { AppDataSource } from "../../core/typeOrmConfig";
import { getKey } from "../cryptography/verifyIdentitiy";
import { JwtPayload } from "../interfaces/jwt-payload.interface";

const { key, algorithm } = getKey("pub");

const options: VerifyOptions = {
	algorithms: [algorithm as Algorithm],
	ignoreExpiration: true,
};
const userRepository = AppDataSource.getRepository(User);

const strategyCreator = (options: any) => {
	return new CookieStrategy((token: string, done: DoneCallback) => {
		jwt.verify(
			token,
			key,
			options,
			async (err, decoded: Jwt | undefined) => {
				if (err) {
					return done(err);
				}
				try {
					const payload = decoded?.payload as JwtPayload;
					if (payload) {
						const user = await userRepository.findOne({
							where: { email: payload.email },
						});
						if (user) {
							return done(null, user);
						} else {
							return done(null, false);
						}
					}
				} catch (error) {
					return done(error, false);
				}
			}
		);
	});
};

export const useCookieStrategy = (passport: any) => {
	passport.use("cookie", strategyCreator(options));
};
