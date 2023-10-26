import { IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';

export class CreateDoctorsRequestDto {
	@IsNotEmpty()
	@IsNumber()
	readonly doctorId: number;

	@IsNotEmpty()
	@IsString()
	@MaxLength(500, {
		message: 'Cover letter must be not bigger than 500 characters',
	})
	readonly coverletter: string;
}
