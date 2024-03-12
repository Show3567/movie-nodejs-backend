import { Column, Entity, ObjectIdColumn } from "typeorm";
import { UserRole } from "../enum/user-role.enum";

@Entity("user")
export class User {
	//   @PrimaryGeneratedColumn() // using uuid;
	@ObjectIdColumn() // for mongodb;
	id: string;

	@Column()
	username: string;

	@Column({ unique: true })
	email: string;

	@Column()
	password: string;

	@Column({
		type: "enum",
		enum: UserRole,
		default: UserRole.USER,
	})
	role: UserRole;

	@Column()
	tmdb_key: string;

	// Add method to validate password
	validatePassword(password: string): boolean {
		// Implement your password validation logic here
		// For simplicity, let's assume passwords are stored in plain text (which is not recommended in production)
		return this.password === password;
	}
}
