import {
	Strategy as JwtStrategy,
	ExtractJwt,
	StrategyOptionsWithoutRequest,
} from "passport-jwt";
import { Repository } from "typeorm";
import "dotenv/config";

import { User } from "../entities/user.entity";
import { AppDataSource } from "../../core/typeOrmConfig";

const options_ignaoreExpire: StrategyOptionsWithoutRequest = {
	// * ~~~~~~~~~~~~~~~~~~ "Authentication": "Bearer <token>"
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: process.env.JWT_SECRET || "", // publicKey
	algorithms: ["HS256"],
	ignoreExpiration: true,
	// issuer: 'enter issuer here',
	// audience: 'enter audience here',
	// passReqToCallback: false,
};
const options_expire: StrategyOptionsWithoutRequest = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: process.env.JWT_SECRET || "", // publicKey
	algorithms: ["HS256"],
	ignoreExpiration: false,
};

const strategyCreator = (options: StrategyOptionsWithoutRequest) => {
	return new JwtStrategy(options, async (payload, done) => {
		console.log("payload: ", payload);
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
			console.log(error);
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
