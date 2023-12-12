import { FC } from 'react';
import { IEditPatientData, IPatientData } from '../../types/types';
import { Form, Formik } from 'formik';
import { FormField } from '../FormField';
import { Button } from '@mui/material';
import { toast } from 'react-toastify';
import { PatientService } from '../../services/PatientService';
import { useNavigate } from 'react-router-dom';
import { PatientValidationSchema } from './patientValidation';

interface EditPatientProfileProps {
	data: IPatientData;
}

export const EditPatientProfile: FC<EditPatientProfileProps> = ({ data }) => {
	let initialEditData: IEditPatientData = {
		name: data.name || '',
		age: data.age,
		skinType: data.skinType || '',
		patientId: data.patientId,
	};
	const navigate = useNavigate();

	const editPatient = async (values: IEditPatientData) => {
		try {
			const data = await PatientService.editProfile(values);
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
			onSubmit={(values) => editPatient(values)}
			validationSchema={PatientValidationSchema}
		>
			{({ isValid }) => (
				<Form className="editForm">
					<FormField
						label="Name"
						name="name"
						type="text"
						required={true}
					/>
					<FormField
						label="Skin type"
						name="skinType"
						type="text"
						required={true}
					/>

					<FormField
						label="Age"
						name="age"
						type="number"
						required={true}
					/>
					<Button
						type="submit"
						className="saveButton"
						variant="contained"
						disabled={!isValid}
					>
						Save
					</Button>
				</Form>
			)}
		</Formik>
	);
};
