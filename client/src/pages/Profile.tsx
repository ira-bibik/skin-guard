import { FC } from 'react';
import { AuthService } from '../services/AuthService';
import { toast } from 'react-toastify';
import { getRole } from '../helper/getRole.helper';
import { UserProfile } from '../components/Profile';
import { Role } from '../types/types';

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
	return <UserProfile actionsButtons={true} isScheduleVisible={true && role === Role.PATIENT} role={role } />;
};

export default Profile;
