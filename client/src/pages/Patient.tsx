import { FC, useState } from 'react';
import { LoaderFunctionArgs, useLoaderData } from 'react-router-dom';
import { PatientService } from '../services/PatientService';
import { toast } from 'react-toastify';
import { IPatientData, Role } from '../types/types';
import { UserProfile } from '../components/Profile';

export const patientLoader = async ({ params }: LoaderFunctionArgs) => {
	try {
		const data = await PatientService.findById(params.patientId);
		return data;
	} catch (err: any) {
		const error = err.response?.data.message;
		toast.error(error);
	}
};

const Patient: FC = () => {
	const data = useLoaderData() as IPatientData;
	return <UserProfile isScheduleVisible={Boolean(data.schedule?.length)} role={Role.PATIENT} data={ data} />;;
};

export default Patient;
