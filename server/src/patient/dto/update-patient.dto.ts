import { IsNumber, IsOptional, IsString, Length, Max, Min } from "class-validator";

export class UpdatePatientDto {
	@IsOptional()
	@IsString({ message: 'Name must be a string' })
	@Length(5, 100, {
		message:
			'Name must be not less than 5 characters and not bigger than 100 characters',
	})
	readonly name: string;

	@IsOptional()
	@IsNumber()
	@Min(14, { message: 'Age must not be less than 14' })
	@Max(100, { message: 'Age must not be less than 100' })
	readonly age: number;

	@IsOptional()
	@IsString({ message: 'Skin type be a string' })
	@Length(3, 20, {
		message:
			'Skin type must be not less than 3 characters and not bigger than 20 characters',
	})
	readonly skinType: string;
}
