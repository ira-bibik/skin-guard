export class CreateUserDto {
    email: string;
    password: string;
    role: 'ADMIN' | "PATIENT" | "DOCTOR";
}
