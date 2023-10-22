import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";


export enum UserRole {
	ADMIN = 'admin',
	PATIENT = 'patient',
	DOCTOR = 'doctor',
}

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
