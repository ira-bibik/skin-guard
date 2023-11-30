import { FC, useEffect, useState } from 'react';
import { AuthService } from '../services/AuthService';
import { toast } from 'react-toastify';
import { getRole } from '../helper/getRole.helper';
import { UserProfile } from '../components/Profile';
import { IDoctorData, IPatientData, Role } from '../types/types';
import { Outlet, useLoaderData } from 'react-router-dom';

export const profileLoader = async () => {
	try {
		const role = getRole();
		const data = await AuthService.getProfile(role);

		return data;
	} catch (err: any) {
		const error = err.response?.data.message;
		toast.error(error);
	}
};

const Profile: FC = () => {
	const role = getRole();
	const data = useLoaderData() as IPatientData | IDoctorData;
	return (
		<>
			<UserProfile
				actionsButtons={true}
				isScheduleVisible={role === Role.PATIENT}
				role={role}
			/>
			<Outlet context={{ data, role }} />
		</>
	);
};

export default Profile;
