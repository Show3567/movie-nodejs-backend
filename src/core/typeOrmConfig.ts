import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "../auth/entities/user.entity";
import { SessionEntity } from "./entities/SessionEntity";
import "./evnConfig";

export const AppDataSource = new DataSource({
	type: "mongodb",
	url: process.env.MODB_URL,
	useUnifiedTopology: true,
	useNewUrlParser: true,
	entities: [User, SessionEntity],
	synchronize: true,
});

(async () => {
	try {
		await AppDataSource.initialize();
		console.log(`connection successful!`);
	} catch (error) {
		console.error("Error during Data Source initialization", error);
	}
})();
