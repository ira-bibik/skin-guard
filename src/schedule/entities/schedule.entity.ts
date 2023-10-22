import { Patient } from 'src/patient/entities/patient.entity';
import { Product } from 'src/product/entities/product.entity';
import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';

export enum UsageTime {
	EVENING = 'evening',
	MORNING = 'morning',
}

@Entity()
export class Schedule {
	@PrimaryGeneratedColumn({ name: 'schedule_id' })
	scheduleId: number;

	@Column({
		type: 'enum',
		enum: UsageTime,
		default: UsageTime.MORNING,
	})
	time: UsageTime;

	@CreateDateColumn()
	createAt: Date;

	@UpdateDateColumn()
	updateAt: Date;

	@ManyToOne(() => Patient, (patient) => patient.schedule, {
		onDelete: 'CASCADE',
	})
	@JoinColumn({ name: 'patient_id' })
	patient: Patient;

	@ManyToOne(() => Product, (product) => product.schedule, {
		onDelete: 'CASCADE',
    })
	@JoinColumn({ name: 'product_id' })
	product: Product;
}
