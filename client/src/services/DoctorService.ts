import { instance } from "../api/axios.api";
import { IDoctorData } from "../types/types";

export const DoctorService = {
	async findById(doctorId: string | undefined) {
		const { data } = await instance.get<IDoctorData>(`users/doctors/${doctorId}`);
		return data;
	},
};
