import { Schedule } from "src/schedule/entities/schedule.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Product {
	@PrimaryGeneratedColumn({ name: 'product_id' })
	productId: number;

	@Column()
	name: string;

	@Column()
	productType: string;

	@Column()
	brand: string;

	@Column()
	ingredients: string;

	@Column('simple-array')
	skinType: string[];

	@Column({ nullable: true })
	description: string;

	@Column()
	amount: string;

	@OneToMany(() => Schedule, (schedule) => schedule.patient)
	schedule: Schedule[];

	@Column({ nullable: true })
	photo: string;
}
