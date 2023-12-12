import { instance } from '../api/axios.api';
import {
	IManageProductData,
	IProductData,
	IProductsResponseData,
	IResponseWithMessageData,
} from '../types/types';

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

	async getProductById(productId: string | undefined): Promise<IProductData> {
		const { data } = await instance.get<IProductData>(
			`product/${productId}`
		);
		return data;
	},

	async createProduct(productData: IManageProductData) {
		const { data } = await instance.post(`product`, productData);
		return data;
	},

	async editProduct(
		productId: number,
		productData: IManageProductData
	): Promise<IResponseWithMessageData> {
		const { data } = await instance.patch<IResponseWithMessageData>(
			`product/${productId}`,
			productData
		);
		return data;
	},

	async deleteProduct(productId: number): Promise<IResponseWithMessageData> {
		const { data } = await instance.delete<IResponseWithMessageData>(
			`product/${productId}`
		);
		return data;
	},

	async uploadPhoto(photo: any, productId: number) {
		const formData = new FormData();
		formData.append('file', photo);

		const { data } = await instance.post(
			`product/upload/${productId}`,
			formData,
			{
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			}
		);
		return data;
	},
};
