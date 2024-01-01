import { FC, useState } from 'react';
import { LoaderFunctionArgs, useLoaderData } from 'react-router-dom';
import { toast } from 'react-toastify';
import { DoctorService } from '../services/DoctorService';
import { IDoctorData, Role } from '../types/types';
import { UserProfile } from '../components/Profile';

export const doctorLoader = async ({ params }: LoaderFunctionArgs) => {
	try {
		const data = await DoctorService.findById(params.doctorId);
		return data;
	} catch (err: any) {
		const error = err.response?.data.message;
		toast.error(error);
	}
};

const Doctor: FC = () => {
	const data = useLoaderData() as IDoctorData;
	return <UserProfile role={Role.DOCTOR} data={data} />;
};

export default Doctor;
