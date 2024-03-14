import {
	Strategy as JwtStrategy,
	ExtractJwt,
	StrategyOptionsWithoutRequest,
} from "passport-jwt";
import { Repository } from "typeorm";
import dotenv from "dotenv";

import { User } from "../entities/user.entity";
import { AppDataSource } from "../../core/db_typeorm";
import passport from "passport";

dotenv.config();

const options: StrategyOptionsWithoutRequest = {
	// * ~~~~~~~~~~~~~~~~~~ "Authentication": "Bearer <token>"
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: process.env.JWT_SECRET || "",
	// algorithms: ["RS256"],
	// issuer: 'enter issuer here',
	// audience: 'enter audience here',
	// ignoreExpiration: false,
	// passReqToCallback: false,
};
const strategy = new JwtStrategy(options, async (payload, done) => {
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

// export const useJwtStrategy = (passport: any) => {
passport.use(strategy);
// };
