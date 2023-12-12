import { FC } from 'react';
import { DoctorService } from '../services/DoctorService';
import { DoctorList } from '../components/DoctorsList';

export const doctorsLoader = async () => {
	const data = await DoctorService.getAllDoctors();
	return data;
};

const Doctors: FC = () => {
	return (
		<>
			<DoctorList />
		</>
	);
};

export default Doctors;
