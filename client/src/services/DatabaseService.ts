import { instance } from '../api/axios.api';
import { IResponseWithMessageData } from '../types/types';

export const DatabaseService = {
	async createDatabaseBackup(): Promise<IResponseWithMessageData> {
		const { data } = await instance.get<IResponseWithMessageData>('backup');
		return data;
	},

	async restoreDatabase(): Promise<IResponseWithMessageData> {
		const { data } = await instance.get<IResponseWithMessageData>('restore');
		return data;
	},
};
