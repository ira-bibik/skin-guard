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

	@Column('simple-array')
	ingredients: string[];

	@Column()
	skinType: string;

	@Column()
	description: string;

	@OneToMany(() => Schedule, (schedule) => schedule.patient)
	schedule: Schedule[];
}
