import { instance } from '../api/axios.api';
import { ICreateScheduleData } from '../types/types';

export const ScheduleService = {
	async createSchedule(createScheduleData: ICreateScheduleData) {
		const { data } = await instance.post('schedule', createScheduleData);
		return data;
	},
};
