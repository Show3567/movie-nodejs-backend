import {
	Strategy as JwtStrategy,
	ExtractJwt,
	StrategyOptionsWithoutRequest,
} from "passport-jwt";
import { Repository } from "typeorm";
import "../../core/evnConfig";

import { User } from "../entities/user.entity";
import { AppDataSource } from "../../core/typeOrmConfig";
import { getKey } from "../cryptography/verifyIdentitiy";
import { Algorithm } from "jsonwebtoken";

const { key, algorithm } = getKey("pub");

const options_ignaoreExpire: StrategyOptionsWithoutRequest = {
	// * ~~~~~~~~~~~~~~~~~~ "Authentication": "Bearer <token>"
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: key as string,
	algorithms: [algorithm as Algorithm],
	ignoreExpiration: true,
	// issuer: 'enter issuer here',
	// audience: 'enter audience here',
	// passReqToCallback: false,
};
const options_expire: StrategyOptionsWithoutRequest = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: key as string,
	algorithms: [algorithm as Algorithm],
	ignoreExpiration: false,
};

const strategyCreator = (options: StrategyOptionsWithoutRequest) => {
	return new JwtStrategy(options, async (payload, done) => {
		// console.log("payload: ", payload);
		try {
			const userRepository: Repository<User> =
				AppDataSource.getRepository(User);
			const user = await userRepository.findOne({
				where: { email: payload.email },
			});
			if (user) {
				return done(null, user);
			} else {
				return done(null, false, {
					message: "Incorrect username or password.",
				});
			}
		} catch (error) {
			return done(error, false);
		}
	});
};

export const useJwtStrategy = (passport: any) => {
	passport.use(
		"jwt_ign_exptime",
		strategyCreator(options_ignaoreExpire)
	);
	passport.use("jwt", strategyCreator(options_expire));
};
