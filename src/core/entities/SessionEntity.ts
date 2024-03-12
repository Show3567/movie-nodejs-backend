import { ISession } from "connect-typeorm";
import {
	Entity,
	Column,
	PrimaryColumn,
	CreateDateColumn,
	UpdateDateColumn,
	Index,
} from "typeorm";

@Entity("sessions")
export class SessionEntity implements ISession {
	@PrimaryColumn("varchar", { length: 255 })
	id: string;

	@Index()
	@Column("bigint")
	expiredAt: number;

	@Column("text")
	data: string;

	@Column("text")
	json: string;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;

	@UpdateDateColumn({ nullable: true })
	destroyedAt?: Date;
}
