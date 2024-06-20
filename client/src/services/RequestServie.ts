import { instance } from '../api/axios.api';
import {
	ISendRequestData,
	IResponseWithMessageData,
	IRequestData,
} from '../types/types';

export const RequestService = {
	async createRequest(
		requestData: ISendRequestData
	): Promise<IResponseWithMessageData> {
		const { data } = await instance.post<IResponseWithMessageData>(
			'request',
			requestData
		);
		return data;
	},

	async getDoctorsRequests(): Promise<IRequestData[]> {
		const { data } = await instance.get<IRequestData[]>(
			'users/doctors/me/requests'
		);
		return data;
	},

	async submit(requestId: number): Promise<IResponseWithMessageData> {
		const { data } = await instance.patch<IResponseWithMessageData>(
			`request/${requestId}`
		);
		return data;
	},

	async remove(requestId: number): Promise<IResponseWithMessageData> {
		const { data } = await instance.delete<IResponseWithMessageData>(
			`request/${requestId}`
		);
		return data;
	},
};
