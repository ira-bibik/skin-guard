import { instance } from '../api/axios.api';
import {  ILoginUserData, IRegisterUserData, IResponseUserData, IUser, Role } from '../types/types';

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

	// to do type for response

	async getProfile(role: Role | undefined): Promise<any> {
		const { data } = await instance.get<IUser>(`${role}s/profile`);
		if (data) return data;
	},
};
