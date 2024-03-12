import mongoose from "mongoose";

export const connectToMongodb = () => {
	const db: string = process.env.DB || "";
	mongoose
		.connect(db)
		.then((_) => {
			console.log(`Connected to ${db}...`);
		})
		.catch(console.log);
};
