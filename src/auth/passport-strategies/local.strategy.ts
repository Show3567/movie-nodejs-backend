import passport from "passport";
import {
	Strategy as LocalStrategy,
	VerifyFunction,
} from "passport-local";
import { ObjectId, Repository } from "typeorm";

import { User } from "../entities/user.entity";
import { AppDataSource } from "../../core/typeOrmConfig";
import { validPassword } from "./passport-util/passport-util";
import { DoneFunction } from "../interfaces/jwt-payload.interface";

declare global {
	namespace Express {}
}

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
		return done(error, false);
	}
};

passport.use(new LocalStrategy(customFields, verifyCallback));

passport.serializeUser((user: any, done: DoneFunction) => {
	const id = (user as User)._id;
	done(null, id);
});
// cz the deserializeUser not work, and I cannot fix it, it's round 2:45;
passport.deserializeUser(async (id: string, done: DoneFunction) => {
	try {
		const user = await userRepository.findOne({
			where: { _id: new ObjectId(id) } as any,
		});
		if (user) {
			done(null, user);
		} else {
			done(null, false, { message: "Can't found this user" });
		}
	} catch (error) {
		done(error);
	}
});
