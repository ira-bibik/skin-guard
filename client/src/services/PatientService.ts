import { instance } from "../api/axios.api";
import { IPatientData } from "../types/types";

export const PatientService = {
    async findById(patientId: string | undefined) {
        const { data } = await instance.get<IPatientData>(`users/patients/${patientId}`);
		return data;
    }
}