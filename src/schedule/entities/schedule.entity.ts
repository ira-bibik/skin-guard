import { Patient } from 'src/patient/entities/patient.entity';
import { Product } from 'src/product/entities/product.entity';
import { UsageTime } from 'src/types/types';
import {
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
} from 'typeorm';



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

	@Column({ nullable: true })
	description: string;
}
