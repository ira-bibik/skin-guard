import * as Yup from 'yup';

export const DoctorValidationSchema = Yup.object({
	name: Yup.string()
		.min(5, 'Name must be not less than 5 characters ')
		.max(100, 'Name must be not bigger than 100 characters'),
	work: Yup.string()
		.min(5, 'Work must be not less than 5 characters ')
		.max(100, 'Work must be not bigger than 100 characters'),
	specialization: Yup.string()
		.min(5, 'Specialization must be not less than 5 characters ')
		.max(100, 'Specialization must be not bigger than 100 characters'),
	description: Yup.string()
		.min(5, 'Description must be not less than 5 characters ')
		.max(1000, 'Description must be not bigger than 1000 characters'),
});
