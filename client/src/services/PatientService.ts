import { instance } from '../api/axios.api';
import { IEditPatientData, IPatientData, IResponseWithMessageData } from '../types/types';

export const PatientService = {
	async findById(patientId: string | undefined) {
		const { data } = await instance.get<IPatientData>(
			`users/patients/${patientId}`
		);
		return data;
	},

	async editProfile(changedData: IEditPatientData) {
		const { data } = await instance.patch<IResponseWithMessageData>(
			'users/patients',
			changedData
		);
		return data;
	},

	async unsubscribe() {
		const { data } = await instance.patch<IResponseWithMessageData>(
			'users/patients/unsubmit'
		);
		return data;
	},
};
