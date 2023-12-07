import { instance } from '../api/axios.api';
import {
	ICreateScheduleData,
	IEditScheduleData,
	IResponseWithMessageData,
	IScheduleData,
} from '../types/types';

export const ScheduleService = {
	async getScheduleById(
		scheduleId: number | undefined
	): Promise<IScheduleData | undefined> {
		if (scheduleId) {
			const { data } = await instance.get<IScheduleData>(
				`schedule/${scheduleId}`
			);
			return data;
		}
	},

	async createSchedule(createScheduleData: ICreateScheduleData) {
		const { data } = await instance.post('schedule', createScheduleData);
		return data;
	},

	async editSchedule(
		scheduleId: number | undefined,
		editScheduleData: IEditScheduleData
	): Promise<IResponseWithMessageData> {
		const { data } = await instance.patch<IResponseWithMessageData>(
			`schedule/${scheduleId}`,
			editScheduleData
		);
		return data;
	},

	async deleteSchedule(
		scheduleId: number
	): Promise<IResponseWithMessageData> {
		const { data } = await instance.delete<IResponseWithMessageData>(
			`schedule/${scheduleId}`
		);
		return data;
	},
};
