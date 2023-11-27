import { instance } from '../api/axios.api';
import { IProductsResponseData } from '../types/types';


export const ProductService = {
	async getAllProducts(
		page: number = 1,
		limit: number = 3,
		search?: string
	): Promise<IProductsResponseData> {
		const params = {
			page,
			limit,
		};
		const { data } = await instance.get<IProductsResponseData>('product', {
			params,
		});
		return data;
	},
};
