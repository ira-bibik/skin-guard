import { instance } from '../api/axios.api';
import {
	IDoctorData,
	ILoginUserData,
	IPatientData,
	IRegisterUserData,
	IResponseUserData,
	Role,
} from '../types/types';

export const AuthService = {
	async registration(
		userData: IRegisterUserData
	): Promise<IResponseUserData | undefined> {
		const { data } = await instance.post<IResponseUserData>(
			'users/register',
			userData
		);
		return data;
	},

	async login(
		userData: ILoginUserData
	): Promise<IResponseUserData | undefined> {
		const { data } = await instance.post<IResponseUserData>(
			'users/login',
			userData
		);
		return data;
	},

	async getProfile(
		role: Role | undefined
	): Promise<IPatientData | IDoctorData | undefined> {
		const { data } = await instance.get<
			IPatientData | IDoctorData | undefined
			>(`users/${role}s/me`);
		if (data?.name) return data;
	},
};
