import { instance } from '../api/axios.api';
import { IRequestData, IResponseWithMessageData } from '../types/types';

export const RequestService = {
	async createRequest(
		requestData: IRequestData
	): Promise<IResponseWithMessageData> {
		const { data } = await instance.post<IResponseWithMessageData>(
			'request',
			requestData
		);
		return data;
	},
};
