import { FC } from 'react';
import { IPatientData } from '../../types/types';
import { useNavigate } from 'react-router-dom';

interface PatientItemProps {
	patient: IPatientData;
}

export const PatientItem: FC<PatientItemProps> = ({ patient }) => {
	const navigate = useNavigate();
	return (
		<div className="patientBlock">
			<img
				src={
					patient.photo ||
					'https://t4.ftcdn.net/jpg/03/49/49/79/360_F_349497933_Ly4im8BDmHLaLzgyKg2f2yZOvJjBtlw5.webp'
				}
				alt="patient avatar"
				className="patientAvatar"
				onClick={() => navigate(`${patient.patientId}`)}
			/>
			<div>
				<div>
					<p>Name:</p>
					<h3>{patient.name || 'No data found'}</h3>
				</div>
				<div>
					<p>Age:</p>
					<h3>{patient.age || 'No data found'}</h3>
				</div>
				<div>
					<p>Skin type</p>
					<h3>{patient.skinType || 'No data found'}</h3>
				</div>
			</div>
		</div>
	);
};
