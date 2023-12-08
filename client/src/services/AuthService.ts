import { instance } from '../api/axios.api';
import {
	IDoctorData,
	ILoginUserData,
	IPatientData,
	IRegisterUserData,
	IResponseUserData,
	IResponseWithMessageData,
	IUserData,
	IUsersResponseData,
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
		return data;
	},

	async getUserById(userId: number): Promise<IUserData> {
		const { data } = await instance.get<IUserData>(`users/${userId}`);
		return data;
	},

	async getUsers(
		page: number = 1,
		limit: number = 6
	): Promise<IUsersResponseData> {
		const params = {
			page,
			limit,
		};
		const { data } = await instance.get<IUsersResponseData>(`users`, {
			params,
		});
		return data;
	},

	async deleteUserById(userId: number): Promise<IResponseWithMessageData> {
		const { data } = await instance.delete<IResponseWithMessageData>(
			`users/${userId}`
		);
		return data;
	},
};
