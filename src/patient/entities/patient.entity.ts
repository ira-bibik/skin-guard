import { Doctor } from 'src/doctor/entities/doctor.entity';
import { Schedule } from 'src/schedule/entities/schedule.entity';
import { User } from 'src/user/entities/user.entity';
import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	OneToMany,
	OneToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Patient {
	@PrimaryGeneratedColumn({ name: 'patient_id' })
	patientId: number;

	@OneToOne(() => User, {onDelete: 'CASCADE'})
	@JoinColumn({ name: 'user_id' })
	user: User;

	@Column({ nullable: true })
	name: string;

	@Column({ nullable: true })
	age: string;

	@Column({ nullable: true })
	skinType: string;

	@CreateDateColumn()
	createAt: Date;

	@UpdateDateColumn()
	updateAt: Date;

	@ManyToOne(() => Doctor, (doctor) => doctor.patients, {
		nullable: true,
		onDelete: 'SET NULL',
	})
	@JoinColumn({ name: 'doctor_id' })
	doctor: Doctor;

	@OneToMany(() => Schedule, (schedule) => schedule.patient)
	schedule: Schedule[];
}
