import { UsageTime } from "src/schedule/entities/schedule.entity";

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