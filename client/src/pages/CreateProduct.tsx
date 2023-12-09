import { FC } from 'react';
import { ProductForm } from '../components/ProductForm';
import { IManageProductData } from '../types/types';
import { toast } from 'react-toastify';
import { ProductService } from '../services/ProductService';

export const CreateProduct: FC = () => {
	const createProduct = async (values: IManageProductData) => {
		try {
			const data = await ProductService.createProduct(values);
			toast.success(data.message);
		} catch (err: any) {
			const error = err.response?.data.message;
			toast.error(error);
		}
	};

	return (
		<>
			<ProductForm type={'create'} handleSubmit={createProduct} />
		</>
	);
};
