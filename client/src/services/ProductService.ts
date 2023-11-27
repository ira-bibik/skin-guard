import { instance } from '../api/axios.api';
import { IProductsResponseData } from '../types/types';

interface getAllProductsParams {
	page: number;
	limit: number;
	s?: string;
}

export const ProductService = {
	async getAllProducts(
		page: number = 1,
		search?: string,
		limit: number = 3
	): Promise<IProductsResponseData> {
		const params: getAllProductsParams = {
			page,
			limit,
		};
		if (search?.length) {
			params.s = search;
		}
		const { data } = await instance.get<IProductsResponseData>('product', {
			params,
		});
		return data;
	},
};
