import { FC, useEffect, useState } from 'react';
import {
	ICreateScheduleData,
	IPatientData,
	IProductData,
	Role,
} from '../../types/types';
import { ScheduleService } from '../../services/ScheduleService';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useRole } from '../../hooks/getRole';
import { DoctorService } from '../../services/DoctorService';
import { useIdByRole } from '../../hooks/getId';
import { Form, Formik } from 'formik';
import { FormField } from '../FormField';
import { Button, MenuItem, Typography } from '@mui/material';
import './CreateScheduleForm.css';
import { validationSchema } from './validation';

interface CreateScheduleFormProps {
	product: IProductData;
}

export const CreateScheduleForm: FC<CreateScheduleFormProps> = ({
	product,
}) => {
	const navigate = useNavigate();
	const role = useRole();
	const [ownPatients, setOwnPatients] = useState<IPatientData[]>();
	const userIdByRole = useIdByRole();

	const initialValues: ICreateScheduleData = {
		time: 'morning',
		description: '',
		productId: product.productId,
		patientId: undefined,
	};

	const getOwnPatients = async () => {
		try {
			const data = await DoctorService.getOwnPatients();
			setOwnPatients(data.patients);
		} catch (err: any) {
			const error = err.response?.data.message;
			toast.error(error);
		}
	};

	const createRequest = async (values: ICreateScheduleData) => {
		try {
			if (role === Role.PATIENT) {
				values.patientId = userIdByRole;
			}
			const data = await ScheduleService.createSchedule(values);
			toast.success('Schedule is created!');
			navigate(-1);
		} catch (err: any) {
			const error = err.response?.data.message;
			toast.error(error);
		}
	};

	useEffect(() => {
		if (role === Role.DOCTOR) {
			getOwnPatients();
		}
	}, []);

	return (
		<Formik
			initialValues={initialValues}
			validationSchema={validationSchema}
			onSubmit={(values) => {
				createRequest(values);
			}}
		>
			{({ isValid }) => (
				<Form className="createScheduleFormContainer">
					<Typography variant="h5">Create schedule</Typography>
					<div className="productName">
						<p>Product name:</p>
						<h3>{product.name}</h3>
					</div>
					{role === Role.DOCTOR && (
						<FormField
							name="patientId"
							type="select"
							label="Patient"
							required
						>
							{ownPatients?.map((patient) => (
								<MenuItem
									value={patient.patientId}
									key={patient.patientId}
								>
									{patient.name}
								</MenuItem>
							))}
						</FormField>
					)}
					<FormField
						name="time"
						type="select"
						label="Time"
						required={true}
					>
						<MenuItem value={'morning'}>morning</MenuItem>
						<MenuItem value={'evening'}>evening</MenuItem>
					</FormField>

					<FormField
						label="Description"
						name="description"
						type="text"
					/>
					<Button
						type="submit"
						variant="contained"
						disabled={!isValid}
						className="createButton"
					>
						Create
					</Button>
				</Form>
			)}
		</Formik>
	);
};
