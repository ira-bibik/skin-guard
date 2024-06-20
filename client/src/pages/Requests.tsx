import { FC } from 'react';
import { OwnDoctorsRequests } from '../components/OwnRequests';
import { RequestService } from '../services/RequestServie';

export const OwnDoctorsRequestsLoader = async () => {
	const data = await RequestService.getDoctorsRequests();
	return data;
};

const Requests: FC = () => {
	return (
		<>
			<OwnDoctorsRequests />
		</>
	);
};

export default Requests;
