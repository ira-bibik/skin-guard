import { instance } from "../api/axios.api";
import { IDoctorData, IEditDoctorData, IResponseWithMessageData } from "../types/types";

export const DoctorService = {
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
};
