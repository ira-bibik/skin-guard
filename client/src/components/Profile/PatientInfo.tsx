import { FC } from 'react';
import { IDoctorData } from '../../types/types';

interface PatientInfoProps {
	name?: string;
	age?: number;
	skinType?: string;
	doctor?: IDoctorData;
}

export const PatientInfo: FC<PatientInfoProps> = ({name, age, skinType, doctor}) => {
	return (
		<>
			<div className="infoBlockItem">
				<p>Name:</p>
				<h3>{name || 'No data'}</h3>
			</div>
			<div className="infoBlockItem">
				<p>Age:</p>
				<h3>{age || 'No data'}</h3>
			</div>
			<div className="infoBlockItem">
				<p>Skin type:</p>
				<h3>{skinType || 'No data'}</h3>
			</div>
			<div className="infoBlockItem">
				<p>Doctor:</p>
				<h3>{doctor?.name || 'No data'}</h3>
			</div>
		</>
	);
};
