import * as Yup from 'yup';

export const validationSchema = Yup.object({
	name: Yup.string()
		.required('Name is required')
		.min(3, 'Name must be not less than 3 characters')
		.max(100, 'Name must be not bigger than 100 characters'),
	productType: Yup.string()
		.required('Product type is required')
		.min(3, 'Product type must be not less than 3 characters')
		.max(50, 'Product type must be not bigger than 50 characters'),
	brand: Yup.string()
		.required('Brand is required')
		.min(3, 'Brand must be not less than 3 characters')
		.max(50, 'Brand must be not bigger than 50 characters'),
	ingredients: Yup.string()
		.required('Ingredients is required')
		.min(5, 'Ingredients must be not less than 5 characters')
		.max(1000, 'Ingredients must be not bigger than 1000 characters'),
	amount: Yup.string()
		.required('Amount is required')
		.min(2, 'Amount must be not less than 2 characters')
		.max(10, 'Amount must be not bigger than 10 characters'),
	skinType: Yup.string()
		.required('Skin type  is required')
		.min(3, 'Skin type  must be not less than 3 characters')
		.max(100, 'Skin type  must be not bigger than 100 characters'),
	description: Yup.string().max(
		1000,
		'Description must be not bigger than 1000 characters'
	),
});
