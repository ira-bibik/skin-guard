import { FC } from 'react';
import { IManageProductData, IProductData } from '../../types/types';
import { Field, Form, Formik } from 'formik';
import { FormField } from '../FormField';
import './ProductForm.css';
import { Button, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { validationSchema } from './validation';

interface ProductFormProps {
	initialValues?: IProductData;
	handleSubmit: (values: IManageProductData) => void;
	type: 'create' | 'edit';
}

export const ProductForm: FC<ProductFormProps> = ({
	initialValues,
	handleSubmit,
	type,
}) => {
	const navigate = useNavigate();

	const initialProductValues = {
		name: initialValues?.name || '',
		productType: initialValues?.productType || '',
		brand: initialValues?.brand || '',
		ingredients: initialValues?.ingredients || '',
		skinType: initialValues?.skinType.join(', ') || '',
		description: initialValues?.description || '',
		amount: initialValues?.amount || '',
	};

	const onFormSubmit = (values: any) => {
		try {
			const productManageValues: IManageProductData = {
				...values,
				skinType: values.skinType.trim().split(','),
			};
			handleSubmit(productManageValues);
			navigate(-1);
		} catch (err: any) {
			const error = err.response?.data.message;
			toast.error(error);
		}
	};

	return (
		<Formik
			initialValues={initialProductValues}
			onSubmit={onFormSubmit}
			validationSchema={validationSchema}
		>
			{({ isValid, touched, errors }) => (
				<Form className="productForm">
					<Typography variant="h5">
						{type === 'create' ? 'Create new' : 'Edit'} product
					</Typography>
					<FormField label="Name" name="name" type="text" />

					<div className="productFormItem">
						<FormField
							label="Product type"
							name="productType"
							type="text"
						/>
						<FormField label="Brand" name="brand" type="text" />
					</div>
					<div className="productFormItem">
						<FormField label="Amount" name="amount" type="text" />
						<FormField
							label="Skin type"
							name="skinType"
							type="text"
						/>
					</div>

					<Field
						label="Ingredients"
						name="ingredients"
						multiline
						fullWidth
						rows={4}
						as={TextField}
						error={
							touched.ingredients && Boolean(errors.ingredients)
						}
						helperText={touched.ingredients && errors.ingredients}
					/>
					<Field
						label="Description"
						name="description"
						multiline
						fullWidth
						rows={4}
						as={TextField}
						error={
							touched.description && Boolean(errors.description)
						}
						helperText={touched.description && errors.description}
					/>

					<Button
						type="submit"
						variant="contained"
						disabled={!isValid}
						className="submitButton"
					>
						Send
					</Button>
				</Form>
			)}
		</Formik>
	);
};
