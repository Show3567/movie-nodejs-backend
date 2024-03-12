import passport from "passport";
import {
	Strategy as LocalStrategy,
	VerifyFunction,
} from "passport-local";
import { Repository } from "typeorm";

import { User } from "../entities/user.entity";
import { AppDataSource } from "../../core/db_typeorm";
import { validPassword } from "./passport-util/passport-util";
import { DoneFunction } from "../interfaces/jwt-payload.interface";

const customFields = {
	usernameField: "email",
	passwordField: "password",
};
const userRepository: Repository<User> =
	AppDataSource.getRepository(User);

const verifyCallback: VerifyFunction = async (
	email,
	password,
	done
) => {
	try {
		const user = await userRepository.findOne({
			where: { email: email },
		});

		if (!user) {
			return done(null, false);
		}
		const isValid = await validPassword(password, user.password);

		if (isValid) {
			return done(null, user);
		} else {
			return done(null, false);
		}
	} catch (error) {
		console.log(error);
		return done(error, false);
	}
};

passport.use(new LocalStrategy(customFields, verifyCallback));

passport.serializeUser((user: any, done: DoneFunction) => {
	console.log(user.id);
	const email = (user as User).email;
	done(null, email);
});
passport.deserializeUser(
	async (email: string, done: DoneFunction) => {
		console.log("email: ", email);
		try {
			const user = await userRepository.findOne({
				where: { email },
			});
			if (user) {
				done(null, user);
			} else {
				done(null, false, { message: "Can't found this user" });
			}
		} catch (error) {
			done(error);
		}
	}
);
