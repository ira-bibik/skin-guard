import { DoctorsRequest } from 'src/doctors-request/entities/doctors-request.entity';
import { Patient } from 'src/patient/entities/patient.entity';
import { User } from 'src/user/entities/user.entity';
import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	OneToMany,
	OneToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Doctor {
	@PrimaryGeneratedColumn({ name: 'doctor_id' })
	doctorId: number;

	@OneToOne(() => User, { onDelete: 'CASCADE' })
	@JoinColumn({ name: 'user_id' })
	user: User;

	@Column({ nullable: true })
	name: string;

	@Column({ nullable: true })
	work: string;

	@Column({ nullable: true })
	specialization: string;

	@Column({ nullable: true })
	description: string;

	@CreateDateColumn()
	createAt: Date;

	@UpdateDateColumn()
	updateAt: Date;

	@OneToMany(() => Patient, (patient) => patient.doctor)
	patients: Patient[];

	@OneToMany(() => DoctorsRequest, (doctorRequest) => doctorRequest.doctor)
	requests: DoctorsRequest[];
}
