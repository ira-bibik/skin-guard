import { IsOptional, IsString, Length } from 'class-validator';

export class UpdateDoctorDto {
	@IsOptional()
	@IsString({ message: 'Name must be a string' })
	@Length(5, 100, {
		message:
			'Name must be not less than 5 characters and not bigger than 100 characters',
	})
	readonly name: string;

	@IsOptional()
	@IsString({ message: 'Work must be a string' })
	@Length(5, 100, {
		message:
			'Work must be not less than 5 characters and not bigger than 100 characters',
	})
	readonly work: string;

	@IsOptional()
	@IsString({ message: 'Specialization must be a string' })
	@Length(5, 100, {
		message:
			'Specialization must be not less than 5 characters and not bigger than 100 characters',
	})
	readonly specialization: string;

	@IsOptional()
	@IsString({ message: 'Description must be a string' })
	@Length(5, 1000, {
		message:
			'Description must be not less than 5 characters and not bigger than 1000 characters',
	})
	readonly description: string;

	//patients: Patient[];
}
