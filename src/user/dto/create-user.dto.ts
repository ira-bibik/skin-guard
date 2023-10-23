import { IsEmail, IsIn, IsNotEmpty, IsString } from "class-validator";
import { UserRole } from "../entities/user.entity";

export class CreateUserDto {
	@IsNotEmpty()
	@IsEmail()
	readonly email: string;

	@IsNotEmpty()
	@IsString()
	readonly password: string;

	@IsNotEmpty()
	@IsIn(['admin', 'patient', 'doctor'], {
		message: 'The role value must be one of admin, patient, or doctor',
	})
	readonly role: UserRole;
}
