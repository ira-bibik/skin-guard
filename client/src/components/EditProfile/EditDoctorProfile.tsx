import { FC } from 'react';
import { IDoctorData, IEditDoctorData } from '../../types/types';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { DoctorService } from '../../services/DoctorService';
import { Field, Formik, Form } from 'formik';
import { DoctorValidationSchema } from './doctorValidation';
import { FormField } from '../FormField';
import { Button, TextField } from '@mui/material';

interface EditDoctorProfileProps {
	data: IDoctorData;
	setData: (values: any) => void;
}

export const EditDoctorProfile: FC<EditDoctorProfileProps> = ({ data, setData }) => {
	let initialEditData: IEditDoctorData = {
		name: data.name || '',
		work: data.work || '',
		doctorId: data.doctorId,
		specialization: data.specialization || '',
		description: data.description || '',
	};
	const navigate = useNavigate();
	const editDoctor = async (values: IEditDoctorData) => {
		try {
			const data = await DoctorService.editProfile(values);
			setData((state: any) => ({ ...state, ...values }));
			toast.success(data.message);
			navigate('/me');
		} catch (err: any) {
			const error = err.response?.data.message;
			toast.error(error);
		}
	};
	return (
		<Formik
			initialValues={initialEditData}
			onSubmit={(values) => editDoctor(values)}
			validationSchema={DoctorValidationSchema}
		>
			{({ isValid, touched, errors }) => (
				<Form className="editForm">
					<FormField
						label="Name"
						name="name"
						type="text"
						required={true}
					/>
					<FormField
						label="Work"
						name="work"
						type="text"
						required={true}
					/>
					<FormField
						label="Specialization"
						name="specialization"
						type="text"
						required={true}
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
						className="saveButton"
					>
						Save
					</Button>
				</Form>
			)}
		</Formik>
	);
};
