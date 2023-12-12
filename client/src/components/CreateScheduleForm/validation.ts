import * as Yup from 'yup';

export const validationSchema = Yup.object({
	time: Yup.string().required('Time is required'),
	description: Yup.string().max(
		500,
		'Description must be not longer than 500 characters'
	),
});
