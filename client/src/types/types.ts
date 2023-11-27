export enum Role {
	ADMIN = 'admin',
	PATIENT = 'patient',
	DOCTOR = 'doctor',
}

export interface IUser {
	userId: number;
	email: string;
	role: Role;
	idByRole?: number;
}

export interface ILoginUserData {
	email: string;
	password: string;
}

export interface IRegisterUserData {
	email: string;
	password: string;
	role?: Role;
}

export interface IResponseUserData {
	access_token: string;
}

export interface AuthFormValues {
	email: string;
	password: string;
	role?: Role;
}

export interface IProductData {
	productId: number;
	name: string;
	productType: string;
	brand: string;
	ingredients: string;
	skinType: string[];
	description?: string;
	amount: string;
	photo?: string; 
}

export interface IProductsResponseData {
	products: IProductData[];
	totalPages: number;
	currentPage: number;
}

//getProfile response
//     {
//     "patientId": 16,
//     "name": "Ivan",
//     "age": 18,
//     "skinType": "oily",
//     "photo": null,
//     "schedule": [],
//     "doctor": null
// }

//     {
//     "doctorId": 10,
//     "name": "Updated doctor",
//     "work": "ONClinic",
//     "specialization": "dermatologist",
//     "description": null,
//     "photo": null,
//     "patients": [
//         {
//             "patientId": 17,
//             "name": "Nadia",
//             "age": 25,
//             "skinType": "dry",
//             "photo": null
//         }
//     ]
// }
