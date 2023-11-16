import { IsEmail, IsIn, IsNotEmpty, IsString, Min } from 'class-validator';
import { UserRole } from '../../types/types';

export class CreateUserDto {
	@IsNotEmpty()
	@IsEmail()
	readonly email: string;

	@IsNotEmpty()
	@IsString()
	@Min(6, {
		message: 'Password must be at least 6 characters',
	})
	readonly password: string;

	@IsNotEmpty()
	@IsIn([UserRole.ADMIN, UserRole.PATIENT, UserRole.DOCTOR], {
		message: 'The role value must be one of admin, patient, or doctor',
	})
	readonly role: UserRole;
}
