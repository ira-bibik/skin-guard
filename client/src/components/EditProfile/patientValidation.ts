import * as Yup from 'yup';

export const PatientValidationSchema = Yup.object({
	name: Yup.string()
		.min(5, 'Name must be not less than 5 characters ')
		.max(100, 'Name must be not bigger than 100 characters'),
	skinType: Yup.string()
		.min(3, 'Skin type must be not less than 3 characters ')
		.max(20, 'Skin type must be not bigger than 20 characters'),
	age: Yup.number()
		.min(14, 'Age must not be less than 14')
		.max(100, 'Age must not be less than 100'),
});
