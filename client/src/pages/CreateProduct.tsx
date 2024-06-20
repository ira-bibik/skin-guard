import { FC } from 'react';
import { ProductForm } from '../components/ProductForm';
import { IManageProductData } from '../types/types';
import { toast } from 'react-toastify';
import { ProductService } from '../services/ProductService';
import { useNavigate } from 'react-router-dom';

export const CreateProduct: FC = () => {
	const navigate = useNavigate();
	const createProduct = async (values: IManageProductData) => {
		try {
			const data = await ProductService.createProduct(values);
			toast.success(data.message);
			navigate(-1);
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
