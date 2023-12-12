import { FC } from 'react';
import { DoctorService } from '../services/DoctorService';
import { OwnPatientsList } from '../components/OwnPatientsList';

export const ownPatientsLoader = async () => {
	const data = await DoctorService.getOwnPatients();
	return data;
};

const Patients: FC = () => {
	return (
		<>
			<OwnPatientsList />
		</>
	);
};

export default Patients;
