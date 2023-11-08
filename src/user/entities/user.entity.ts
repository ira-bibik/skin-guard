import { UserRole } from "src/types/types";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class User {
	@PrimaryGeneratedColumn({ name: 'user_id' })
	userId: number;

	@Column()
	email: string;

	@Column()
	password: string;

	@Column({
		type: 'enum',
		enum: UserRole,
		default: UserRole.PATIENT,
	})
	role: UserRole;

	@CreateDateColumn()
	createAt: Date;
}
