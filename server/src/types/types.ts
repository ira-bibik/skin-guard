export enum UserRole {
	ADMIN = 'admin',
	PATIENT = 'patient',
	DOCTOR = 'doctor',
}

export enum UsageTime {
	EVENING = 'evening',
	MORNING = 'morning',
}

export interface IUser {
	userId: string;
	email: string;
	role: string;
	idByRole: string;
}


export interface FilterDoctorDto {
	name?: string;
	description?: string;
	work?: string;
	specialization?: string;
}

export interface FilterPatientDto {
	name?: string;
	age?: number;
	skinType?: string;
}

export interface FilterProductDto {
	name?: string;
	productType?: string;
	brand?: string;
	ingredients?: string;
	amount?: string;
	skinType?: string[];
	description?: string;
}