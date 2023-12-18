import { FC } from 'react';
import { LoaderFunctionArgs, useLoaderData, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ProductService } from '../services/ProductService';
import { IManageProductData, IProductData } from '../types/types';
import { ProductForm } from '../components/ProductForm';

export const productLoader = async ({ params }: LoaderFunctionArgs) => {
	try {
		const data = await ProductService.getProductById(params.productId);
		return data;
	} catch (err: any) {
		const error = err.response?.data.message;
		toast.error(error);
	}
};

export const EditProduct: FC = () => {
	const navigate = useNavigate();
    const product = useLoaderData() as IProductData;

	const editProduct = async (values: IManageProductData) => {
		try {
			const data = await ProductService.editProduct(
				product.productId,
				values
            );
            
			toast.success(data.message);
			navigate(-1);
		} catch (err: any) {
			const error = err.response?.data.message;
			toast.error(error);
		}
	};

    return (
		<>
			<ProductForm type={'edit'} handleSubmit={editProduct} initialValues={product}/>
		</>
	);
};
