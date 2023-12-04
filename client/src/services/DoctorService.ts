import { instance } from '../api/axios.api';
import {
	IDoctorData,
	IDoctorsResponseData,
	IEditDoctorData,
	IOwnPatientsResponseData,
	IResponseWithMessageData,
} from '../types/types';

export const DoctorService = {
	async getAllDoctors(
		page: number = 1,
		limit: number = 4
	): Promise<IDoctorsResponseData> {
		const params = {
			page,
			limit,
		};
		const { data } = await instance.get<IDoctorsResponseData>(
			'users/doctors/all',
			{
				params,
			}
		);
		return data;
	},

	async findById(doctorId: string | undefined) {
		const { data } = await instance.get<IDoctorData>(
			`users/doctors/${doctorId}`
		);
		return data;
	},

	async editProfile(chabgedData: IEditDoctorData) {
		const { data } = await instance.patch<IResponseWithMessageData>(
			'users/doctors',
			chabgedData
		);
		return data;
	},

	async getOwnPatients() {
		const { data } = await instance.get<IOwnPatientsResponseData>(
			'users/doctors/me/patients'
		);
		return data;
	},
};
