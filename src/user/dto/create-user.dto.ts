import { IsEmail, IsIn, IsNotEmpty, IsString } from "class-validator";
import { UserRole } from "../../types/types";

export class CreateUserDto {
	@IsNotEmpty()
	@IsEmail()
	readonly email: string;

	@IsNotEmpty()
	@IsString()
	readonly password: string;

	@IsNotEmpty()
	@IsIn([UserRole.ADMIN, UserRole.PATIENT, UserRole.DOCTOR], {
		message: 'The role value must be one of admin, patient, or doctor',
	})
	readonly role: UserRole;
}
