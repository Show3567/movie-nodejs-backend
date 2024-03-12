import {
	Strategy as JwtStrategy,
	ExtractJwt,
	StrategyOptionsWithoutRequest,
} from "passport-jwt";
import passport from "passport";
import { Repository } from "typeorm";
import dotenv from "dotenv";
import { User } from "../entities/user.entity";
import { AppDataSource } from "../../core/db_typeorm";

dotenv.config();

const options: StrategyOptionsWithoutRequest = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: process.env.JWT_SECRET || "",
};
const startegy = new JwtStrategy(options, async (payload, done) => {
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
passport.use(startegy);
