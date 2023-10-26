import { Doctor } from 'src/doctor/entities/doctor.entity';
import { Patient } from 'src/patient/entities/patient.entity';
import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	OneToOne,
	PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class DoctorsRequest {
	@PrimaryGeneratedColumn({ name: 'request_id' })
	requestId: number;

	@Column()
	coverletter: string;

	@OneToOne(() => Patient, {
		onDelete: 'CASCADE',
	})
	@JoinColumn({ name: 'patient_id' })
	patient: Patient;

	@ManyToOne(() => Doctor, (doctor) => doctor.requests, {
		onDelete: 'CASCADE',
	})
	@JoinColumn({ name: 'doctor_id' })
	doctor: Doctor;

	@CreateDateColumn()
	createAt: Date;
}
