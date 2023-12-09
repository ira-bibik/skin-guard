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

export interface IManageProductData {
	name: string;
	productType: string;
	brand: string;
	ingredients: string;
	skinType: string[];
	description?: string;
	amount: string;
}

export interface IProductsResponseData {
	products: IProductData[];
	totalPages: number;
	currentPage: number;
}

export interface IPatientData {
	patientId: number;
	name?: string;
	age?: number;
	skinType?: string;
	photo?: string;
	schedule?: IScheduleData[];
	doctor?: IDoctorData;
}

export interface IEditPatientData {
	patientId: number;
	name?: string;
	age?: number;
	skinType?: string;
}

export interface IDoctorData {
	doctorId: number;
	name?: string;
	work?: string;
	specialization?: string;
	description?: string;
	photo?: string;
	patients?: IPatientData[];
}

export interface IDoctorsResponseData {
	doctors: IDoctorData[];
	totalPages: number;
	currentPage: number;
}

export interface IEditDoctorData {
	doctorId: number;
	name?: string;
	work?: string;
	specialization?: string;
	description?: string;
}

export interface IOwnPatientsResponseData {
	patients: IPatientData[];
	totalPages: number;
	currentPage: number;
}


export interface IScheduleData {
	scheduleId: number;
	time: 'morning' | 'evening';
	description?: string;
	product: IProductData;
}

export interface ICreateScheduleData {
	time: 'morning' | 'evening';
	description?: string;
	productId: number;
	patientId?: number
}

export interface IEditScheduleData {
	time?: 'morning' | 'evening';
	description?: string;
}

export interface IResponseWithMessageData{
	message: string;
}

export interface ISendRequestData {
	doctorId: number;
	coverletter: string;
} 

export interface IRequestData {
	coverletter: string;
	requestId: number;
	patient: IPatientData;
}

export interface IUserData {
	userId: number;
	email: string;
	password: string;
	role: Role;
	createAt: string;
}

export interface IUsersResponseData {
	users: IUserData[];
	totalPages: number;
	currentPage: number;
}

// {
//     "userId": 1,
//     "email": "admin@gmail.com",
//     "password": "$argon2id$v=19$m=65536,t=3,p=4$BEB92j0S/ZMqrFG4OD+gJA$wzG+5vahNItSlNwRibsip7XIGI1/fjtYNOC4YUtKZ28",
//     "role": "admin",
//     "createAt": "2023-10-22T06:44:41.674Z"
// }
